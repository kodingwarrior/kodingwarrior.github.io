class Builders::BacklinkBuilder < SiteBuilder
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
          node_groups << group_name
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

      reference_graph = {
        "nodes": [
          *nodes.to_a.map { |name| ({ id: name, group: 1 }) },
          *rearrange_coordinates(node_groups.to_a.map { |name| ({ id: name, group: 2 }) })
        ],
        "links": links,
      }

      target_file = site.in_root_dir("src", "_data", "wiki_datasets.json")
      File.write target_file, JSON.pretty_generate(reference_graph)
    end
  end

  private
    # Applied Sunflower Seed Arrangements
    #
    # See https://demonstrations.wolfram.com/SunflowerSeedArrangements/
    def rearrange_coordinates(node_groups)
      node_groups.delete_if { |obj| obj[:id] == "meta-document" }
      [*node_groups.to_a, { id: "meta-document", group: 2 }].zip(sunflower(node_groups.size )).map { |f, s| f.merge(s) }
    end

    def sunflower(n, alpha = 0, geodesic = false)
      phi = (1.0 + Math.sqrt(5)) / 2.0

      points = []
      angle_stride = if geodesic
        360.0 * phi
      else
        2.0 * Math::PI / (phi ** 2)
      end

      b = (alpha * Math.sqrt(n)) # number of boundary points
      (1..n).each do |k|
        r = 200 + radius(k, n, b)
        theta = k * angle_stride

        # calculates fixed (x,y) coordinates for hashtag nodes with randomness
        points << { fx: r * Math.cos(theta), fy: r * Math.sin(theta) }
      end

      cx = points.reduce(0) { |acc, elem| elem[:fx] } / points.size.to_f
      cy = points.reduce(0) { |acc, elem| elem[:fy] } / points.size.to_f

      # meta-document tag is the center
      points << { fx: cx, fy: cy }

      points
    end

    def radius(k, n, b)
      if k > n - b
        1.0
      else
        Math.sqrt(k - 0.5) / Math.sqrt(n - (b + 1) / 2.0)
      end
    end
end
