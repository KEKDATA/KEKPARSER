import * as React from 'react';

import { ParseSettings } from '../../features/twitter/parse_settings';
import { SwitchTypeParse } from '../../features/twitter/switch_type_parse';

export const TwitterParser: React.FC = () => {
  return (
    <>
      <ParseSettings />
      <SwitchTypeParse />
    </>
  );
};
