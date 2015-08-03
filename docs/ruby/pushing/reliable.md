## Reliability of events

Currently, it is not possible to persist/queue events for delivery in the Ruby SDK.  Pushing events either performs a synchronous or asynchronous operation.
If that push fails, it is not persisted in a queue of any sort.

We recommend that you consider using a queuing mechanism to ensure reliability of the events if your application relies on the delivery of all events.

Events also allow a custom ID to be sent in the event document which will prevent duplicates (i.e. guarantees idempotence even if the event is delivered multiple times). For example:

```ruby
myEvent = {
	:name => "Something",
	:id => "12345678",
	:cost => 2.01
}
```
