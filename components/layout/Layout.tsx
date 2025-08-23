import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LayoutStyles } from '../styles/styles';
import PulsingWrapper from '../../hook/PulseAnimate';
interface Props {
  children?: React.ReactNode;
  headingText?: string;
  IconName?: string;
  style?: any;
}

const Layout = ({ children, headingText, IconName, style }: Props) => {
  return (
    <View style={[LayoutStyles.container, style]}>
      {headingText && (
        <PulsingWrapper>
          <Text style={LayoutStyles.text}>
            {IconName ? (
              <View>
                <Icon
                  name={IconName}
                  size={20}
                  style={LayoutStyles.iconLayoutStyle}
                  color="#04ff00"
                />
              </View>
            ) : null}
            {headingText}
          </Text>
        </PulsingWrapper>
      )}
      {children}
    </View>
  );
};

export default Layout;
