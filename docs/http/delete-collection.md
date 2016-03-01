# Deleting collections

> **DELETE** https://api.getconnect.io/collections/:collection
>
> | Parameter                      | Description                                          |
> | ------------------------------ | ---------------------------------------------------- |
> | collection                     | collection to delete                                 |

You can delete entire collections by sending a DELETE request to the collection resource URL.

Only the `Master Project Key` can delete a collection.  Read more about [projects and API keys here](#projects-and-keys). 

**This is an irreversible action.**  Once a collection is deleted, all events that were pushed to that collection
are also deleted.  You should use this operation carefully.
