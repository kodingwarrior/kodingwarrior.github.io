require "bridgetown"
require 'front_matter_parser'
require_relative 'plugins/utils/opengraph/image'

Bridgetown.load_tasks

# Run rake without specifying any command to execute a deploy build by default.
task default: :deploy

#
# Standard set of tasks, which you can customize if you wish:
#
desc "Build the Bridgetown site for deployment"
task :deploy => [:clean, "frontend:build"] do
  Bridgetown::Commands::Build.start
end

desc "Build the site in a test environment"
task :test do
  ENV["BRIDGETOWN_ENV"] = "test"
  Bridgetown::Commands::Build.start
end

desc "Runs the clean command"
task :clean do
  Bridgetown::Commands::Clean.start
end

namespace :frontend do
  desc "Build the frontend with esbuild for deployment"
  task :build do
    sh "npm run esbuild"
  end

  desc "Watch the frontend with esbuild during development"
  task :dev do
    sh "npm run esbuild-dev"
  rescue Interrupt
  end
end

#
# Add your own Rake tasks here! You can use `environment` as a prerequisite
# in order to write automations or other commands requiring a loaded site.
#
task :my_task => :environment do
  Dir.glob("src/_wiki/**/*.md").reject { _1.include?("templates") }.each do |path|
    puts "===="
    puts path
    loader = FrontMatterParser::Loader::Yaml.new(allowlist_classes: [Time, Date, DateTime])
    parsed = FrontMatterParser::Parser.parse_file(path, loader:)

    front_matter = parsed.front_matter

    title = front_matter['title'].to_s
    description = front_matter['description'] || "."

    relative_path = path.split("/")[2..].join("/")
    image_path = relative_path.split('.').first + ".png"

    target_path = "src/assets/wiki/#{image_path}"

    FileUtils.mkdir_p target_path.split('/')[...-1].join('/')
    image = Utils::Opengraph::Image.new(1200, 800)
              .text(title, width: 1000, height: 300)
              .text(description, width: 1000, height: 300)
              .border_bottom(4)
              .compose(target_path) do |_title, _description|
          {
            x: [100, 100],
            y: [100, 300]
          }
        end

    puts target_path
  end

  automation do
    say_status :rake, "I'm a Rake tast =) #{site.config.url}"
  end
end
