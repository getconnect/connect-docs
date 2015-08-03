# Pushing events

Pushing events via HTTP is simple.  Once you have your [project ID and push API key](#projects-and-keys), simply POST the JSON event to your
collection endpoint and your events are available for [querying](#querying) immediately.

## Single event

> **POST** https://api.getconnect.io/events/:collection
>
> | Parameter         | Description                                          |
> | ----------------- | ---------------------------------------------------- |
> | collection        | collection to which to push the event                |

To push a single event, POST it to your collection endpoint.

For example, to push an event to `test-collection`:

```bash
curl -X POST \
  -H "X-Project-Id: YOUR_PROJECT_ID" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "customer": { "firstName": "Tom", "lastName": "Smith" }, "product": "12 red roses", "purchasePrice": 34.95 }' \
  https://api.getconnect.io/events/test-collection
```
