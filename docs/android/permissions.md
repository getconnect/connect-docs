# Permissions

You must ensure that your Android app has the `INTERNET` permission to allow the SDK to push events to the Connect API.  Make sure you have specified this in your AndroidManifest.xml:

```xml
<uses-permission android:name="android.permission.INTERNET"/>
```