import React from 'react'
import { storiesOf } from '@storybook/react-native'

import ErrorMessage from './ErrorMessage'

storiesOf('ErrorMessage')
  .add('Default', () => (
    <ErrorMessage/>
  ))