// @flow

const browserMatches = (browser: string): boolean => {
  const regex1 = /chrome/i;
  const regex2 = /chromium/i;
  const regex3 = /safari/i;
  return !!(
    browser.match(regex3) &&
    !browser.match(regex2) &&
    !browser.match(regex1)
  );
};

export default browserMatches;
