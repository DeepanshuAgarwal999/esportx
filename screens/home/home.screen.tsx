import GlobalLayout from '@/components/global/global-layout';
import Button from '@/components/ui/Button'
import { View, Text, Pressable, Image } from 'react-native'

const HomeScreen = () => {
    return (
        <GlobalLayout>
            <View className='flex justify-between flex-row py-2 px-4'>
                <View>
                    <Text>Logo of user Image</Text>
                </View>

                <Pressable>
                    <Image source={require("../../assets/icons/info.png")} style={{ width: 50, height: 50 }} />
                </Pressable>
            </View>

            <View className='flex flex-row items-center justify-between flex-1'>
                <Button onPress={() => { }} className='mt-14' textClassName='text-xl'>Leaderboard</Button>
                <View className='gap-y-4'>
                    <Button onPress={() => { }}>Create Team</Button>
                    <Button onPress={() => { }}>Join Team</Button>
                </View>
            </View>

            <Button onPress={() => { }} className='w-60 mb-4 ml-4'>Join Tournament</Button>
        </GlobalLayout>
    )
}

export default HomeScreen;
