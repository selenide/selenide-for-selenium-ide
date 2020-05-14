const fs = require("fs");
const path = require("path");

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "../package.json")));
const manifestLocation = path.join(__dirname, "../src/manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestLocation));
manifest.version_name = pkg.version;
manifest.version = pkg.version.match(/(\d+\.){0,3}\d+/)[0];
fs.writeFileSync(manifestLocation, JSON.stringify(manifest, undefined, 2));
