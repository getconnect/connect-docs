## Metadata

The query results return metadata on the executed query.  This includes any [groups](#group-by) used, the [time interval](#time-intervals), if specified,
and the [timezone](#timezones), if specified, for the query.

For example, if you grouped by `product`, with a **daily** time interval and a timezone of **Australia/Brisbane**, the metadata would look like:

```json
{
	"groups": ["product"],
	"interval": "daily",
	"timezone": "Australia/Brisbane"
}
```

Metadata is used by our Visualization SDK to discover the shape of your query so that we can easily display the results.  If you're doing your own visualization,
you can take advantage of the metadata as hints on how to render the results.
