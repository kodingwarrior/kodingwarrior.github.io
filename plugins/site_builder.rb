class SiteBuilder < Bridgetown::Builder
  # write builders which subclass SiteBuilder in plugins/builders
  def collect_wiki_resources(site)
    site.resources
      .select { |resource| resource.absolute_url.include?('/wiki/') }
      .reject { |resource| resource.absolute_url.include?('/templates/') }
      .reject { |resource| resource.absolute_url.end_with?('/wiki/') }
  end
end

