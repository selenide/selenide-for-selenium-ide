# Selenide plugin for Selenium IDE

## Getting Started

This is a new plugin for Selenium IDE that allows you to export your tests to Selenide (Java) code.  

It can be installed through the [Chrome Web Store](https://chrome.google.com/webstore/detail/selenide-for-selenium-ide/nlkfobhoffngaakgdbkdnmmjcchibcba) or the [Mozila Addons Market](https://addons.mozilla.org/ru/firefox/addon/selenide-for-selenium-ide/).

After installing the plugin you will see a new icon in your navigation bar which contains the Selenide logo.

On test/suite export you will see a new option, **Java Selenide**.

## Building The Project

- Install the dependencies  
`yarn`
- Build the extension  
`yarn build:prod` or         
`yarn build -w` for faster development builds   
- Install as developer on [Google Chrome](https://developer.chrome.com/extensions/getstarted#unpacked) or [Firefox](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Temporary_Installation_in_Firefox)  

Manifest located in `src/manifest.json`
