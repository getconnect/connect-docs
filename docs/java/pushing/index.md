# Pushing events

Once you have created a client, you can start pushing events.

## Single event

To push a single event asynchronously to Connect:

```java
// Construct the event
HashMap<String, Object> event = new HashMap<String, Object>();
event.put("product", "banana");
event.put("quantity", 5);
event.put("totalCost", 14.75);

// Push the event asynchronously to Connect
client.pushAsync("productsSold", event, new ConnectCallback() {
	public void onSuccess() {
    	// Called if the event was successfully pushed
	}
	public void onFailure(ConnectException e) {
		e.printStackTrace();
	}
});
```

To push a single event synchronously to Connect:

```java
// Construct the event
HashMap<String, Object> event = new HashMap<String, Object>();
event.put("product", "banana");
event.put("quantity", 5);
event.put("totalCost", 14.75);

// Push the event synchronously to Connect
client.push("productsSold", event);
```

Maps and arrays can be nested inside the root event map to allow for nesting of properties.

## Queuing events

You can also queue events for pushing later to Connect.  This is useful if you are collecting many events and wish to push them periodically or on a specific trigger.

Queuing events simply pushes the event into the configured `EventStore` (see [Configuring event stores](#configuring-event-stores)).

To queue an event:

```java
// Construct the event
HashMap<String, Object> event = new HashMap<String, Object>();
event.put("product", "banana");
event.put("quantity", 5);
event.put("totalCost", 14.75);

// Add the event to the queue
client.add("productsSold", event);
```

Periodically or on a specific trigger, you must call `pushPending()` or `pushPendingAsync()` which will push the queued events in a batch to Connect:

```java
// Push the queued events to Connect
client.pushPendingAsync(new ConnectBatchCallback() {
	public void onSuccess(Map<String, Iterable<EventPushResponse>> details) {
		// Details will contain the success status of each event
	}
	public void onFailure(ConnectException e) {
		e.printStackTrace();
	}
});

```

## Batches of events

You can also push multiple events to multiple collections in a single call:

```java

// Construct the events
HashMap<String, Object> event1 = new HashMap<String, Object>();
event1.put("product", "banana");
event1.put("quantity", 5);
event1.put("totalCost", 14.75);

HashMap<String, Object> event2 = new HashMap<String, Object>();
event2.put("product", "carrot");
event2.put("quantity", 2);
event2.put("totalCost", 4.00);

// Create the batch (collection name is the key)
HashMap<String, Map<String, Object>[]> batch = new HashMap<String, Map<String, Object>[]>();
batch.put("productsSold", new Map[]{event1, event2});

client.pushBatchAsync(batch, new ConnectBatchCallback() {
	public void onSuccess(Map<String, Iterable<EventPushResponse>> details) {
		// details will contain the success status of each event
	}
    public void onFailure(ConnectException e) {
        e.printStackTrace();
    }
});

```

## Exception handling

When using the synchronous pushing events, exceptions are thrown, so you should either ignore or handle those exceptions gracefully.

Specifically, the following exceptions can be thrown when pushing events synchronously:

* `InvalidEventException` - the event being pushed is invalid (e.g. invalid event properties)
* `ServerException` - a server-side exception occurred in Connect's API
* `ConnectException` - a generic exception. (e.g. a network failure)
