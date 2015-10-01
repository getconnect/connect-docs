### Generating a filtered key

Filtered keys are generated and encrypted with the `Project Master Key`.  You do not have to register the
filtered key with Connect.

To generate a filtered key, you must supply the master key, key settings and [filters](http#filters).
The structure of the filters should match the structure of [JSON filters in the HTTP API](http#filters).
For example:

```python
from connect import security

key_definition = {
     'filters' : {
         'type': 'cycling'
         },
    'canQuery': True,
    'canPush': True
}
master_key = 'your-master-key'

print security.encrypt_filtered_key(key_definition, 
                                    master_key)
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
		<td>The filters to apply all queries executed when using the key.  These filters should be generated with the same structure as [filters](http#filters) from the HTTP API.</td>
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

You would use the resulting key to provide to client applications (e.g. in a browser using the [JavaScript SDK](js)).
