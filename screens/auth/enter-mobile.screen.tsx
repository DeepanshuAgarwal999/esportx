import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ImageBackground, SafeAreaView, View } from "react-native";

const EnterMobileScreen = () => {
    const [number, setNumber] = useState('');
    const router = useRouter();

    const handleSubmit = () => {
        if (number.length === 10) {
            router.navigate('/(auth)/enter-otp'); // Corrected navigation route
        } else {
            Alert.alert('Enter a valid 10 digit mobile number');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require("../../assets/images/app_banner.png")}
                style={{ flex: 1 }}
                className="flex items-center justify-center"
            >
                <View className="w-60 flex flex-col gap-8">
                    <InputField
                        placeholder="Enter Mobile No."
                        maxLength={10}
                        keyboardType="numeric"
                        onChangeText={(text) => setNumber(text)} // Fixed onChangeText
                        className="w-full"
                        autoFocus
                    />
                    <Button onPress={handleSubmit} className="w-full">
                        Send OTP
                    </Button>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default EnterMobileScreen;