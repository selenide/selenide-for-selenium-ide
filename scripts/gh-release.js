const exec = require('child_process').execSync;
const grizzly = require('grizzly');
const putasset = require('putasset');
const token = process.env.GH_TOKEN;
const owner = 'selenide';
const repo = 'selenide-for-selenium-ide';
const manifest = require('../src/manifest.json');
const tag = 'v' + manifest.version;

function log(message) {
  console.log(`[ GitHub Release ]: ${message}`); // eslint-disable-line
}

if (!token)
  throw new Error(
    "No GitHub application token provided on environment variable GH_TOKEN. Don't have one? Get yours at https://github.com/settings/tokens"
  );

// fetch changelog details
const changelog = exec(
  `sed '1,/${tag}/d;/## v/q' ./CHANGELOG.md | sed '/^ *$/q'`,
  {
    encoding: 'utf8'
  }
).trim();

// zip build dir
exec('cd build;zip -r selenide-for-selenium-ide.zip *');
log('Zipped build directory');

// create release with changelog
grizzly(token, {
  user: owner,
  repo,
  tag,
  name: tag,
  body: changelog,
  prerelease: false
})
  .then(() => {
    log(
      `Release published on GitHub, url: https://github.com/${owner}/${repo}/releases/tag/${tag}`
    );
    // upload asset to release
    putasset(token, {
      owner,
      repo,
      tag,
      filename: 'selenide-for-selenium-ide.zip'
    })
      .then(url => {
        log(`Upload success, download url: ${url}`);
      })
      .catch(error => {
        log(error.message);
      });
  })
  .catch(error => {
    log(error.message);
  });
