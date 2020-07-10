# Selenide plugin for Selenium IDE

## Getting Started

This is a new plugin for Selenium IDE that allows you to export your tests to Selenide (Java) code.  

It can be installed through the [Chrome Web Store](https://chrome.google.com/webstore/detail/selenide-for-selenium-ide/nlkfobhoffngaakgdbkdnmmjcchibcba) or the [Mozila Addons Market](https://addons.mozilla.org/ru/firefox/addon/selenide-for-selenium-ide/).

After installing the plugin you will see a new icon in your navigation bar which contains the Selenide logo.

On test/suite export you will see a new option, **Java Selenide**.

## Exported Code

The exported code is built to work with Java (at least 8 version), JUnit 5, and the latest version of Selenide.

You should be able to take the exported Java file and place it into a standard Maven directory structure with a `pom.xml` or `build.gradle` file listing these dependencies and run it.

You can look at some project examples here: https://github.com/selenide-examples

Here's a sample `build.gradle` to help you get started:

```
apply plugin: 'java'

group 'selenide-for-selenium-ide'
version '1.0-SNAPSHOT'

repositories {
    mavenCentral()
}

test {
    useJUnitPlatform()
}

dependencies {
	testCompile "org.junit.jupiter:junit-jupiter-api:5.6.2"
	compile "com.codeborne:selenide:5.13.0"
}
```

Or `pom.xml`:

```xml
<project>
  <modelVersion>4.0.0</modelVersion>
  <groupId>org.selenide</groupId>
  <artifactId>selenide-for-selenium-ide</artifactId>
  <version>1</version>
  <url>http://maven.apache.org</url>
  <dependencies>
    <dependency>
        <groupId>com.codeborne</groupId>
        <artifactId>selenide</artifactId>
        <version>5.13.0</version>
    </dependency>
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter-api</artifactId>
        <version>5.6.2</version>
        <scope>test</scope>
    </dependency>
  </dependencies>
</project>
```

## Building The Project

- Install the dependencies  
`yarn`
- Build the extension  
`yarn build:prod` or         
`yarn build -w` for faster development builds   
- Install as developer on [Google Chrome](https://developer.chrome.com/extensions/getstarted#unpacked) or [Firefox](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Temporary_Installation_in_Firefox)  

Manifest located in `src/manifest.json`
