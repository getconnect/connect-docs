The following error responses may be returned from the API:

**422 Unprocessable Entity**

The query was not in the correct format.  The message body will contain a list of errors, for example:

```json
{
    "errors": [
        {
            "field": "query",
            "description": "The query JSON supplied is not valid."
        }
    ]
}
```

**413 Too Many Results**

Queries result sets are limited to 10,000 results.  If you exceed this threshold, you will receive this error.

Ideally, queries should return a small number of results, even if they are aggregating a large number of events.
You should reconsider the way in which you are querying if you are hitting this limit.

**500 Internal Server Error**

An internal server error occurred in the Connect API. 
