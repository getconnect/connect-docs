# Deleting collections

> **DELETE** https://api.getconnect.io/events/:collection
>
> | Parameter                      | Description                                          |
> | ------------------------------ | ---------------------------------------------------- |
> | collection                     | collection to delete                                 |

You can delete entire collections by sending a DELETE request to the collection resource URL.

**This is an irreversible action.**  Once a collection is deleted, all events that were pushed to that collection
are also deleted.  You should use this operation carefully.
