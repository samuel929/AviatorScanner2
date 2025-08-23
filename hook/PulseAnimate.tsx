import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const PulsingWrapper = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) => {
  const shadowRadiusAnim = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shadowRadiusAnim, {
          toValue: 20,
          duration: 800,
          useNativeDriver: false, // 💡 JS-only animation
        }),
        Animated.timing(shadowRadiusAnim, {
          toValue: 10,
          duration: 800,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, [shadowRadiusAnim]);

  return (
    <Animated.View
      style={{
        ...style,
        shadowColor: '#22c55e80',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        shadowRadius: shadowRadiusAnim,
        elevation: 10, // Android fallback
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </Animated.View>
  );
};

export default PulsingWrapper;
