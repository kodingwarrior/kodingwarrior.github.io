class Builders::Helpers < SiteBuilder
  def build
    helper :mermaid do |&block|
      <<~HTML.html_safe
        <pre class="mermaid">
          #{helpers.view.capture(&block)}
        </pre>
      HTML
    end

    helper :book_quote do |&block|
      <<~HTML.html_safe
        <div class="book-quote-wrapper">
          <div class="book-quote-label">
            Note
          </div>
          <blockquote class="book-quote">
            #{helpers.view.capture(&block)}
          </blockquote>
        </div>
      HTML
    end
  end
end

