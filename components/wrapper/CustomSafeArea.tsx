import { SafeAreaView, StyleSheet, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type CustomSafeAreaProps = {
    children: React.ReactNode;
    style?: ViewStyle; // Optional custom styles for the SafeAreaView
};

const CustomSafeArea: React.FC<CustomSafeAreaProps> = ({ children, style }) => {
    const insets = useSafeAreaInsets(); // Get safe area insets dynamically

    return (
        <SafeAreaView
            style={[
                styles.safeArea,
                {
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom,
                    paddingLeft: insets.left,
                    paddingRight: insets.right,
                },
                style, // Allow overriding styles via props
            ]}
        >
            {children}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#000",
    },
});

export default CustomSafeArea;