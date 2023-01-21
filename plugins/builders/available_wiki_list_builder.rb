class Builders::AvailableWikiListBuilder < SiteBuilder
  def build 
    hook :site, :pre_render do |site|
      wiki_documents = collect_wiki_resources(site)

      list = Set.new
      wiki_documents.each do |wiki_document|
        pathname = wiki_document.relative_path.to_s

        _, *tokens = pathname.split('/') # Removes _wiki/
        filename = tokens.join('/')
        source = filename[..-4] # Removes file extension name

        list << source
      end
 
      target_file = site.in_root_dir("src", "_data", "available_wiki_documents.json")
      File.write target_file, list.to_a.to_json
    end
  end
end
