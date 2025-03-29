import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type GlobalLayoutProps = {
    children: React.ReactNode;
};

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children }) => {
    const insets = useSafeAreaInsets();
    return (
        <View
            style={[
                styles.safeArea,
                {
                    paddingTop: insets.top,
                    paddingLeft: insets.left,
                    paddingRight: insets.right,
                    paddingBottom: insets.bottom,
                },
            ]}
        >
            <ImageBackground
                source={require("../../../assets/images/app_banner.png")}
                style={styles.background}
            >
                {children}
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        backgroundColor: "#000",
    },
});

export default GlobalLayout;