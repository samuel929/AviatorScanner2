import { useEffect } from 'react';
import { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

export const useBounceAndPulse = () => {
    const pulse = useSharedValue(1);
    const bounce = useSharedValue(0);

    useEffect(() => {
        pulse.value = withRepeat(
            withTiming(1.2, {
                duration: 1000,
                easing: Easing.inOut(Easing.ease),
            }),
            -1,
            true,
        );

        bounce.value = withRepeat(
            withTiming(-6, {
                duration: 500,
                easing: Easing.inOut(Easing.ease),
            }),
            -1,
            true,
        );

        return () => {
            pulse.value = 1;
            bounce.value = 0;
        };
    }, [pulse, bounce]);

    const animatedTextStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: bounce.value }],
    }));

    const animatedGlowStyle = useAnimatedStyle(() => ({
        transform: [{ scale: pulse.value }],
    }));

    return {
        animatedTextStyle,
        animatedGlowStyle,
    };
};
