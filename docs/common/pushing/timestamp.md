## Timestamps

All events have a single `timestamp` property which records when the event being pushed occurred.  Events cannot
have more than one date/time property.  If you feel you need more than one date/time property, you probably need
to reconsider how you're [modeling your events](#modeling-your-events).

> **Querying**
>
> You can only run time interval queries or timeframe filters on the `timestamp` property.  No other date/time property
> in an event is supported for querying.

By default, if no `timestamp` property is sent with the event, the SDK will use the current date and time as
the timestamp of the event.

The timestamp, however, can be overridden to, for example, accommodate historical events or maintain accuracy
of event times when events are queued.  For example:

```java
// Construct the event
HashMap<String, Object> event = new HashMap<String, Object>();
event.put("product", "banana");
event.put("quantity", 5);
event.put("totalCost", 14.75);

// Set the event's timestamp
event.put(`timestamp`, new Date());

// Push the event synchronously to Connect
client.push("productsSold", event);
```
```csharp
var result = await Connect.Push("mycollection", new {
	timestamp = DateTime.Now,
	product = "Something",
	cost = 2.01m
});
```
```ruby
myEvent = {
	:name => "Something",
	:timestamp => Time.now.utc,
	:cost => 2.01
}
```
```php
Connect::push('purchases', [
	'timestamp' => new DateTime(null, new DateTimeZone('UTC')),
	'product' => '12 red roses',
	'purchasePrice' => 34.95
]);
```
```objc
NSDictionary *event = @{
                        @`timestamp`: [NSDate date],
                        @"product": @"Something",
                        @"cost": @(2.01)
                        };
```
```swift
let event = [
	`timestamp`: NSDate(),
    "product": "Something",
    "cost": 2.01
]
```

> **Timezones**
>
> Timestamps are always recorded in UTC.  If you supply a timestamp in a timezone other than UTC, it will
> be converted to UTC.  When you query your events, you can specify a timezone so things like time intervals
> will be returned in local time.
