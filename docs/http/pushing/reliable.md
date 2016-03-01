## Reliability of events

When posting an event to Connect, we guarantee the storage of the event if a successful (200) response is returned. This means you can safely flag the event as recorded.

**Note:** Events are processed in the background so it is possible that there will be a slight delay between a successful push response and the event being included in query results.

To guarantee event delivery, it is recommended to queue the events for sending to Connect and only remove them from the queue once a successful response has been received.

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
