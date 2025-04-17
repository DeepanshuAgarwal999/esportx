import React from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';

type InputFieldProps = TextInputProps & {
    label?: string; // Optional label for the input field
    className?: string; // Tailwind classes for the container
    inputClassName?: string; // Tailwind classes for the TextInput
    labelClassName?: string; // Tailwind classes for the label
};

const InputField = ({
    label,
    className = '',
    inputClassName = '',
    labelClassName = '',
    placeholderTextColor = '#FFFFFF', // Default placeholder color is white
    ...props
}: InputFieldProps) => {
    return (
        <View className={`flex flex-col gap-2 ${className}`}>
            {label && <Text className={`text-gray-100 text-sm ${labelClassName}`}>{label}</Text>}
            <TextInput
                style={{ color: "white" }}
                placeholderTextColor={placeholderTextColor}
                allowFontScaling={false}
                className={`text-xl py-4  px-4 bg-[#333333]  text-white outline-none cursor-pointer ${inputClassName}`}
                {...props}
            />
        </View>
    );
};

export default InputField;