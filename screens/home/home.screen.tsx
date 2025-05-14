import GlobalLayout from '@/components/global/global-layout';
import Button from '@/components/ui/Button'
import { useAlert } from '@/context/alert-provider';
import { useAuth } from '@/context/auth-provider';
import { TournamentService } from '@/services/tournament-service';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    View,
    Text,
    Pressable,
    Image,
} from 'react-native'
import * as Clipboard from 'expo-clipboard';
import JoinTeam from '@/components/global/tournament/join-team';

const HomeScreen = () => {
    const router = useRouter()
    const { user } = useAuth()
    const { alert } = useAlert()
    const [isJoinModalVisible, setIsJoinModalVisible] = useState(false)

    const handleCreateTeam = async () => {
        const { id } = user
        if (!id) {
            alert("Error", "Please login to create team")
            return
        }
        try {
            const { data } = await TournamentService.createTeam(id)
            if (data) {
                alert("Success", "Team created successfully, please copy the code and join the team \n\nCode: " + data.team_code, () => {
                    Clipboard.setStringAsync(data.team_code)
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <GlobalLayout>

            <View style={{ flex: 1 }}>
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
                        <Button onPress={handleCreateTeam}>Create Team</Button>
                        <Button onPress={() => setIsJoinModalVisible(true)}>Join Team</Button>
                    </View>
                </View>
                <JoinTeam isJoinModalVisible={isJoinModalVisible} setIsJoinModalVisible={setIsJoinModalVisible} />
                <Button onPress={() => { router.push('/(routes)/chooseteamsize') }} className='w-60 mb-4 ml-4'>Join Tournament</Button>
            </View>
        </GlobalLayout>
    )
}

export default HomeScreen;