import GlobalLayout from '@/components/global/global-layout';
import Button from '@/components/ui/Button';
import { useAuth } from '@/context/auth-provider';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

const buttons: { [key: string]: string } = {
    "AUDIO/SOUND": '/',
    "PERMISSION": '/',
    "CONTACT US": '/(about)/contactus',
    "DELETE ACCOUNT": '/',
    "PRIVACY AND POLICY": '/',
    "TERMS OF USE": '/',
    "SEND FEEDBACK": '/(about)/sendfeedback',
};

const SettingScreen = () => {
    const router = useRouter()
    const { logOut } = useAuth()
    return (
        <GlobalLayout>
            <View className='w-60 ml-auto gap-1 py-1 justify-between h-full'>
                <Button onPress={() => { }} className='!py-1.5' textClassName='text-lg'>Account Info</Button>
                <Button onPress={() => logOut()} className='!py-1.5' textClassName='text-lg'>LOG OUT</Button>
                {Object.keys(buttons).map((label, index) => (
                    <Button
                        key={index}
                        onPress={() => router.push(buttons[label] as any)}
                        textClassName="text-lg"
                        className="!py-1.5 capitalize"
                    >
                        {label}
                    </Button>
                ))}

            </View>
        </GlobalLayout>
    );
};



export default SettingScreen;