# Pushing events

The SDK offers a number of ways to push events to Connect either synchronously or asynchronously.

## Pushing events synchronously

The SDK supports synchronously pushing events into collection(s). When performance is important, however,
we recommend [pushing events asynchronously](#pushing-events-asynchronously) or
[pushing events with synchrony](#pushing-events-with-synchrony).

To push events synchronously, ensure that `async` is set to `false` as follows:

```ruby
require 'connect_client'

ConnectClient.configure do |config|
  config.project_id = 'YOUR_PROJECT_ID'
  config.api_key = 'YOUR_PUSH_KEY'
  config.async = false
end
```

### Single event

To push a single event into a collection, call the `push` function on `ConnectClient` and pass in the collection name and a `Hash` keyed with symbols:

```ruby
response = ConnectClient.push :my_collection, { :product => "Something", :cost => 2.01 }
```

### Multiple events

To push multiple events into a single collection, call the `push` function on `ConnectClient` and pass in the collection name and an array of `Hash` keyed with symbols:

```ruby
response = ConnectClient.push(:my_collection, [
  { :name => "Something 1", :cost => 2.01 },
  { :name => "Something 2", :cost => 4.02 }
])
```

### Batches of events

To push multiple events into multiple collections, call the `push` function on `ConnectClient` and pass a `Hash` keyed with collection names:

```ruby
response = ConnectClient.push({ :my_collection => [
  { :name => "Something 1", :cost => 2.01 },
  { :name => "Something 2", :cost => 4.02 }
], :my_other_collection => [
  { :name => "Something 2", :cost => 2.01 },
  { :name => "Something 3", :cost => 4.02 }
]})
```

## Pushing events asynchronously

The SDK also offers the ability to push events asynchronously by using `EventMachine`.  This is the recommended
way to push events in most apps.

To push events asynchronously, ensure that `async` is set to `true` and require `eventmachine` as follows:

```ruby
require 'eventmachine'
require 'connect_client'

ConnectClient.configure do |config|
  config.project_id = 'YOUR_PROJECT_ID'
  config.api_key = 'YOUR_PUSH_KEY'
  config.async = true
end
```

Asynchronous push supports all of the push methods described in [pushing events synchronously](#pushing-events-synchronously), but are run using
`em-http-request`.

**Note:** The `em-http-request` gem is *not* installed as a dependency when installing the `connect_client` gem because asynchronous push requires
you to "opt in."  You must manually install this gem for asynchronous push to function.

To push an event asynchronously you can invoke push using `EventMachine.run`:

```ruby
EM.run do
  ConnectClient.push(:my_collection, { :name => "Something", :cost => 2.01 }).response_received { |response|
    puts response
    EM.stop
  }.error_occured { |error|
    puts error
    EM.stop
  }
end
```

## Pushing events with synchrony

The SDK supports asynchronously pushing events into collection(s) with `em-synchrony`.  This allows the code to remain appearing synchronous while
actually running asynchronously.

To push events with synchrony, ensure that `async` is set to `false` and require the relevant `eventmachine` and `em-synchrony` gems as follows:

```ruby
require 'eventmachine'
require 'em-synchrony'
require 'em-synchrony/em-http'
require 'connect_client'

ConnectClient.configure do |config|
  config.project_id = 'YOUR_PROJECT_ID'
  config.api_key = 'YOUR_PUSH_KEY'
  config.async = false
end
```

Asynchronous push with synchrony supports all of the push methods described in [pushing events synchronously](#pushing-events-synchronously), but are
run using `em-http-request` and `em-synchrony`.

**Note:** The `em-http-request` and `em-synchrony` gems are *not* installed as a dependency when installing the `connect_client` gem because
asynchronous push with synchrony requires you to "opt in."  You must manually install these gems for this to function.

To push an event asynchronously with synchrony you can invoke push using `EM.synchrony`:

```ruby
EM.synchrony do
  response = ConnectClient.push(:my_collection, { :name => "Something", :cost => 2.01 })
  EM.stop
end
```
