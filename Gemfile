source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

####
# Welcome to your project's Gemfile, used by Rubygems & Bundler.
#
# To install a plugin, run:
#
#   bundle add new-plugin-name -g bridgetown_plugins
#
# This will ensure the plugin is added to the correct Bundler group.
#
# When you run Bridgetown commands, we recommend using a binstub like so:
#
#   bin/bridgetown start (or console, etc.)
#
# This will help ensure the proper Bridgetown version is running.
####

# If you need to upgrade/switch Bridgetown versions, change the line below
# and then run `bundle update bridgetown`
gem "bridgetown", "~> 1.3.0"
gem "redcarpet", "~> 3.5"

# Uncomment to add file-based dynamic routing to your project:
# gem "bridgetown-routes", "~> 1.0.0", group: :bridgetown_plugins

# Puma is a Rack-compatible server used by Bridgetown
# (you can optionally limit this to the "development" group)
gem "puma", "~> 5.6"

gem "bridgetown-feed", "~> 3.1"

gem "bridgetown-webfinger", "~> 0.1.0"

gem "solargraph", :group => :development

group :development do
  gem "ruby-lsp", "~> 0.14.6"
end

gem "bridgetown-lit-renderer", "= 2.1.0.beta2"

gem "ruby-vips", "~> 2.2"

gem "front_matter_parser", "~> 1.0"
