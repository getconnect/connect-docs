### Absolute timeframes

You can specify an absolute timeframe to filter events that occurred between specific dates.  For example:

```csharp
var queryResponse = await Connect.Query("purchases")
	.Select(new {
		totalPrice = Aggregations.Sum("price")
	})
	.Between(new DateTime(2015, 01, 01), new DateTime(2015, 01, 06))
	.Execute()
```

> The Connect API only accepts UTC dates for an absolute timeframe, therefore if you specify a DateTime with a kind of
> `DateTimeKind.Local`, it will be converted to UTC before querying.

You can also use `StartingAt` or `EndingAt` to filter events that occurred after or before a specific date, respectively:

```csharp
var queryResponse = await Connect.Query("purchases")
	.Select(new {
		totalPrice = Aggregations.Sum("price")
	})
	.StartingAt(new DateTime(2015, 01, 01))
	.Execute()
```


> You can only specify a timezone and an absolute timeframe when you have also specified a [time interval](#time-intervals).
> If a timezone is specified on an absolute timeframe query that does not have a time interval an error
> will occur.
