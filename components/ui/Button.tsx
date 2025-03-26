import React from 'react';
import { Pressable, Text } from 'react-native';

type ButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  className?: string; // Tailwind classes for the button
  textClassName?: string; // Tailwind classes for the text
};

const Button = ({ children, onPress, disabled = false, className, textClassName }: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={` py-4  px-4 bg-[#333333] cursor-pointer ${className}`}
    >
      <Text className={`text-white text-center text-xl   ${textClassName}`}>
        {children}
      </Text>
    </Pressable>
  );
};

export default Button