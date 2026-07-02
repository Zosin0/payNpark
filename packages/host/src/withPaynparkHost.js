const { createRunOncePlugin, withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const pkg = require('../package.json');

// Path to this package's own native Android project, as checked into
// packages/host/android. This project is built directly with Gradle
// (see .github/workflows/host-pipeline.yml) rather than regenerated
// by `expo prebuild` on every build.
const HOST_ANDROID_DIR = path.resolve(__dirname, '..', 'android');

/**
 * Expo config plugin for the PayNPark host package.
 *
 * Today this plugin intentionally does the minimum useful thing: it
 * resolves and exposes the path to packages/host/android so that other
 * tooling (prebuild scripts, CI, docs) can locate the host's native
 * project programmatically instead of hardcoding a relative path, and
 * it fails `expo prebuild` loudly if the workspace dependency isn't
 * linked correctly (packages/host/android missing) rather than letting
 * prebuild silently produce a native project that doesn't match the
 * host package.
 *
 * It does not (yet) deep-merge packages/host/android into a freshly
 * `expo prebuild`-generated android/ folder - that would require
 * parsing/merging AndroidManifest.xml and Gradle files, which is out
 * of scope for this first version. See packages/host/README.md for
 * how the two pieces fit together today.
 */
const withPaynparkHost = (config) => {
  return withDangerousMod(config, [
    'android',
    async (config) => {
      if (!fs.existsSync(HOST_ANDROID_DIR)) {
        throw new Error(
          `${pkg.name}: expected native Android project at ${HOST_ANDROID_DIR} but it was not found. ` +
            'Make sure packages/host is installed as a workspace dependency of apps/mobile.'
        );
      }
      return config;
    },
  ]);
};

module.exports = createRunOncePlugin(withPaynparkHost, pkg.name, pkg.version);
module.exports.HOST_ANDROID_DIR = HOST_ANDROID_DIR;
