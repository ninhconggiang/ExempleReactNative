import React from 'react'
import { storiesOf } from '@storybook/react-native'

import NumericInput from './NumericInput'

storiesOf('NumericInput')
  .add('Default', () => (
    <NumericInput/>
  ))