import GlobalLayout from "@/components/global/global-layout";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import { useAlert } from "@/context/alert-provider";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

const EnterOtpScreen = () => {
  const [otp, setOtp] = useState('')
  const router = useRouter()
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const { alert } = useAlert()

  const otpLength = 4;
  const handleOtpSubmit = () => {
    if (otp.length === otpLength) {
      router.push('/(auth)/account-detail')
      setOtp('')
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
        <InputField autoFocus placeholder="Enter OTP" keyboardType="numeric" onChangeText={(text) => setOtp(text)} value={otp} maxLength={otpLength} />
        <Button onPress={() => handleOtpSubmit()} className="w-full">Submit OTP </Button>
      </View>
    </View>
  </GlobalLayout>
};

export default EnterOtpScreen;
