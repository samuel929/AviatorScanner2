import React from 'react';
import { Image, View } from 'react-native';

import { Headerstyles } from '../styles/styles';
import Animated from 'react-native-reanimated';
import { useBounceAndPulse } from '../../hook/useBounceAndPulse';

export default function Header() {
  const { animatedTextStyle } = useBounceAndPulse();

  return (
    <View style={Headerstyles.headerContainer}>
      <Image
        source={require('../../assets/logo.jpeg')}
        style={Headerstyles.logo}
      />
      <Animated.Text style={[Headerstyles.headerText, animatedTextStyle]}>
        AviCash PRO
      </Animated.Text>
    </View>
  );
}
