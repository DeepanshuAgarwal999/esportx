import GlobalLayout from "@/components/global/global-layout";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Keyboard,
    ScrollView,
    TouchableWithoutFeedback,
    View,
    Platform,
} from "react-native";

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
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="w-52 max-w-xs flex gap-8">
                        <InputField
                            placeholder="Enter Mobile No."
                            maxLength={10}
                            keyboardType="phone-pad"
                            onChangeText={(text) => setNumber(text)}
                            className="w-full"
                            textContentType="telephoneNumber"
                            disableFullscreenUI={true}
                        />
                        <Button onPress={handleSubmit} className="w-full">
                            Send OTP
                        </Button>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </GlobalLayout>
    );
};

export default EnterMobileScreen;
