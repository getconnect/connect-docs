# Installing the SDK

Installing the SDK is easy if you're using either Gradle or Maven.

## Gradle

Add the following to your build.gradle:

```groovy-java
repositories {
    mavenCentral()
}
dependencies {
    compile 'io.getconnect:connect-client-java:1.+'
}
```
```groovy-android
repositories {
    mavenCentral()
}
dependencies {
    compile 'io.getconnect:connect-client-android:1.+'
}
```

## Maven

Add the following dependency to your pom.xml:

```xml-java
<dependency>
  <groupId>io.getconnect</groupId>
  <artifactId>connect-client-java</artifactId>
  <version>1.3</version>
</dependency>
```
```xml-android
<dependency>
  <groupId>io.getconnect</groupId>
  <artifactId>connect-client-android</artifactId>
  <version>1.3</version>
</dependency>
```
