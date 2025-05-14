import GlobalLayout from "@/components/global/global-layout";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import { useAlert } from "@/context/alert-provider";
import { AuthService } from "@/services/auth-service";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Keyboard,
    ScrollView,
    TouchableWithoutFeedback,
    View,
} from "react-native";

const EnterMobileScreen = () => {
    const [number, setNumber] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const { alert } = useAlert();
    const router = useRouter();

    const handleSubmit = async () => {
        try {
            if (number.length !== 10) {
                alert('Failed', "Enter a valid 10 digit mobile number")
                return
            }
            setIsLoading(true)
            const response = await AuthService.getOTP(number)
            if (response) {
                router.push({ pathname: '/(auth)/enter-otp', params: { phone: number } })
                setNumber('')
            }
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                if (error.status === 400) {
                    alert('Failed', "Invalid mobile number")
                    return
                }
            } else {
                alert('Failed', "Mobile number is not registered", () => {
                    router.push('/(auth)/account-detail')
                })
            }
        }
        finally {
            setIsLoading(false)
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
                            value={number}
                            keyboardType="numeric"
                            onChangeText={(text) => setNumber(text.slice(0, 10))}
                            className="w-full"
                            textContentType="telephoneNumber"
                            disableFullscreenUI={true}
                        />
                        <Button isLoading={isLoading} onPress={handleSubmit} className="w-full">
                            Send OTP
                        </Button>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </GlobalLayout>
    );
};

export default EnterMobileScreen;
