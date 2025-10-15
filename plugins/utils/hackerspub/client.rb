require 'json'
require 'net/http'
require 'cgi'
require 'time'
require 'uri'

module Utils
  module Hackerspub
    class Error < StandardError; end

    class Client
      DEFAULT_ENDPOINT = 'https://hackers.pub/graphql'

      ARTICLES_QUERY = <<~GRAPHQL
        query Articles($handle: String!, $allowLocalHandle: Boolean!) {
          actorByHandle(handle: $handle, allowLocalHandle: $allowLocalHandle) {
            articles {
              edges {
                node {
                  id
                  language
                  name
                  published
                  summary
                  content
                  url
                  visibility
                }
              }
            }
          }
        }
      GRAPHQL

      ACTOR_BIO_QUERY = <<~GRAPHQL
        query ActorBio($handle: String!, $allowLocalHandle: Boolean!) {
          actorByHandle(handle: $handle, allowLocalHandle: $allowLocalHandle) {
            account {
              bio
              avatarUrl
            }
          }
        }
      GRAPHQL

      def initialize(handle:, endpoint: DEFAULT_ENDPOINT, base_url: 'https://hackers.pub')
        @handle = handle
        @endpoint = URI.parse(endpoint)
        @base_url = base_url
      end

      def fetch_posts
        data = execute(ARTICLES_QUERY)
        edges = data.dig('actorByHandle', 'articles', 'edges') || []
        edges.filter_map { |edge| normalize_post(edge['node']) }
      end

      def fetch_actor_bio
        data = execute(ACTOR_BIO_QUERY)
        data['actorByHandle']&.fetch('account', nil)
      end

      private

      attr_reader :handle, :endpoint, :base_url

      def execute(query)
        payload = {
          query: query,
          variables: {
            handle: handle,
            allowLocalHandle: true
          }
        }

        response = post_json(payload)
        parsed = JSON.parse(response.body)

        if parsed['errors']&.any?
          message = parsed['errors'].map { |error| error['message'] }.join(', ')
          raise Error, "Hackerspub GraphQL error: #{message}"
        end

        parsed['data']
      rescue JSON::ParserError => e
        raise Error, "Unable to parse Hackerspub response: #{e.message}"
      end

      def post_json(payload)
        http = Net::HTTP.new(endpoint.host, endpoint.port)
        http.use_ssl = endpoint.scheme == 'https'

        request = Net::HTTP::Post.new(endpoint)
        request['Content-Type'] = 'application/json'
        request.body = JSON.dump(payload)

        response = http.request(request)
        unless response.is_a?(Net::HTTPSuccess)
          raise Error,
                "Hackerspub request failed (#{response.code} #{response.message})"
        end

        response
      rescue SocketError, Errno::ECONNREFUSED, Errno::ECONNRESET, Net::OpenTimeout, Net::ReadTimeout => e
        raise Error, "Unable to connect to Hackerspub API: #{e.message}"
      end

      def normalize_post(node) # rubocop:disable Metrics/AbcSize
        return unless node

        url = node['url']
        return unless url.is_a?(String)

        profile_base = profile_url_base
        return unless url.start_with?(profile_base)

        path_segments = URI.parse(url).path.split('/').reject(&:empty?)
        return unless path_segments.length >= 3

        year = path_segments[-2]
        encoded_slug = path_segments[-1]
        slug = CGI.unescape(encoded_slug)

        {
          id: node['id'],
          name: node['name'],
          summary: node['summary'],
          content: node['content'],
          url: url,
          language: node['language'],
          visibility: node['visibility'],
          year: year,
          slug: slug,
          encoded_slug: encoded_slug,
          published_at: parse_time(node['published']),
          published_raw: node['published']
        }
      rescue URI::InvalidURIError
        nil
      end

      def parse_time(value)
        return if value.nil?

        case value
        when Time
          value
        when DateTime
          value.to_time
        when String
          Time.parse(value)
        end
      rescue ArgumentError
        nil
      end

      def profile_url_base
        @profile_url_base ||= begin
          normalized_base = base_url.to_s.chomp('/')
          normalized_handle = handle.to_s
          normalized_handle = "@#{normalized_handle.delete_prefix('@')}"
          "#{normalized_base}/#{normalized_handle}/"
        end
      end
    end
  end
end
