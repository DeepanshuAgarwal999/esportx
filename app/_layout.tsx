import { Stack } from "expo-router";
import './global.css';
import { Provider as PaperProvider } from "react-native-paper";
import { AlertProvider } from "@/context/alert-provider";
import { StatusBar, } from "react-native";

export default function RootLayout() {
    return (
        <PaperProvider>
            <AlertProvider>
                <StatusBar hidden={true} backgroundColor={'#333333'} />
                <Stack screenOptions={{ headerShown: false }} />
            </AlertProvider>
        </PaperProvider>
    );
}

