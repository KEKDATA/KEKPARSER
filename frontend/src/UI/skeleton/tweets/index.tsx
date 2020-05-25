import React from 'react';

import { TweetSkeleton } from '../tweet';

export const TweetsSkeleton: React.FC = () => (
  <div>
    <TweetSkeleton />
    <TweetSkeleton />
    <TweetSkeleton />
    <TweetSkeleton />
    <TweetSkeleton />
  </div>
);
