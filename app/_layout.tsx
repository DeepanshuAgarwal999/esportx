import { Stack } from "expo-router";
import './global.css';
import { Provider as PaperProvider } from "react-native-paper";
import { AlertProvider } from "@/context/alert-provider";
import { StatusBar, } from "react-native";
import { TournamentProvider } from "@/context/tournament-provider";

export default function RootLayout() {
    return (
        <PaperProvider>
            <AlertProvider>
                <StatusBar hidden={true} backgroundColor={'#333333'} />
                <TournamentProvider>
                    <Stack screenOptions={{ headerShown: false }} />
                </TournamentProvider>
            </AlertProvider>
        </PaperProvider>
    );
}

