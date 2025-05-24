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
    Platform,
    ToastAndroid,
} from 'react-native'
import * as Clipboard from 'expo-clipboard';
import JoinTeam from '@/components/global/tournament/join-team';
import { useTournament } from '@/context/tournament-provider';

const HomeScreen = () => {
    const router = useRouter()
    const { user } = useAuth()
    const { alert } = useAlert()
    const { tournament, setTournament } = useTournament()
    const [isJoinModalVisible, setIsJoinModalVisible] = useState(false)

    const handleCreateTeam = async () => {
        const { id } = user
        if (!id) {
            alert("Error", "Please login to create team")
            return
        }
        try {
            const response = await TournamentService.createTeam(id)
            const { data } = response
            if (!data) {
                throw new Error("Failed to create team")
            }
            alert("Success", "Team created successfully, please copy the code and join the team \n\nCode: " + data.team_code, async () => {
                try {
                    await Clipboard.setStringAsync(data.team_code)
                    if (Platform.OS === 'android') {
                        ToastAndroid.show('Team code copied!', ToastAndroid.SHORT);
                    }
                    else {
                        alert("Copied", "Team code copied to clipboard!")
                    }
                } catch (error) {
                    console.log(error);
                }

            })
            setTournament((prev) => ({ ...prev, isTeamLeader: true, teamId: data.team_id }))
        } catch (error) {
            console.log(error);
            alert("Error", "Failed to create team")
        }
    }

    const handleJoinTournament = () => {
        if (!tournament.isTeamLeader) {
            ToastAndroid.show('You are not the team leader', ToastAndroid.SHORT);
            return
        }
        router.push('/(routes)/chooseteamsize')
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
                <Button onPress={handleJoinTournament} className='w-60 mb-4 ml-4'>Join Tournament</Button>
            </View>
        </GlobalLayout>
    )
}

export default HomeScreen;