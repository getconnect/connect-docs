## Restrictions

While you can post almost any event structure to Connect, there are a few, by-design restrictions.

### Property names

* You cannot have any property in the root document beginning with "tp_". This is because we prefix our
  own internal properties with this. Internally, we merge our properties into your events for performance
  at query time.

* The property "_id" is reserved and cannot be pushed.
  
* The properties "id" and "timestamp" have special purposes. These allow consumers to specify a unique ID
  per event and override the event's timestamp respectively.  You cannot use the "id" property in queries.
  Refer to ["reliability of events"](#reliability-of-events) and ["timestamps"](#timestamps) for information.

* The length of property names can't exceed 255 characters.  If you need property names longer than this, you
  probably [need to reconsider the structure of your event!](#structuring-your-events)
  
* Properties cannot include a dot in their names.  This is because dots are used in querying to access nested
  properties.  The following is an example of an invalid event property due to a dot in the name:

```json
{
    "invalid.property": "value"
}
```
```java
event.put("invalid.property", "value");
```
```csharp
var result = await Connect.Push("mycollection", new Dictionary<string, object> {
    { "invalid.property", "value" }
});
```
```ruby
myEvent = {
	"invalid.property" => "value"
}
```
```php
Connect::push('mycollection', [
  'invalid.property' => 'value'
]);
```
```objc
NSDictionary *event = @{
                        @"invalid.property": @"value"
                        };
```
```swift
let event = [
    "invalid.property": "value"
]
```

### Arrays

While you can create events with arrays, it is currently not possible to take advantage of these arrays at
query time.  Therefore, you should avoid using arrays in your events unless you plan to export the raw events.

### Distinct count

Distinct count is currently not supported for querying, therefore you should consider how to structure your
event if your application relies on this.
