import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type GlobalLayoutProps = {
    children: React.ReactNode;
};

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children }) => {
    return (
        <SafeAreaView
            style={[
                styles.safeArea,
            ]}
        >
            <ImageBackground
                source={require("../../../assets/images/app_banner.png")}
                style={styles.background}
            >
                {children}
            </ImageBackground>
        </SafeAreaView>
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