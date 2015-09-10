### Responses

**200 OK**

The event has been successfully recorded.

**422 Unprocessable Entity**

One or more errors have occurred with the event data sent.

```json
{
    "errors": [
        { "field": "fieldName", "description": "There was an error with this field." }
    ]
}
```

**500 Internal server Error**

A server error occurred with the Connect API.

```json
{
    "errorMessage": "An error occurred while processing your request"
}
```

**400 Bad Request**

The event data supplied is not valid.

```json
{
    "errorMessage": "Property names starting with tp_ are reserved and cannot be set."
}
```
