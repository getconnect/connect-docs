## Batches of events

> **POST** https://api.getconnect.io/events

Instead of pushing events one by one, you can push events in batches. This is beneficial when you have a number of events to push in a single
request or if you wish to push to multiple collections in a single request.

> For large batches (over 5,000 events), you must upload the events to S3 and provide a URL to the batch.
> See [bulk importing events](#bulk-importing-events) for more information.

To push event batches, you must POST a batch containing an object of collections to event batches. For example:

```bash
curl -X POST \
  -H "X-Project-Id: YOUR_PROJECT_ID" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "purchases": [
        {
            "customer": {
                "firstName": "Tom",
                "lastName": "Smith"
            },
            "id": "1849506679",
            "product": "12 red roses",
            "purchasePrice": 34.95
        },
        {
            "customer": {
                "firstName": "Jane",
                "lastName": "Doe"
            },
            "id": "123456",
            "product": "1 daisy",
            "purchasePrice": 8.95
        }
    ],
    "refunds": [
        {
            "customer": {
                "firstName": "Tom",
                "lastName": "Smith"
            },
            "id": "REF-1234",
            "product": "12 red roses",
            "purchasePrice": -34.95
        }
    ]
}' \
  https://api.getconnect.io/events
```
```json
{
    "purchases": [
        {
            "customer": {
                "firstName": "Tom",
                "lastName": "Smith"
            },
            "id": "1849506679",
            "product": "12 red roses",
            "purchasePrice": 34.95
        },
        {
            "customer": {
                "firstName": "Jane",
                "lastName": "Doe"
            },
            "id": "123456",
            "product": "1 daisy",
            "purchasePrice": 8.95
        }
    ],
    "refunds": [
        {
            "customer": {
                "firstName": "Tom",
                "lastName": "Smith"
            },
            "id": "REF-1234",
            "product": "12 red roses",
            "purchasePrice": -34.95
        }
    ]
}
```

The above examples inserts events into two separate collections (purchases and refunds) in a single request.

The [restrictions](#restrictions-on-pushing) on events in the batches are the same as those for pushing a single event.

Batches will always return a successful response unless the overall batch document is poorly formatted or the batch exceeds the limit (5,000 events).
The response will contain an array of result objects for each collection, with each array containing the result of each event, in order, that was pushed.

Each result object indicates a boolean of `success`, a boolean of `duplicate` (indicate a duplicate event based on the `id` property) and a `message`
describing the reason for failure, if applicable.
