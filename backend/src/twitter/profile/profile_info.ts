import cheerio from 'cheerio';
import {
  WordTokenizer,
  PorterStemmer,
  //@ts-ignore
  SentimentAnalyzer,
} from 'natural';
//@ts-ignore
import stopword from 'stopword';
import { createEffect, attach, combine } from 'effector';
import { Browser, Page } from 'playwright';

import {
  PROFILE_ACTIVITY,
  PROFILE_CONTACT_INFO,
  PROFILE_CONTAINER,
  PROFILE_DESCRIPTION,
  PROFILE_SELECTOR,
} from './constants/selectors';

import { getTextOfChildNodes } from '../../lib/dom/nodes/text_child_nodes';
import { getHTML } from '../../lib/dom/html/get_html';

import { $webdriverBrowser, $webdriverPage } from '../model';
import { getTextWithAlphaOnly } from '../../lib/normalizers/alphabet';
import { getWordsTrigramsBayesClassifier } from '../../lib/bayes_classifier/trigrams/words/bayes_words';
import { checkIsTwitterContentVisible } from '../lib/dom/visible_content_check';
import { LOADER_SELECTOR } from '../constants/selectors';

const parseProfileInfoFx = createEffect<{ browser: Browser; page: Page }, any>({
  handler: async ({ browser, page }) => {
    await page.waitForSelector(PROFILE_SELECTOR);
    await page.waitForFunction(checkIsTwitterContentVisible, LOADER_SELECTOR);

    const contentPage: string = await page.evaluate(getHTML);

    const $ = cheerio.load(contentPage);

    const profileNode = $(`${PROFILE_CONTAINER} > ${PROFILE_CONTAINER}`).eq(0);

    const [name, tweetName] = getTextOfChildNodes(profileNode);

    const activityNode = $(PROFILE_ACTIVITY);
    const activityInfo = getTextOfChildNodes(activityNode);

    const contactNode = $(PROFILE_CONTACT_INFO);
    const contactInfo = getTextOfChildNodes(contactNode);

    const description = $(PROFILE_DESCRIPTION).text();

    let sentimentCoefficient = null;
    let classifierData = null;

    if (description.length > 0) {
      const descriptionWithAlphaOnly = getTextWithAlphaOnly(description);

      const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
      const tokenizer = new WordTokenizer();

      const tokenizedData = tokenizer.tokenize(descriptionWithAlphaOnly);
      const dataWithoutStopWords = stopword.removeStopwords(tokenizedData);

      sentimentCoefficient = Number(
        analyzer.getSentiment(dataWithoutStopWords),
      );

      const bayesClassifier = getWordsTrigramsBayesClassifier();
      classifierData = bayesClassifier.classify(descriptionWithAlphaOnly);
    }

    await browser.close();

    const profileInfo = {
      name,
      tweetName,
      description,
      contactInfo,
      activityInfo,
      sentimentCoefficient,
      classifierData,
    };

    return Promise.resolve({ profileInfo });
  },
});

export const getProfileInfo = attach({
  effect: parseProfileInfoFx,
  source: combine({
    browser: $webdriverBrowser,
    page: $webdriverPage,
  }),
  mapParams: (_, { browser, page }) => ({ browser, page }),
});
