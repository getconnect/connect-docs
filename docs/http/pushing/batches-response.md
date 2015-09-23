### Batch responses

**200 OK**

An example response for the above request could be:

```json
{
    "purchases": [
        {
            "success": true
        },
        {
            "success": false,
            "message": "An error occurred inserting the event please try again."
        }
    ],
    "refunds": [
        {
            "success": true
        }
    ]
}
```

**500 Internal Server Error**

A server error occurred with the Connect API.

```json
{
    "errorMessage": "An error occurred while processing your request"
}
```
