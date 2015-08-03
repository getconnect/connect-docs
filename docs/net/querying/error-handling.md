## Error handling

When you `Execute()` a query, you will receive a `QueryResponse` in response to the query.
You should check the `Status` of this response to ensure it is successful and, if not, handle the error
gracefully.

`QueryResponse` is an enum with the following values:

* **Successful** - the query was successful
* **Unauthorized** - the project ID or API key used were not correct
* **QueryFormatError** - the query was not correctly formatted
* **NetworkError** - a network error occurred while running the query
* **GeneralError** - a general/unknown error occurred while running the query  

If the result is not successful, you will be able to find a general error message in `ErrorMessage`
as well as field specific errors (if applicable) in `FieldErrors`.

Exceptions are only thrown when a valid response is not received from the Connect API.  These would
capture issues like client network connectivity. 
