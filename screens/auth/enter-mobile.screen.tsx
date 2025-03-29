import GlobalLayout from "@/components/global/global-layout";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";

const EnterMobileScreen = () => {
    const [number, setNumber] = useState<string>('');
    const router = useRouter();


    const handleSubmit = () => {
        if (number.length === 10) {
            router.push({ pathname: '/(auth)/enter-otp', params: { phone: number } })
        } else {
            Alert.alert('Enter a valid 10 digit mobile number');
        }
    };

    return (
        <GlobalLayout>
            <View className="flex items-center justify-center h-full">
                <View className="w-52 max-w-xs flex  gap-8">
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
            </View>
        </GlobalLayout>
    );
};

export default EnterMobileScreen;