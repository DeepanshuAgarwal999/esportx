import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import { useRouter } from "expo-router";
import { KeyboardAvoidingView, ScrollView, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import { useAlert } from "@/context/alert-provider";
import * as SecureStore from 'expo-secure-store'
import GlobalLayout from "@/components/global/global-layout";
import { useAuth } from "@/context/auth-provider";

type Credentials = {
    username: string;
    userId: string;
    upiId: string;
    phone: string;
};

const AccountDetailScreen = () => {
    const [credentials, setCredentials] = useState<Credentials>({
        username: "",
        userId: "",
        upiId: "",
        phone: "",
    });
    const [isChecked, setChecked] = useState(false);
    const [errors, setErrors] = useState<Partial<Credentials>>({});
    const router = useRouter();
    const { alert } = useAlert();
    const { setUser, user } = useAuth()

    useEffect(() => {
        if (user) {
            router.replace('/')
        }
    }, [user])

    const validateForm = (): boolean => {
        const newErrors: Partial<Credentials> = {};

        // Validate username
        if (!credentials.username.trim()) {
            newErrors.username = "Username is required.";
        }

        // Validate userId
        if (!credentials.userId.trim()) {
            newErrors.userId = "User ID is required.";
        }

        // Validate upiId
        if (!credentials.upiId.trim()) {
            newErrors.upiId = "UPI ID is required.";
        } else if (!/^[\w.-]+@[\w.-]+$/.test(credentials.upiId)) {
            newErrors.upiId = "Invalid UPI ID format.";
        }

        // Validate phone
        if (!credentials.phone.trim()) {
            newErrors.phone = "Phone number is required.";
        } else if (!/^\d{10}$/.test(credentials.phone)) {
            newErrors.phone = "Phone number must be 10 digits.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!isChecked) {
            alert('Terms & Conditions', 'Please accept Terms & Conditions')
            return;
        }

        if (validateForm()) {
            await SecureStore.setItemAsync('user', JSON.stringify(credentials));
            setUser(credentials)
            router.replace('/');
        }
    };
    const keyboardOffsetHeight = 10
    return (
        <GlobalLayout>
            <KeyboardAvoidingView
            behavior="height"
                keyboardVerticalOffset={keyboardOffsetHeight}
                style={{
                    flexGrow: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                }}
            >
                <View className={`w-72 flex flex-col ${Object.keys(errors).length > 0 ? "gap-1" : "gap-5"}`}>
                    <InputField
                        placeholder="BGMI Username"
                        onChangeText={(text) => setCredentials({ ...credentials, username: text })}
                        inputClassName="!text-center !py-2.5"
                        value={credentials.username}
                        disableFullscreenUI={true}
                    />
                    {errors.username && <Text style={{ color: "red", fontSize: 12 }}>{errors.username}</Text>}

                    <InputField
                        placeholder="BGMI USER ID"
                        onChangeText={(text) => setCredentials({ ...credentials, userId: text })}
                        inputClassName="!text-center !py-2.5"
                        value={credentials.userId}
                        disableFullscreenUI={true}
                    />
                    {errors.userId && <Text style={{ color: "red", fontSize: 12 }}>{errors.userId}</Text>}

                    <InputField
                        placeholder="UPI ID"
                        onChangeText={(text) => setCredentials({ ...credentials, upiId: text })}
                        className="w-full"
                        inputClassName="!text-center !py-2.5"
                        value={credentials.upiId}
                        disableFullscreenUI={true}
                    />
                    {errors.upiId && <Text style={{ color: "red", fontSize: 12 }}>{errors.upiId}</Text>}

                    <InputField
                        placeholder="Mobile No."
                        maxLength={10}
                        keyboardType="numeric"
                        onChangeText={(text) => setCredentials({ ...credentials, phone: text })}
                        inputClassName="!text-center !py-2.5"
                        value={credentials.phone}
                        disableFullscreenUI={true}
                    />
                    {errors.phone && <Text style={{ color: "red", fontSize: 12 }}>{errors.phone}</Text>}

                    <View className="flex flex-row items-center gap-2 ">
                        <View className="bg-white h-5 w-5 flex justify-center items-center">
                            <Checkbox
                                value={isChecked}
                                onValueChange={setChecked}
                                color={isChecked ? "#333333" : "#FFFFFF"}
                                className="accent-white !rounded-none"
                            />
                        </View>
                        <Text className="text-white">I accept Terms & Conditions</Text>
                    </View>
                </View>
                <View className="w-full flex flex-row justify-end">
                    <Button onPress={handleSubmit} className="w-32 ">
                        Submit
                    </Button>
                </View>
            </KeyboardAvoidingView>
        </GlobalLayout>
    );
};

export default AccountDetailScreen;