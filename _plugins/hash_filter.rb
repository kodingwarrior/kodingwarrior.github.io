module Jekyll
  module HashFilter
    def keys(input)
      input.keys
    end

    def access(input, key)
      input[key]
    end
  end
end

Liquid::Template.register_filter(Jekyll::HashFilter)
