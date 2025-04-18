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
import { AuthService } from "@/services/auth-service";
import { AxiosError } from "axios";

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
    const [isLoading, setIsLoading] = useState(false);
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
            alert('Terms & Conditions', 'Please accept Terms & Conditions to continue')
            return;
        }

        if (validateForm()) {
            const userCredentials = {
                username_bgmi: credentials.username,
                userid_bgmi: credentials.userId,
                upi_id: credentials.upiId,
                phone: credentials.phone
            }
            try {
                setIsLoading(true)
                const user = await AuthService.signUp(userCredentials)
                if (user) {
                    SecureStore.setItem('user', JSON.stringify(user.user_details));
                    setUser(credentials)
                    setCredentials({
                        username: "",
                        userId: "",
                        upiId: "",
                        phone: "",
                    });
                    router.replace({ pathname: '/(auth)/enter-otp', params: { phone: user.user_details.phone } });
                }
            } catch (error: any) {
                if (error instanceof AxiosError) {
                    if (error?.response?.status === 422) {
                        alert('Error', "Either user already exist or Invalid credentials")
                    }
                    else {
                        alert('Error', "Invalid credentials")
                    }
                }
                else {
                    alert('Error', "Something went wrong. Please try again")
                }
            }
            finally {
                setIsLoading(false)
            }
        }
    };
    return (
        <GlobalLayout>
            <KeyboardAvoidingView 
                behavior="height"
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        paddingVertical: 20,
                        paddingHorizontal: 10,
                        paddingBottom: 10
                    }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    keyboardDismissMode="interactive"
                    bounces={false}
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

                        <View className="flex flex-row items-center gap-2">
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
                    <View className="w-full flex flex-row justify-end mt-4">
                        <Button isLoading={isLoading} onPress={handleSubmit} className="w-32">
                            Submit
                        </Button>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </GlobalLayout>
    );
};

export default AccountDetailScreen;