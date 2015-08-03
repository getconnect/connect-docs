### Generating a filtered key

Filtered keys are generated and encrypted with the `Project Master Key`.  You do not have to register the
filtered key with the Connect service.

To generate a filtered key, you must supply the master key, key settings and [filters](#filters).  For example:

```csharp
var canPush = true;
var canQuery = true;
var keySettings = new KeySettings(canPush, canQuery);

string filteredKey = Connect.FilteredKeyQuery()
	.Where("customer.firstName", "Tom")
	.GenerateFilteredKey("YOUR_MASTER_KEY", keySettings);
```

<table>
	<tr>
		<th>Property</th>
		<th>Type</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>`filters`</td>
		<td>`object`</td>
		<td>The filters to apply all queries executed when using the key.  This uses the same specification for [defining filters](#filters) when querying normally.</td>
	</tr>
	<tr>
		<td>`canQuery`</td>
		<td>`boolean`</td>
		<td>Whether or not the key can be used to execute queries.  If `false`, the `filters` property is ignored (as it does not applying to pushing).</td>
	</tr>
	<tr>
		<td>`canPush`</td>
		<td>`boolean`</td>
		<td>Whether or not the key can be used to push events.</td>
	</tr>
</table>

You would use the resulting key when [creating a client](#initializing-the-client) or to provide to client
applications (e.g. in a browser using the [JavaScript SDK](js.html)).
