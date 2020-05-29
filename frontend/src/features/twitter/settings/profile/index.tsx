import * as React from 'react';
import { useStore } from 'effector-react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import {
  $profileSettings,
  likesStatusChanged,
  mediaStatusChanged,
  profileInfoChanged,
  tweetsAndRepliesChanged,
  tweetsStatusChanged,
} from './model';

export const ProfileSettings: React.FC = () => {
  const {
    isTweets,
    isMedia,
    isLikes,
    isTweetsAndReplies,
    isProfileInfo,
  } = useStore($profileSettings);

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={isTweets}
            onChange={tweetsStatusChanged}
            name="tweets"
          />
        }
        label="Tweets"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={isTweetsAndReplies}
            onChange={tweetsAndRepliesChanged}
            name="tweetsAndReplies"
          />
        }
        label="Tweets and replies"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={isLikes}
            onChange={likesStatusChanged}
            name="likes"
          />
        }
        label="Likes"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={isMedia}
            onChange={mediaStatusChanged}
            name="media"
          />
        }
        label="Media"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={isProfileInfo}
            onChange={profileInfoChanged}
            name="profile_info"
          />
        }
        label="Profile info"
      />
    </>
  );
};
