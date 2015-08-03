### Relative timeframes

Relative timeframes can be specified as either a string or a complex type containing exact numbers of "periods" to filter.

> **Timezones**
>
> By default, all relative timeframes are **UTC** by default. See the [timezone section](#timezones) to specify your own timezone.

The following are supported timeframes:

* ThisMinute()
* LastMinute()
* ThisHour()
* LastHour()
* Today()
* Yesterday()
* ThisWeek()
* LastWeek()
* ThisMonth()
* LastMonth()
* ThisQuarter()
* LastQuarter()
* ThisYear()
* LastYear()

You can also specify a relative timeframe with an enum:

```csharp
var queryResponse = await Connect.Query("purchases")
	.Select(new {
		totalPrice = Aggregations.Sum("price")
	})
	.WithRelativeTimeframe(RelativeTimeWindow.ThisMonth)
	.Execute();
```

Or a string:

```csharp
var queryResponse = await Connect.Query("purchases")
	.Select(new {
		totalPrice = Aggregations.Sum("price")
	})
	.WithRelativeTimeframe("this_month")
	.Execute();
```

You can also specify exactly how many current/previous periods you wish to include in the query results.

For example, if you want to filter by the **today and the last 2 days**:

```csharp
var queryResponse = await Connect.Query("purchases")
	.Select(new {
		totalPrice = Aggregations.Sum("price")
	})
	.Current(3, TimeType.Days)
	.Execute();
```

Or, to filter by the **last 2 months, excluding the current month**:

```csharp
var queryResponse = await Connect.Query("purchases")
	.Select(new {
		totalPrice = Aggregations.Sum("price")
	})
	.Previous(2, TimeType.Months)
	.Execute();
```

> If you are using C# 6.0 or above you may find it useful to statically include the RelativeWindow and TimeType enums.
> 
> `using static ConnectSdk.Querying.RelativeWindow`  
> `using static ConnectSdk.Querying.TimeType`
> 
> This enables you to use the enums without prefixes.

The following periods are supported for complex, relative timeframes:

* TimeType.Minutes
* TimeType.Hours
* TimeType.Days
* TimeType.Weeks
* TimeType.Months
* TimeType.Quarters
* TimeType.Years

> **Weeks**
>
> Our weeks start on a Sunday and finish on a Saturday.  In the future, we plan to support specifying on which
> day of the week you'd like to start your weeks.
