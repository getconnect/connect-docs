# Querying events

> **GET** https://api.getconnect.io/events/:collection?query=
>
> | Parameter                      | Description                                          |
> | ------------------------------ | ---------------------------------------------------- |
> | collection                     | collection to query                                  |
> | query (query string parameter) | query to run                                         |

To query events in Connect, you construct a query document and perform a GET request with the URL-encoded JSON in the `query` parameter of the query string.

For example, to get the sum of the `price` property in a collection called `purchases`, you would build the following query:

```json
{
	"select": {
		"totalPrice": { "sum": "price" }
	}
}
```

To execute the query, you would run:

```bash
curl -H "X-Project-Id: YOUR_PROJECT_ID" \
     -H "X-API-Key: YOUR_API_KEY" \
     https://api.getconnect.io/events/purchases?query={select:{totalPrice:{sum:'price'}}}
```
