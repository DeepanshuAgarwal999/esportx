import { Stack } from "expo-router";
import './global.css'

export default function RootLayout() {
    return <Stack screenOptions={{ headerShown: false ,statusBarBackgroundColor:"#333333"}} />;
}
