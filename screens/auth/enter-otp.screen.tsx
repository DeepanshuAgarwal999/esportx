import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ImageBackground, SafeAreaView, Text, View } from "react-native";

const EnterOtpScreen = () => {
  const router = useRouter()
  const [otp, setOtp] = useState('')
  const handleOtpSubmit = () => {
    if (otp.length === 6) {
      setOtp('')
      router.navigate('/(auth)/enter-otp')
      Alert.alert('User login successfully')
    }
    else {
      Alert.alert('Enter a valid 6 digit OTP')
    }
  }
  return <SafeAreaView className="bg-banner" style={{ flex: 1 }}>
    <ImageBackground
      source={require("../../assets/images/app_banner.png")}
      style={{ flex: 1, backgroundPosition: "center", backgroundSize: "cover" }}
      className="flex items-center justify-center"
    >
      <View className="w-60 flex flex-col gap-8">
        <InputField autoFocus placeholder="Enter OTP" keyboardType="numeric" onChangeText={(text) => setOtp(text)} value={otp} />
        <Button onPress={() => handleOtpSubmit()} >Submit OTP </Button>
      </View>
    </ImageBackground>
  </SafeAreaView>
};

export default EnterOtpScreen;
