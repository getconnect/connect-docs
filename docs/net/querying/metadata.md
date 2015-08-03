## Metadata

The query results return metadata on the executed query.  This includes any [groups](#group-by) used, the [time interval](#time-intervals), if specified,
and the [timezone](#timezones), if specified, for the query.

For example, the following query:

```csharp
var queryResponse = await Connect.Query("purchases")
	.Select(new {
		totalPrice = Aggregations.Sum("price")
	})
	.GroupBy("product")
	.Daily()
	.ThisMonth()
	.Timezone("Australia/Brisbane")
	.Execute();
```

The metadata would be:

```csharp
Console.WriteLine(string.Format("Groups: {0}", string.Join(", ", queryResponse.Metadata.Groups.ToArray())));
Console.WriteLine("Interval: " + queryResponse.Metadata.Interval.ToString());
Console.WriteLine("Timezone: " + queryResponse.Metadata.Timezone);

// output is:
//
// Groups: product
// Interval: Daily
// Timezone: Australia/Brisbane
```

The metadata can assist you if you wish to visualize the query results as it provides useful information on how to display that data.
