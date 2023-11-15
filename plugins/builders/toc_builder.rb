class Builders::TocBuilder < SiteBuilder
  def build
    helper :toc, :toc_template
  end

  def toc_template(input)
    document = Kramdown::Document.new(input)
    toc_nodes = Kramdown::Converter::Toc.convert(document.root)
    puts toc_nodes.inspect

    html = toc_nodes
      .reject { _1.is_a?(Array) && _1.empty? }
      .map { |toc_node| generate_html(toc_node) }
      .join


    html.html_safe
  end

  def generate_html(toc_node)
    return "" if toc_node.children.empty?

    html = ["<ul>"]
    toc_node.children.each do |child|
      html << "<li>"
      if child.value.options[:raw_text].present?
        anchor_node = child
        anchor_text = child.value.options[:raw_text]
        html << "<a href='##{anchor_node.attr[:id]}'>#{anchor_text}</a>"
      end
      html << "</li>"
      html << generate_html(child) unless child.children.empty?
    end
    html << "</ul>"

    html.join
  end
end
