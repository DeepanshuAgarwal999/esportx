import Button from "@/components/ui/Button";
import { useRouter } from "expo-router";
import { ImageBackground, SafeAreaView, Text, View } from "react-native";

const LoginScreen = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require("../../assets/images/app_banner.png")}
                style={{ flex: 1 }}
                className="flex items-center justify-center"
            >
                <View className="w-60 flex flex-col gap-8">
                    <Button
                        onPress={() => router.navigate('/(auth)/enter-mobile')}
                        className="w-full"
                    >
                        Login
                    </Button>
                    <Button onPress={() => { }} className="w-full">
                        Create Account
                    </Button>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default LoginScreen;