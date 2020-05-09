import { Page } from 'playwright';
import cheerio from 'cheerio';

import {
  PROFILE_ACTIVITY,
  PROFILE_CONTACT_INFO,
  PROFILE_CONTAINER,
  PROFILE_DESCRIPTION,
} from '../constants/selectors';

import { getTextOfChildNodes } from '../../../lib/dom/nodes/text_child_nodes';
import { getHTML } from '../../../lib/dom/html';

export const getProfileInfo = async (page: Page) => {
  const contentPage: string = await page.evaluate(getHTML);

  const $ = cheerio.load(contentPage);

  const profileNode = $(`${PROFILE_CONTAINER} > ${PROFILE_CONTAINER}`).eq(0);

  const [name, tweetName] = getTextOfChildNodes(profileNode);

  const description = $(PROFILE_DESCRIPTION).text();

  const activityNode = $(PROFILE_ACTIVITY);
  const activityInfo = getTextOfChildNodes(activityNode);

  const contactNode = $(PROFILE_CONTACT_INFO);
  const contactInfo = getTextOfChildNodes(contactNode);

  const profileInfo = {
    name,
    tweetName,
    description,
    contactInfo,
    activityInfo,
  };

  return profileInfo;
};
