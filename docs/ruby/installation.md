# Installing the SDK

The simplest way to get started is to install the `connect_client` Ruby Gem.

## Bundler

Add the following line to your Gemfile and run `bundle install`:

```ruby
gem "connect_client"
```

## RubyGems

You can also add straight from RubyGems:

```bash
gem install connect_client
```

# Initializing the client

Before you can start [pushing events](#pushing-events), you must initialize the
Connect client with your [project ID and API key](#projects-and-keys):

```ruby
require 'connect_client'

ConnectClient.configure do |config|
  config.project_id = 'YOUR_PROJECT_ID'
  config.api_key = 'YOUR_PUSH_KEY'
  config.async = false
end
```

Whether or not to set `async` to `true` or `false` is detailed in [pushing events](#pushing-events).