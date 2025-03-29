import GlobalLayout from "@/components/global/global-layout";
import Button from "@/components/ui/Button";
import { useRouter } from "expo-router";
import { View } from "react-native";

const LoginScreen = () => {
    const router = useRouter();
    return (
        <GlobalLayout>
            <View className="flex items-center justify-center h-full">
                <View className="w-52 flex  gap-8">
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
            </View>
        </GlobalLayout>

    );
};

export default LoginScreen;