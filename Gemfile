source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem "jekyll", "~> 3.6.0"
gem "github-pages",
  github: 'UnderpantsGnome/pages-gem',
  branch: "paginate-v2",
  group: :jekyll_plugins

require 'rbconfig'
  if RbConfig::CONFIG['target_os'] =~ /darwin(1[0-3])/i
    gem 'rb-fsevent', '<= 0.9.4'
  end
