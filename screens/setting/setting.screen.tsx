import GlobalLayout from '@/components/global/global-layout';
import Button from '@/components/ui/Button';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

const buttons: { [key: string]: string } = {
    "AUDIO/SOUND": '/',
    "PERMISSION": '/',
    "CONTACT US": '/',
    "DELETE ACCOUNT": '/',
    "PRIVACY AND POLICY": '/',
    "TERMS OF USE": '/',
    "SEND FEEDBACK": '/',
};

const SettingScreen = () => {
    const router = useRouter()
    return (
        <GlobalLayout>
            <View className='w-60 ml-auto gap-1 py-1 justify-between h-full'>
                <Button onPress={() => { }} className='!py-1.5' textClassName='text-lg'>Account Info</Button>
                <Button onPress={() => { }} className='!py-1.5' textClassName='text-lg'>LOG OUT</Button>
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