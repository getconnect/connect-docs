## Filtered keys

Filtered keys allows you to create an API key that can either push or query, and in the case of querying,
apply one or more [filters](#filters) to all queries executed with the key.

This allows you to have finer control over security and what data clients can access, especially in multi-tenant
environments.

> **Filters are only applied to queries**
>
> Any filters specified in your filtered key only apply to querying.  We currently do not support applying
> filters to restrict the pushing of events.

Filtered keys can only push or query (as you specify), *never* administrative functions or deleting data.  
