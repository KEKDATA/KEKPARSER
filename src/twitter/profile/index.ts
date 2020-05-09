import { Page } from 'playwright';
import cheerio from 'cheerio';

import { getHTML } from '../../lib/dom/html';
import { LOADER_SELECTOR } from '../constants/selectors';
import {
  PROFILE_ACTIVITY,
  PROFILE_CONTACT_INFO,
  PROFILE_CONTAINER,
  PROFILE_DESCRIPTION,
  PROFILE_SELECTOR,
} from './constants/selectors';
import { checkIsTwitterContentVisible } from '../lib/page/visible_content_check';
import { getTextOfChildNodes } from '../../lib/dom/nodes/text_child_nodes';

export const getParsedTwitterProfile = async (page: Page) => {
  await page.waitForSelector(PROFILE_SELECTOR);

  await page.waitForFunction(checkIsTwitterContentVisible, LOADER_SELECTOR);

  const contentPage: string = await page.evaluate(getHTML);

  const $ = cheerio.load(contentPage);

  const profile = $(`${PROFILE_CONTAINER} > ${PROFILE_CONTAINER}`).eq(0);

  const [name, tweetName] = getTextOfChildNodes(profile);

  const description = $(PROFILE_DESCRIPTION).text();

  const activityContainer = $(PROFILE_ACTIVITY);
  const activityInfo = getTextOfChildNodes(activityContainer);

  const contactContainer = $(PROFILE_CONTACT_INFO);
  const contactInfo = getTextOfChildNodes(contactContainer);

  return {
    name,
    tweetName,
    description,
    contactInfo,
    activityInfo,
  };
};
