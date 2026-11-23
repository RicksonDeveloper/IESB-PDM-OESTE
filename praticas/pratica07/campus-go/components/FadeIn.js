import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export default function FadeIn({ children, delay = 0, style }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(opacity, {
      toValue: 1,
      duration: 420,
      delay,
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [delay, opacity]);

  return <Animated.View style={[{ opacity }, style]}>{children}</Animated.View>;
}
