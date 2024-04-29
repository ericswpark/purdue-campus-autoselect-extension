# Purdue Brightspace Campus Extension

[![Mozilla Extensions Badge](./images/get-the-addon-mozilla.png)](https://addons.mozilla.org/en-US/firefox/addon/purdue-brightspace-campus-auto/)
[![Chrome Web Store Badge](./images/chrome-web-store-badge.png)](https://chromewebstore.google.com/detail/jehengdhonabgmbamcpjbeaffbfnfdkc/)

This extension autoselects your campus when the Brightspace login page loads, saving you about a second every time Brightspace kicks you out (so like 8 times per day assuming you work 16 hours in total).

## FAQ

### The extension won't trigger on the login page until I click on it.

This is because of Manifest V3 rules. Right click on the extension and select the option "Always Allow on purdue.brightspace.com". Then it should work without having to click on the extension icon.

Note that this applies only to Firefox and I have no idea why they don't ask for this permission on install. (On Chrome they just grant this if the manifest declares it.)

![firefox-permissions-setting](images/firefox-host-permissions.png)
