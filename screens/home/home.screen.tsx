import GlobalLayout from '@/components/global/global-layout';
import Button from '@/components/ui/Button'
import { useRouter } from 'expo-router';
import { View, Text, Pressable, Image, } from 'react-native'

const HomeScreen = () => {
    const router = useRouter()
    return (
        <GlobalLayout>

            <View className='flex justify-between flex-row pt-4 px-4'>
                <View>
                    <Text>Logo of user Image</Text>
                </View>
                <Pressable onPress={() => router.push('/(routes)/setting')}>
                    <Image source={require("../../assets/icons/setting.png")} style={{ width: 40, height: 40, tintColor: "white" }} />
                </Pressable>
            </View>
            <View className='flex flex-row items-center justify-between flex-1'>
                <Button onPress={() => { router.push('/(routes)/leaderboard') }} className='mt-14' textClassName='text-xl'>Leaderboard</Button>
                <View className='gap-y-4'>
                    <Button onPress={() => { }}>Create Team</Button>
                    <Button onPress={() => { }}>Join Team</Button>
                </View>
            </View>

            <Button onPress={() => { router.push('/(routes)/chooseteamsize') }} className='w-60 mb-4 ml-4'>Join Tournament</Button>
        </GlobalLayout>
    )
}

export default HomeScreen;
