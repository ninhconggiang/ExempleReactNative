import React from 'react'
import { storiesOf } from '@storybook/react-native'

import ConfirmDialog from './ConfirmDialog'

storiesOf('ConfirmDialog')
  .add('Default', () => (
    <ConfirmDialog/>
  ))