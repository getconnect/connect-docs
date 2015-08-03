# Security

Security is a vital component to the Connect service and we take it very seriously.  It is important to consider
how to ensure your data remains secure.

## API Keys

API keys are the core security mechanisms by which you can [push](#pushing-events) and [query](#querying-events)
your data.  It is important to keep these keys safe by controlling where these keys exist and who has access to them.

Each key can either push, query or both.  The most important key is the `Project Master Key` which can perform all of
these actions, as well as administrative functions such as deleting data.  Read more about the keys [here](#projects-and-keys).

## Keeping API Keys Secure

You should carefully consider when and which API keys to expose to users.

Crucially, you should **never** expose your `Project Master Key` to users or embed it in client applications.
If this key does get compromised, you can [reset it](#resetting-the-master-key).

If you embed API keys in client applications, you should consider these keys as fully accessible to anyone having access
to that client application.  This includes both mobile and web applications.

## Pushing events securely

While you can use a `Push Key` to prevent clients from querying events, you cannot restrict the collections or events
clients can push to the API.  Unfortunately, this is the nature of tracking events directly client-side and opens the
door to malicious users potentially sending bad data.

In many circumstances, this is not an issue as users can already generate bad data simply by using your application in
an incorrect way, generating events with bad or invalid data.  In circumstances where you absolutely cannot withstand
bad event data, you should consider pushing the events server-side from a service under your control.

Finally, if a `Push Key` is compromised or being used maliciously, you can always reset it by [resetting the master key](#resetting-the-master-key).

## Querying events securely

To query events, you must use an API key that has query permissions.  By default, a `Query Key` has full access to all
events in all collections in your project.  If this key is exposed, a client could execute any type of query on your
collections.

You have a number of options on querying events securely:

1. For internal querying or dashboard, you may consider it acceptable to expose the normal `Query Key` in client applications.
   Keep in mind that this key can execute any query on any collection in the project.
   
2. Generate a [filtered key](#filtered-keys), which applies a specific set of filters to all queries executed by clients
   with the key.

3. Only allow clients to execute queries via a service you control, which in turn executes queries via the Connect API server-side.

Finally, if a `Query Key` is compromised or being used maliciously, you can always reset it by [resetting the master key](#resetting-the-master-key).

## Resetting the master key

Resetting the `Project Master Key` will invalidate the previous key and generate a new, random key.  This action will also
reset all other keys for the project (including the push, query and any [filter keys](#filtered-keys) generated).

Doing this is **irreversible** and would prevent all applications with existing keys from pushing to or querying the project.

You can only reset the master key in the projects section of the [admin console](http://app.getconnect.io).
