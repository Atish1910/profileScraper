const { chromium } = require('playwright');

const scrapeGithubProfile = async (url) => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url);

  const username = await page.locator('span.p-nickname').innerText();
  const name = await page.locator('span.p-name').innerText();

  const bioElement = page.locator('.p-note');
  const bio = (await bioElement.count()) > 0
    ? await bioElement.innerText()
    : null;

  const followers = await page
    .locator('a[href$="?tab=followers"] span')
    .first()
    .innerText();

  const following = await page
    .locator('a[href$="?tab=following"] span')
    .first()
    .innerText();

  const repos = await page
    .getByRole('link', { name: /Repositories/i })
    .locator('span')
    .first()
    .innerText();

  await browser.close();

  return {
    username,
    name,
    bio,
    followers: parseInt(followers.replace(',', '')),
    following: parseInt(following.replace(',', '')),
    repos: parseInt(repos.replace(',', ''))
  };
};

module.exports = scrapeGithubProfile;