## Getting Started

Once the Segment library is integrated with your app, toggle Connect on in your Segment integrations, and add your API Key. Your API Key is formed by prepending the project id and an API key with push permissions with a hyphen separating them, e.g. `YOUR_PROJECT_ID-YOUR_API_KEY`. These can be found under the `Keys` section of your project at [Connect](https://app.getconnect.io).

Connect integrates directly with Segment, so no extra SDKs are required for your app.

Connect supports the `track`, `page`, and `screen`.

Please note:
* The `messageId` will be used as the `id` for the Connect event.
* The `timestamp` will be used as the `timestamp` for the Connect event.
* The structure of the event will be left intact, but all of property names will be converted to camel case if they are in pascal or snake case.
* To query any of the custom properties in an event from connect, query them with the `properties` prefix.

---

## Track

When you call [track](https://segment.com/docs/spec/track/) the value of the `event` property will be used as the collection name.

## Page

When you call [page](https://segment.com/docs/spec/page/) the event will always be put into the `page` collection.

## Screen

When you call [screen](https://segment.com/docs/spec/screen/) the event will always be put into the `screen` collection.