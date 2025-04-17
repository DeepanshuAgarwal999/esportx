import { Text, TextProps, StyleSheet } from 'react-native';

interface CustomTextProps extends TextProps {
    children: React.ReactNode;
}

const CustomText: React.FC<CustomTextProps> = ({ style, children, ...rest }) => {
    return (
        <Text style={[styles.defaultStyle, style]} {...rest}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    defaultStyle: {
        fontSize: 16,
        color: '#fff', 
        fontFamily: 'System',
    },
});

export default CustomText;