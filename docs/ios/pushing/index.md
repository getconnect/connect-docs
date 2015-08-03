# Pushing events

The SDK supports pushing events directly into collections.

## Single event

To push a single event to a collection, you can specify the collection name and the event to push:

```objc
NSDictionary *event = @{
                        @"product": @"Something",
                        @"cost": @(2.01)
                        };
    
[[TPConnectClient sharedClient] pushEvent:event
                             toCollection:@"mycollection"
                        completionHandler:^(BOOL success, NSError *error) {
                            
                        }];
```
```swift
let event = [
    "product": "Something",
    "cost": 2.01
]
        
TPConnectClient.sharedClient()?.pushEvent(event, toCollection: "mycollection") {
    (success, error) in
    
}
```

## Batches of events

To push multiple events to one or more collections, you can create a dictionary of collection names to arrays of events:

```objc
NSArray *purchases = @[
                       @{
                           @"name": @"Phone",
                           @"price": @465.55
                           },
                       @{
                           @"name": @"Case",
                           @"price": @5.55
                           }
                       ];
    
NSDictionary *eftpos = @{
                            @"type": @"visa",
                            @"total": @571.10
                        };
    
NSDictionary *batch = @{
                            @"purchases": purchases,
                            @"eftpos": @[eftpos]
                        };
    
[[TPConnectClient sharedClient] pushEventBatch:batch
                             completionHandler:^(NSDictionary * results, NSError * error) {
                                 
                             }];
```
```swift
let batch = [
    "purchases": [
        [
            "name": "phone",
            "price": 465.55
        ],
        [
            "name": "case",
            "price": 5.55
        ]
    ],
    "eftpos": [[
        "type": "visa",
        "total": 571.10
    ]]
]
        
TPConnectClient.sharedClient()?.pushEventBatch(batch) {
    (results, error) in
    
}
```

## Queuing events

Events can be stored/cached locally and pushed to Connect later.  This provides a level of reliability to mitigate
the risk of network outages or device crashes.

This can be achieved in the SDK by "adding" events into collections:

```objc
NSError *error;
    
[[TPConnectClient sharedClient] addEvent:event
                            toCollection:@"mycollection"
                               withError:&error];
```
```swift
var error: NSError?
        
TPConnectClient.sharedClient()?.addEvent(event, toCollection: "mycollection", withError: &error)
```

Periodically or on a specific trigger, you must push the pending events in a batch to Connect:

```objc
[[TPConnectClient sharedClient] pushAllPendingEventsWithCompletionHandler:^(NSDictionary * results, NSError * error) {
    
}];
```
```swift
TPConnectClient.sharedClient()?.pushAllPendingEventsWithCompletionHandler {
    (results, error) in
    
}
```

The `results` is an `NSDictionary` keyed by collection name.  The value of the `NSDictionary` is an `NSArray` of
[TPEventAPIResponse](http://cocoadocs.org/docsets/ConnectClient/0.2.0/Classes/TPEventAPIResponse.html)
indicating the response to an individual event.
