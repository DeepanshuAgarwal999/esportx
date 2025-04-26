import { View, Text, KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import GlobalLayout from '@/components/global/global-layout'
import { useAuth } from '@/context/auth-provider'
import InputField from '@/components/ui/InputField'
import Button from '@/components/ui/Button'
import { AboutService } from '@/services/about-service'
import { useAlert } from '@/context/alert-provider'
import { AxiosError } from 'axios'

type FormErrors = {
    email?: string;
    name?: string;
    subject?: string;
    message?: string;
}

const ContactUsSendFeedback = ({ isContactPage = false }) => {
    const { user } = useAuth()
    const { alert } = useAlert()
    const [isLoading, setIsLoading] = useState(false)
    const [credentials, setCredentials] = useState({
        email: "",
        name: "",
        subject: "",
        message: ""
    })
    const [errors, setErrors] = useState<FormErrors>({})

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}

        // Email validation
        if (!credentials.email.trim()) {
            newErrors.email = "Email is required"
            setErrors(newErrors)
            return false
        } else if (!/^\S+@\S+\.\S+$/.test(credentials.email)) {
            newErrors.email = "Please enter a valid email address"
            setErrors(newErrors)
            return false
        }

        // Name validation
        if (!credentials.name.trim()) {
            setErrors(newErrors)
            newErrors.name = "Name is required"
            return false
        }

        // Subject validation
        if (!credentials.subject.trim()) {
            setErrors(newErrors)
            newErrors.subject = "Subject is required"
            return false
        }

        // Message validation
        if (!credentials.message.trim()) {
            setErrors(newErrors)
            newErrors.message = "Message is required"
            return false
        } else if (credentials.message.length < 10) {
            setErrors(newErrors)
            newErrors.message = "Message should be at least 10 characters"
            return false
        }
        return true
    }

    const handleSubmit = async () => {
        if (validateForm()) {
            setIsLoading(true)
            const userCredentials = {
                user_id: user?.id,
                phone: user?.phone,
                email: credentials.email,
                name: credentials.name,
                subject: credentials.subject,
                message: credentials.message
            }
            try {
                let response = null
                if (isContactPage) {
                    response = await AboutService.contactUs(userCredentials)
                }
                else {
                    response = await AboutService.sendFeedback(userCredentials)
                }
                if (response) {
                    alert('Success', "Your feedback has been sent successfully")
                    setCredentials({
                        email: "",
                        name: "",
                        subject: "",
                        message: ""
                    })
                }
            } catch (error: any) {
                alert('Error', "Something went wrong. Please try again")
            } finally {
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
                        paddingHorizontal: 10,
                        paddingBottom: 10,
                        gap: 10,
                        width: '100%',
                        maxWidth: 300,
                        marginInline: "auto"
                    }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    keyboardDismissMode="interactive"
                    bounces={false}
                >
                    <Text className='heading'>{isContactPage ? "Contact Us" : "Send Feedback"}</Text>

                    <View>
                        <InputField
                            value={credentials.email}
                            disableFullscreenUI={true}
                            onChangeText={(text) => setCredentials({ ...credentials, email: text })}
                            placeholder="Email"
                        />
                        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                    </View>

                    <View>
                        <InputField
                            value={credentials.name}
                            disableFullscreenUI={true}
                            onChangeText={(text) => setCredentials({ ...credentials, name: text })}
                            placeholder="Name"
                        />
                        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                    </View>

                    <View>
                        <InputField
                            value={credentials.subject}
                            disableFullscreenUI={true}
                            onChangeText={(text) => setCredentials({ ...credentials, subject: text })}
                            placeholder="Subject"
                        />
                        {errors.subject && <Text style={styles.errorText}>{errors.subject}</Text>}
                    </View>

                    <View>
                        <InputField
                            value={credentials.message}
                            disableFullscreenUI={true}
                            onChangeText={(text) => setCredentials({ ...credentials, message: text })}
                            placeholder="Message"
                            inputClassName='py-6'
                            multiline={true}
                            numberOfLines={4}
                        />
                        {errors.message && <Text style={styles.errorText}>{errors.message}</Text>}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <Button
                onPress={handleSubmit}
                className='absolute w-[150px] bottom-2 right-2'
                isLoading={isLoading}
            >
                Send
            </Button>
        </GlobalLayout>
    )
}

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 2,
        marginLeft: 4,
    }
})

export default ContactUsSendFeedback