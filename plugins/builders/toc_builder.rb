require 'redcarpet'
require 'redcarpet/render_strip'

class Builders::TocBuilder < SiteBuilder
  def build
    helper :toc, :toc_template
  end

  def toc_template(input)
    document = Kramdown::Document.new(input)
    toc_nodes = Kramdown::Converter::Toc.convert(document.root)

    html = toc_nodes
      .reject { _1.is_a?(Array) && _1.empty? }
      .map { |toc_node| generate_html(toc_node) }
      .join

    html.html_safe
  end

  private
    def generate_html(toc_node)
      return "" if toc_node.children.empty?

      html = ["<ul>"]
      toc_node.children.each do |child|
        if child.value.options[:raw_text].present?
          text = child.value.options[:raw_text]
          next if text.include?('mermaid do')
        end
        html << "<li>"
        if child.value.options[:raw_text].present?
          anchor_node = child
          anchor_text = extract_plain_text_from(child)
          html << "<a href='##{anchor_node.attr[:id]}'>#{anchor_text}</a>"
        end
        html << "</li>"
        html << generate_html(child) unless child.children.empty?
      end
      html << "</ul>"

      html.join
    end

    def extract_plain_text_from(toc_node)
      plain_text = Redcarpet::Markdown.new(Redcarpet::Render::StripDown).render(toc_node.value.options[:raw_text])
      # extract plain text with given format `plaintext(<http/https url pattern>)`
      plain_text = plain_text.match(/((?<plaintext>.+))\((?<url>https?:\/\/[^\)]+)\)/)&.[](:plaintext) || plain_text

      plain_text
    end
end
