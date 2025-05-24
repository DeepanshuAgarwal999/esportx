import { View, Text, ActivityIndicator, KeyboardAvoidingView, ScrollView, TextInput, Keyboard } from 'react-native'
import GlobalLayout from '@/components/global/global-layout'
import { useEffect, useState } from 'react'
import { ProfileService } from '@/services/profile-service'
import { useAuth } from '@/context/auth-provider'
import DateTimePicker from '@react-native-community/datetimepicker'
import InputField from '@/components/ui/InputField'
import Button from '@/components/ui/Button'
import { Picker } from '@react-native-picker/picker';
import { format } from 'date-fns'

type Credentials = {
    username_bgmi: string;
    upi_id: string;
    userid_bgmi: string;
    phone: string;
    name?: string,
    gender?: string,
    dob?: Date,
    email?: string
};

const ProfileScreen = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [errors, setErrors] = useState<Partial<Credentials>>({})
    const [showDobPicker, setShowDobPicker] = useState(false)
    const [credentials, setCredentials] = useState<Credentials>({
        username_bgmi: "",
        upi_id: "",
        userid_bgmi: "",
        phone: ""
    });
    const { user } = useAuth()
    const { id } = user || {}
    const getProfile = async () => {
        try {
            if (!id) {
                return
            }
            const profile = await ProfileService.getProfile(id)
            setCredentials(profile.user)
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getProfile()
    }, [])

    if (isLoading) {
        return (
            <GlobalLayout>
                <View className='justify-center items-center w-full h-full flex-1'>
                    <ActivityIndicator color={'#fff'} size={20} />
                </View>
            </GlobalLayout>
        )
    }


    return (
        // …everything above stays the same…

        <GlobalLayout>
            <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        paddingVertical: 10,
                        paddingHorizontal: 16,
                    }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    keyboardDismissMode="interactive"
                    bounces={false}
                >
                    {/* Single-column form container */}
                    <View className="w-full max-w-md gap-4">
                        {/* Name */}
                        <View>
                            <InputField
                                label='Name'
                                placeholder="Enter your name"
                                value={credentials.name}
                                onChangeText={(text) =>
                                    setCredentials((prev) => ({ ...prev, name: text }))
                                }
                                inputClassName="!py-2.5 !text-white"
                            />
                            {errors.name && (
                                <Text style={{ color: "red", fontSize: 12 }}>
                                    {errors.name}
                                </Text>
                            )}
                        </View>

                        {/* BGMI Username */}
                        <View>
                            <InputField
                                label='BGMI Username'
                                placeholder="BGMI Username"
                                value={credentials.username_bgmi}
                                onChangeText={(text) =>
                                    setCredentials((prev) => ({
                                        ...prev,
                                        username_bgmi: text,
                                    }))
                                }
                                inputClassName="!py-2.5 !text-white"
                            />
                            {errors.username_bgmi && (
                                <Text style={{ color: "red", fontSize: 12 }}>
                                    {errors.username_bgmi}
                                </Text>
                            )}
                        </View>

                        {/* BGMI User ID */}
                        <View>
                            <InputField
                                label='BGMI User ID'
                                placeholder="BGMI User ID"
                                value={credentials.userid_bgmi}
                                onChangeText={(text) =>
                                    setCredentials((prev) => ({
                                        ...prev,
                                        userid_bgmi: text,
                                    }))
                                }
                                inputClassName="!py-2.5 !text-white"
                            />
                            {errors.userid_bgmi && (
                                <Text style={{ color: "red", fontSize: 12 }}>
                                    {errors.userid_bgmi}
                                </Text>
                            )}
                        </View>

                        {/* UPI ID */}
                        <View>
                            <InputField
                                label='UPI ID'
                                placeholder="UPI ID"
                                value={credentials.upi_id}
                                onChangeText={(text) =>
                                    setCredentials((prev) => ({ ...prev, upi_id: text }))
                                }
                                inputClassName="!py-2.5 !text-white"
                            />
                            {errors.upi_id && (
                                <Text style={{ color: "red", fontSize: 12 }}>
                                    {errors.upi_id}
                                </Text>
                            )}
                        </View>

                        {/* Phone */}
                        <View>
                            <InputField
                                label='Phone'
                                placeholder="10-digit phone"
                                keyboardType="numeric"
                                maxLength={10}
                                value={credentials.phone}
                                onChangeText={(text) =>
                                    setCredentials((prev) => ({ ...prev, phone: text }))
                                }
                                inputClassName="!py-2.5 !text-white"
                            />
                            {errors.phone && (
                                <Text style={{ color: "red", fontSize: 12 }}>
                                    {errors.phone}
                                </Text>
                            )}
                        </View>

                        {/* Email */}
                        <InputField
                            label='Email'
                            placeholder="Email address"
                            keyboardType="email-address"
                            value={credentials.email}
                            onChangeText={(text) =>
                                setCredentials((prev) => ({ ...prev, email: text }))
                            }
                            inputClassName="!py-2.5 !text-white"
                        />

                        {/* Gender Picker */}
                        <View>
                            <Text className="text-white text-lg mb-2">Gender</Text>
                            <View className="bg-[#333333] rounded-md overflow-hidden">
                                <Picker
                                    selectedValue={credentials.gender}
                                    onValueChange={(value) =>
                                        setCredentials((prev) => ({ ...prev, gender: value }))
                                    }
                                    style={{ color: "#fff" }}
                                    dropdownIconColor="#fff"
                                >
                                    <Picker.Item label="Select gender…" value="" />
                                    <Picker.Item label="Male" value="male" />
                                    <Picker.Item label="Female" value="female" />
                                </Picker>
                            </View>
                        </View>
                        <View>
                            <Text className="text-white text-lg mb-2">Date of Birth</Text>

                            {/* tappable input-looking field */}
                            <TextInput
                                style={{
                                    backgroundColor: '#333333',
                                    color: '#fff',
                                    paddingVertical: 12,
                                    paddingHorizontal: 8,
                                    borderRadius: 6,
                                }}
                                placeholder="Tap to select date"
                                placeholderTextColor="#aaa"
                                value={
                                    credentials.dob
                                        ? format(credentials.dob, 'dd-MM-yyyy')
                                        : ''
                                }
                                onFocus={() => {
                                    // immediately blur so the keyboard doesn’t open
                                    (Keyboard as any).dismiss()
                                    setShowDobPicker(true)
                                }}
                            />

                            {/* show the native picker when requested */}
                            {showDobPicker && (
                                <DateTimePicker
                                    value={credentials.dob || new Date()}
                                    mode="date"
                                    display="spinner"
                                    themeVariant="dark"
                                    onChange={(_, pickedDate) => {
                                        setShowDobPicker(false)
                                        if (pickedDate) {
                                            setCredentials((prev) => ({ ...prev, dob: pickedDate }))
                                        }
                                    }}
                                    maximumDate={new Date()}   
                                />
                            )}

                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </GlobalLayout>
    )

}

export default ProfileScreen