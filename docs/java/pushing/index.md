# Pushing events

Once you have created a client, you can start pushing events.

## Single event

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

Periodically or on a specific trigger, you must call `pushPending()` which will synchronously push the queued events in a batch to Connect:

```java
// Push the queued events to Connect
EventBatchPushResponse response = client.pushPending();

int statusCode = response.getStatusCode(); // HTTP status code
String errorMessage = response.getErrorMessage(); // Error message if applicable

// Loop through each collection that was pushed
for (Map.Entry<String, Iterable<EventPushResponse>> collectionResponse : response.getResponses().entrySet()) {
	String collection = collectionResponse.getKey();
	Iterable<EventPushResponse> responses = collectionResponse.getValue();
	
	// Loop through the response to each individual event
	for (EventPushResponse response : responses) {
		Map<String, Object> originalEvent = response.getEvent(); // Get the original event
		Boolean isSuccessful = response.isSuccessful(); // Was the event pushed successfully?
		Boolean isDuplicate = response.isDuplicate(); // Did the event fail because it is a duplicate?
		String message = response.getMessage(); // Get a related error/duplicate message
	}
}
```

## Batches of events

You can also push multiple events to multiple collections in a single call:

```java
// Create the batch (collection name is the key)
HashMap<String, Map<String, Object>[]> batch = new HashMap<String, Map<String, Object>[]>();

// Construct the events
HashMap<String, Object> event1 = new HashMap<String, Object>();
event1.put("product", "banana");
event1.put("quantity", 5);
event1.put("totalCost", 14.75);

HashMap<String, Object> event2 = new HashMap<String, Object>();
event1.put("product", "carrot");
event1.put("quantity", 2);
event1.put("totalCost", 4.00);

batch.put("productsSold", new Map[] { event1, event2 });

// Push the batch to Connect
client.push(batch);
```

## Exception handling

When pushing events, exceptions are thrown, so you should either ignore or handle those exceptions gracefully.

Specifically, the following exceptions can be thrown when pushing events synchronously:

* `DuplicateEventException` - the event being pushed already exists
* `InvalidEventException` - the event being pushed is invalid (e.g. invalid event properties)
* `ServerException` - a server-side exception occurred in Connect's API
* `IOException` - an exception occurred sending or receiving the request or response, respectively (e.g. a network failure)
