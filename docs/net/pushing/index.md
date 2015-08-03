# Pushing events

The SDK supports pushing events directly into collections.  All methods take advantage of
[asynchronous programming with async/await](https://msdn.microsoft.com/en-us/library/hh191443.aspx).

## Single event

To push a single event to a collection, you can specify the collection name and the event to push:

```csharp
var result = await Connect.Push("mycollection", new {
	product = "Something",
	cost = 2.01m
});
```

## Multiple events

To push multiple events to a collection, you can specify the collection name and an enumerable of events to push:

```csharp
var events = new[] 
{
	new { product = "Something", cost = 2.01m },
	new { product = "Something Else", cost = 4.02m }
}

var result = await Connect.Push("mycollection", events);
```

## Queuing events

Events can be stored/cached locally and pushed to Connect later.  This provides a level of reliability to mitigate
the risk of network outages and is best practice.

This can be achieved in the SDK by "adding" events into collections.

### Queuing a single event

```csharp
await Connect.Add("mycollection", new { Name = "Something", Cost = 2.01m });
```

### Queuing multiple events

```csharp
var events = new[] 
{
	new { product = "Something", cost = 2.01m },
	new { product = "Something Else", cost = 4.02m }
}

await Connect.Add("mycollection", events);
```

### Pushing pending events

Once you have queued events, you must call `PushPending()` to have those events pushed to Connect.  Ideally, this
would be done regularly at an appropriate time in your application lifecycle.

```csharp
var response = await Connect.PushPending();

var status = response.Status; // status of the batch push (EventPushResponseStatus)
var httpStatusCode = response.HttpStatusCode; // HTTP status code
var errorMessage = response.ErrorMessage; // error message if applicable

// loop through the collections
foreach (var collectionResult in response.ResponsesByCollection) {
	var collectionName = collectionResult.Key;
	
	// loop through the results of individual events
	foreach (var result in collectionResult.Value) {
		var originalEvent = result.Event; // original event pushed
		var status = result.Status; // status of the individual event
		var errorMessage = result.ErrorMessage; // error message if applicable
		var fieldErrors = result.FieldErrors; // Dictionary of field to error message
	}
}
```
