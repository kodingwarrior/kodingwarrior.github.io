class Builders::Helpers < SiteBuilder
  def build
    helper :mermaid do |&block|
      <<~HTML.html_safe
        <pre class="mermaid">
          #{helpers.view.capture(&block)}
        </pre>
      HTML
    end
  end
end

