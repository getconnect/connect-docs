### Limitations

* Aggregations only work on numeric properties.  If you try to aggregate a string property, you will receive a null result.
  If you try to aggregate a property with multiple types (e.g. some strings, some numbers), only the numeric values will be
  added - the rest are ignored.
