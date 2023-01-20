class Builders::BacklinkBuilder < SiteBuilder
  # See https://github.com/vasturiano/force-graph/blob/master/example/datasets/miserables.json
  def build
    hook :site, :pre_render do |site|
      resources = site.resources
      wiki_documents = 
        site.resources
          .select { |resource| resource.absolute_url.include?('/wiki/') }
          .reject { |resource| resource.absolute_url.include?('/templates/') }
          .reject { |resource| resource.absolute_url.end_with?('/wiki/') }

      nodes = Set.new
      links = []
      wiki_documents.each do |wiki_document|
        pathname = wiki_document.relative_path.to_s

        _, *tokens = pathname.split('/') # Removes _wiki/
        filename = tokens.join('/')
        source = filename[..-4] # Removes file extension name
        
        nodes << source

        wiki_content = wiki_document.content
        internal_links = wiki_content.scan(/\[\[([\w\-\/\_\s]+)\]\]/)
        internal_links&.each do |link|
          link = link[0]
          nodes << link
          links << {
            "source": source,
            "target": link,
            "value": 1,
          }
        end
      end

      reference_graph = { 
        "nodes": nodes.to_a.map { |name| ({ id: name, group: 1 }) },
        "links": links,
      } 

      target_file = site.in_root_dir("src", "_data", "wiki_datasets.json")
      File.write target_file, JSON.pretty_generate(reference_graph)
    end
  end
end
