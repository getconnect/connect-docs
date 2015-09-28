## Reliability of events

You can ensure delivery of events reliably by [queuing the events](#queuing-events) and [configuring event stores](#configuring-event-stores).
You should then handle the response from `pushPending()` or `pushPendingAsync()` to verify that all the events were successfully pushed.

```java
client.pushPendingAsync(new ConnectBatchCallback() {
    public void onSuccess(Map<String, Iterable<EventPushResponse>> details) {
        for (String collection : details.keySet()) {
            for (EventPushResponse eventResponse : details.get(collection)) {
                // eventResponse will contain the details about the success of the event.
            }
        }
    }
    public void onFailure(ConnectException e) {
        e.printStackTrace();
    }
});
```

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

// Push the event to Connect
client.pushAsync("productsSold", event, new ConnectCallback() {
    public void onSuccess() {}
    public void onFailure(ConnectException e) {
        e.printStackTrace();
    }
});
```