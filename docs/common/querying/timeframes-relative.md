### Relative timeframes

Relative timeframes can be specified as either a string or a complex type containing exact numbers of "periods" to filter.

> **Timezones**
>
> By default, all relative timeframes are **UTC** by default. See the [timezone section](#timezones) to specify your own timezone.

The following are supported string timeframes:

* this_minute
* last_minute
* this_hour
* last_hour
* today
* yesterday
* this_week
* last_week
* this_month
* last_month
* this_quarter
* last_quarter
* this_year
* last_year

You can also specify exactly how many current/previous periods you wish to include in the query results.

For example, if you want to filter by the **today and the last 2 days**:

```json
{
	"select": {
		"totalPrice": { "sum": "price" }
	},
	"timeframe": { "current": { "days": 3 } }
}
```
```js
connect.query("purchases")
    .select({
		"totalPrice": { "sum": "price" }
	})
	.timeframe({ "current": { "days": 3 } })
	.execute()
    .then(function(result) {
        // Handle the result
    });
```

Or, to filter by the **last 2 months, excluding the current month**:

```json
{
	"select": {
		"totalPrice": { "sum": "price" }
	},
	"timeframe": { "previous": { "months": 2 } }
}
```
```js
connect.query("purchases")
    .select({
		"totalPrice": { "sum": "price" }
	})
	.timeframe({ "previous": { "months": 2 } })
	.execute()
    .then(function(result) {
        // Handle the result
    });
```

The following periods are supported for complex, relative timeframes:

* minutes
* hours
* days
* weeks
* months
* quarters
* years

> **Weeks**
>
> Our weeks start on a Sunday and finish on a Saturday.  In the future, we plan to support specifying on which
> day of the week you'd like to start your weeks.
