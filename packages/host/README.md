# @zosin0/paynpark-host

Native Android host project for the PayNPark mobile app, published
independently so it can be versioned and built without dragging in the
whole monorepo.

## What lives here

- `android/` - the native Android project (Gradle, `applicationId
  com.fastticket`, New Architecture enabled). This is the project that
  gets built directly with Gradle in CI (`.github/workflows/host-pipeline.yml`),
  not regenerated from scratch on every build.
- `src/withPaynparkHost.js` - an Expo config plugin, exposed via
  `app.plugin.js` so it can be referenced by bare package name from an
  app's `app.json`/`app.config.js` `plugins` array.
- `app.plugin.js` - the file Expo's config-plugin resolution looks for
  when a plugin is referenced by package name (see [Expo docs on config
  plugins](https://docs.expo.dev/config-plugins/introduction/)).

## How `apps/mobile` consumes this package

`apps/mobile/package.json` depends on `@zosin0/paynpark-host` as a
workspace package, and `apps/mobile/app.json` lists
`"@zosin0/paynpark-host"` in its `plugins` array. When Expo evaluates
the app config (e.g. during `expo prebuild`), it resolves and runs
`withPaynparkHost`.

**What the plugin does today, on purpose, and what it does not:**

- It resolves and exposes `HOST_ANDROID_DIR`
  (`packages/host/android`) so other scripts/tooling can find the
  host's native project programmatically instead of hardcoding a
  relative path.
- It fails loudly during `expo prebuild` if `packages/host/android` is
  missing, so a broken workspace link (e.g. `npm install` not run at
  the repo root) surfaces immediately instead of silently producing a
  native project that doesn't match the host package.
- It does **not** currently deep-merge `packages/host/android` into a
  freshly `expo prebuild`-generated `android/` folder. Doing that
  properly would mean parsing and merging `AndroidManifest.xml` and
  Gradle files programmatically, which is a substantially bigger
  effort than this first version needed. In practice this means: the
  Android app is built directly from `packages/host/android` with
  Gradle (see CI), and `expo prebuild` in `apps/mobile` is not part of
  the Android build path today. If a future contributor wants
  `expo prebuild` to fully own Android native generation, extending
  `withPaynparkHost` to copy/merge the relevant native customizations
  (package name, permissions, signing config) into the generated
  project is the natural next step.

## Building the native Android project directly

```bash
# from the repo root, after `npm install`
cd packages/host/android
./gradlew assembleRelease
```

This matches what CI does in `host-pipeline.yml`.

## Publishing

This package publishes to GitHub Packages
(`https://npm.pkg.github.com`), scoped under `@zosin0`, matching the
GitHub account that owns this repository. Publishing happens via the
`publish` job in `.github/workflows/host-pipeline.yml`, triggered by
pushing a `host-v*` tag. See that workflow for the exact steps; no
publish credentials are configured here - the repository owner needs
to make sure `GITHUB_TOKEN` has `packages: write` permission (default
for the built-in token) or provide a PAT with `write:packages` as a
repository secret if publishing across repos.
