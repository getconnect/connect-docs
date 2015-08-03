## Reliability of events

You can ensure delivery of events reliably by [queuing the events](#queuing-events).
You should then handle the response from `PushPending()` to verify that all the events were successfully pushed.

Events also allow a custom ID to be sent in the event document which will prevent duplicates (i.e. guarantees idempotence even if the event is
delivered multiple times). For example:

```csharp
var result = await Connect.Push("mycollection", new {
	id = "12345",
	product = "Something",
	cost = 2.01m
});
```