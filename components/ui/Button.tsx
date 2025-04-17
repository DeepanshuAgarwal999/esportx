import React, { useState } from 'react';
import { Pressable, Text, Animated, StyleSheet, ActivityIndicator } from 'react-native';

type ButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string; // Tailwind classes for the button
  textClassName?: string; // Tailwind classes for the text
};

const Button = ({ children, onPress, disabled = false, isLoading, className, textClassName }: ButtonProps) => {
  const scale = useState(new Animated.Value(1))[0]; // Initial scale value

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95, // Scale down to 95%
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1, // Reset scale to 100%
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || isLoading}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.8 : 1, // Default Pressable behavior
          },
          styles.button,
        ]}
        className={`py-4 px-4 bg-[#333333] cursor-pointer w-fit ${className}`}
      >
        {
          isLoading ? <ActivityIndicator size={10} color={"#FFF"} /> : <Text className={`text-white text-center text-2xl font-normal ${textClassName}`}>
            {children}
          </Text>
        }
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center', // Center the button if needed
  },
});

export default Button;