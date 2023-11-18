require_relative '../utils/cluster_visualizer'

class Builders::BacklinkBuilder < SiteBuilder
  CLUSTER = {
    name: 'prelude',
    children: [
      {
        name: 'misc',
        children: [],
      },
      {
        name: 'fediverse',
        children: [],
      },
      {
        name: 'productivity',
        children: [
          {
            name: 'ai-assistant',
            children: [],
          },
          {
            name: 'cli',
            children: [],
          },
          {
            name: 'developer-experience',
            children: [
              {
                name: 'vim',
                children: [],
              },
            ],
          },
          {
            name: 'metacognition',
            children: []
          },
        ],
      },
      {
        name: 'computer-science',
        children: [
          {
            name: 'network',
            children: [],
          },
          {
            name: 'algorithm',
            children: [],
          },
        ]
      },
      {
        name: 'development',
        children: [
          {
            name: 'webdev',
            children: [],
          },
          {
            name: 'software-engineering',
            children: [],
          },
          {
            name: 'oop',
            children: [],
          }
        ],
      },
      {
        name: 'archive',
        children: [
          {
            name: 'project',
            children: [],
          },
        ],
      }
    ]
  }

  # See https://github.com/vasturiano/force-graph/blob/master/example/datasets/miserables.json
  def build
    hook :site, :pre_render do |site|
      next if ENV['BRIDGETOWN__DISABLE_BUILDERS'] == "true"
      wiki_documents = collect_wiki_resources(site)

      nodes = Set.new
      node_groups = Set.new
      links = []
      wiki_documents.each do |wiki_document|
        pathname = wiki_document.relative_path.to_s

        _, *tokens = pathname.split('/') # Removes _wiki/
        filename = tokens.join('/')
        source = filename[..-4] # Removes file extension name

        nodes << source

        wiki_content = wiki_document.content

        tags = wiki_document.data.tags
        tags.each do |tag|
          group_name = "##{tag}"
          links << {
            "source": group_name,
            "target": source,
            "value": 100,
          }
        end

        internal_links = wiki_content.scan(/\[\[([\w\-\/\_\s\.]+)\]\]/)
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

      cluster_node_coordinates, cluster_links = Utils::ClusterVisualizer.calculate_coordinates(CLUSTER)
      reference_graph = {
        "nodes": [
          *nodes.to_a.map { |name| ({ id: name, group: 1 }) },
          *cluster_node_coordinates,
        ],
        "links": [*links, *cluster_links],
      }

      target_file = site.in_root_dir("src", "_data", "wiki_datasets.json")
      File.write target_file, JSON.pretty_generate(reference_graph)
    end
  end
end
