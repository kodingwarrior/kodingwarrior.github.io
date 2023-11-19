class Builders::RfcGraphBuilder < SiteBuilder
  RFC_DOCUMENTS = [
    {
      name: 'rfc2616',
      title: 'HTTP/1.1',
      references: []
    },
    {
      name: 'rfc7033',
      title: 'WebFinger',
      references: ['rfc7565']
    },
    {
      name: 'rfc7565',
      title: 'acct uri scheme',
      references: []
    }
  ]

  def build
    hook :site, :pre_render do |site|
      next if ENV['BRIDGETOWN__DISABLE_BUILDERS'] == "true"

      nodes = Set.new
      links = []

      titles = {}

      RFC_DOCUMENTS.each do |document|
        nodes << document[:name]
        titles[document[:name]] = document[:title]

        document[:references].each do |reference|
          nodes << reference
          links << {
            'source': document[:name],
            'target': reference,
            'value': 1
          }
        end
      end

      reference_graph = {
        'nodes': [
          *nodes.to_a.map { |name| { id: name, group: 1, name: titles[name] || name } }
        ],
        'links': [*links]
      }

      target_file = site.in_root_dir('src', '_data', 'rfc_references.json')
      File.write target_file, JSON.pretty_generate(reference_graph)
    end
  end
end
