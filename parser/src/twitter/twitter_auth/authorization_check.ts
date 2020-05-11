import { $webdriverPage } from '../model';

export const checkIsUserAuth = async () => {
  const page = $webdriverPage.getState();

  const isAuthUser = await page.evaluate(userNavigationSelector => {
    const userNavigationNode = document.querySelector(userNavigationSelector);

    const isUserNavigationExist = Boolean(userNavigationNode);

    return isUserNavigationExist;
  }, '[role="navigation"].css-1dbjc4n.r-14lw9ot');

  return isAuthUser;
};
