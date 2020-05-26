import * as React from 'react';
import { useStore } from 'effector-react';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import { $profileParseType, profileParseTypeChanged } from './model';
import { $profileSettings } from '../../settings/profile/model';
import { ButtonGroupContainer } from '../styled';
import {
  LIKES,
  MEDIA,
  TWEETS_REPLIES,
  TWEETS,
} from '../../../../constants/tweets_types';

import { ProfileTweets } from '../../tabs/profile/tweets';

export const SwitchTypeProfile: React.FC = () => {
  const profileParseType = useStore($profileParseType);
  const { isTweetsAndReplies, isLikes, isMedia, isTweets } = useStore(
    $profileSettings,
  );

  return (
    <>
      {(isTweetsAndReplies || isLikes || isMedia || isTweets) && (
        <ButtonGroupContainer container justify="center">
          <ToggleButtonGroup
            value={profileParseType}
            exclusive
            onChange={profileParseTypeChanged}
            aria-label="Profile toggle button group">
            {isTweets && (
              <ToggleButton value={TWEETS} aria-label={TWEETS}>
                Tweets
              </ToggleButton>
            )}
            {isTweetsAndReplies && (
              <ToggleButton value={TWEETS_REPLIES} aria-label={TWEETS_REPLIES}>
                Tweets and replies
              </ToggleButton>
            )}
            {isLikes && (
              <ToggleButton value={LIKES} aria-label={LIKES}>
                Likes
              </ToggleButton>
            )}
            {isMedia && (
              <ToggleButton value={MEDIA} aria-label={MEDIA}>
                Media
              </ToggleButton>
            )}
          </ToggleButtonGroup>
        </ButtonGroupContainer>
      )}
      {profileParseType === TWEETS && <ProfileTweets />}
    </>
  );
};
