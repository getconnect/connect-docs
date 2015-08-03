## Reliability of events

You can ensure delivery of events reliably by [queuing the events](#queuing-events) and [configuring event stores](#configuring-event-stores).
You should then handle the response from `pushPending()` to verify that all the events were successfully pushed.

Events also allow a custom ID to be sent in the event document which will prevent duplicates (i.e. guarantees idempotence even if the event is
delivered multiple times). For example:

```java
// Construct the event
HashMap<String, Object> event = new HashMap<String, Object>();
event.put("product", "banana");
event.put("quantity", 5);
event.put("totalCost", 14.75);

// Set an ID on the event to prevent duplicates
event.put("id", "1849506679");

// Push the event synchronously to Connect
client.push("productsSold", event);
```