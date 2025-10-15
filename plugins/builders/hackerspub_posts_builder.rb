require_relative "../utils/hackerspub/client"

module Builders
  class HackerspubPostsBuilder < SiteBuilder
    def build
      return if ENV["BRIDGETOWN__DISABLE_BUILDERS"] == "true"
      return if ENV["HACKERSPUB_DISABLE"].to_s == "1"

      handle = ENV.fetch("HACKERSPUB_HANDLE", "@kodingwarrior")
      endpoint = ENV.fetch(
        "HACKERSPUB_GRAPHQL_URL",
        Utils::Hackerspub::Client::DEFAULT_ENDPOINT
      )
      base_url = ENV.fetch("HACKERSPUB_BASE_URL", "https://hackers.pub")

      client = Utils::Hackerspub::Client.new(
        handle:,
        endpoint:,
        base_url:,
      )

      posts = client.fetch_posts
      actor = client.fetch_actor_bio

      site.data["hackerspub_actor"] = actor if actor
      site.data["hackerspub_handle"] = handle

      visible_posts = posts.select do |post|
        visibility = post[:visibility].to_s.downcase
        visibility.empty? || visibility == "public"
      end

      unique_posts = visible_posts.uniq { |post| [post[:year], post[:encoded_slug] || post[:slug]] }

      unique_posts.sort_by { |post| post[:published_at] || Time.at(0) }.each do |post|
        path_slug = post[:encoded_slug] || post[:slug]
        add_resource :hackerspub_posts, "#{post[:year]}/#{path_slug}.html" do
          layout "hackerspub_post"
          title post[:name].to_s.strip.empty? ? post[:slug] : post[:name]
          date post[:published_at] if post[:published_at]
          published post[:published_raw]
          year post[:year]
          slug post[:slug]
          encoded_slug post[:encoded_slug]
          language post[:language]
          summary post[:summary]
          original_url post[:url]
          visibility post[:visibility]
          content post[:content]
          permalink "/hackerspub/#{post[:year]}/#{path_slug}/"
        end
      end
    rescue Utils::Hackerspub::Error => e
      Bridgetown.logger.error("HackerspubPostsBuilder:", e.message)
      return
    rescue StandardError => e
      Bridgetown.logger.error(
        "HackerspubPostsBuilder:",
        "Unexpected error while building Hackerspub posts — #{e.class}: #{e.message}"
      )
      Bridgetown.logger.debug(e.backtrace.join("\n")) if Bridgetown.logger.debug?
      return
    end
  end
end
