## Reliability of events

Currently, it is not possible to persist/queue events for delivery in the JavaScript SDK.  Pushing events performs a simple,
asynchronous operation to push the event.

In a browser, this means you cannot guarantee the delivery of events successfully.

In a Node.js app, you may want to consider create queues for your events to ensure they are delivered reliably.

Events also allow a custom ID to be sent in the event document which will prevent duplicates (i.e. guarantees idempotence even if the event is delivered multiple times). For example:

```json
{
    "customer": {
        "firstName": "Tom",
        "lastName": "Smith"
    },
    "id": "1849506679",
    "product": "12 red roses",
    "purchasePrice": 34.95
}
```
