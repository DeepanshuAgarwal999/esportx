import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useAlert } from "@/context/alert-provider";
import { useAuth } from "@/context/auth-provider";
import { AuthService } from "@/services/auth-service";
import { useLocalSearchParams, useRouter } from "expo-router";
import GlobalLayout from "@/components/global/global-layout";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import * as SecureStore from 'expo-secure-store'
import { AxiosError } from "axios";

type ParamsType = {
  username_bgmi?: string,
  userid_bgmi?: string,
  upi_id?: string,
  phone: string
}

const EnterOtpScreen = () => {
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const { phone, ...restAccnParams } = useLocalSearchParams<ParamsType>();
  const { alert } = useAlert()
  const { setUser } = useAuth()

  const { upi_id, userid_bgmi, username_bgmi } = restAccnParams || {}

  const isUserCreatingAccount = !!(username_bgmi && userid_bgmi && upi_id)
  console.log(isUserCreatingAccount);
  const otpLength = 4;
  const handleOtpSubmit = async () => {
    if (otp.length === otpLength) {
      try {
        setIsLoading(true)

        const response = await AuthService.verifyOTP(phone, otp)

        console.log(response);
        if (!response) {
          alert('Failed', `Invalid OTP`, () => {
            router.back()
          })
          return
        }
        if (response.isNewUser) {
          if (isUserCreatingAccount) {
            const response = await AuthService.signUp({
              username_bgmi,
              userid_bgmi,
              upi_id,
              phone
            })
            if (response && response.status === 1) {
              setUser(response.user_input)
              SecureStore.setItem('user', JSON.stringify(response.user_input));
            }
          }
          else {
            alert('Failed', `User not exists`, () => {
              router.push('/(auth)/account-detail')
            })
            return
          }
        }
        else {
          setUser(response.user)
          SecureStore.setItem('user', JSON.stringify(response.user));
        }
        router.replace('/')
        setOtp('')
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          if (error.status === 402) {
            alert('Failed', `OTP Expired`)
          }
        }
        alert('Failed', `Invalid OTP`)
      }
      finally {
        setIsLoading(false)
      }
    }
    else {
      alert('Failed', `Enter a valid ${otpLength} digit OTP`)
    }
  }
  useEffect(() => {
    if (!phone) router.navigate('/(auth)/enter-mobile')
  }, [phone])

  return <GlobalLayout>

    <View className="flex items-center justify-center h-full">
      <Text className="text-white">{otpLength} digit OTP sent to your mobile no. {phone}</Text>
      <View className="w-52 flex flex-col gap-8 mt-8">
        <InputField placeholder="Enter OTP" disableFullscreenUI={true} keyboardType="numeric" onChangeText={(text) => setOtp(text)} value={otp} maxLength={otpLength} />
        <Button isLoading={isLoading} onPress={() => handleOtpSubmit()} className="w-full">Submit OTP </Button>
      </View>
    </View>
  </GlobalLayout>
};

export default EnterOtpScreen;
