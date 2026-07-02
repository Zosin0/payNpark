const fs = require('fs');
const withPaynparkHost = require('../withPaynparkHost');

describe('withPaynparkHost', () => {
  it('exports a config plugin function', () => {
    expect(typeof withPaynparkHost).toBe('function');
  });

  it('exposes HOST_ANDROID_DIR pointing at an existing android/ project', () => {
    expect(typeof withPaynparkHost.HOST_ANDROID_DIR).toBe('string');
    expect(fs.existsSync(withPaynparkHost.HOST_ANDROID_DIR)).toBe(true);
    expect(
      fs.existsSync(`${withPaynparkHost.HOST_ANDROID_DIR}/build.gradle`)
    ).toBe(true);
  });
});
