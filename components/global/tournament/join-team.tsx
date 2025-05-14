import { View, Text, Dimensions, Keyboard, TouchableWithoutFeedback, Pressable, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TournamentService } from '@/services/tournament-service'
import { useAuth } from '@/context/auth-provider'
import { useAlert } from '@/context/alert-provider'
import { AxiosError } from 'axios'
import Modal from '@/components/ui/Modal'
import Entypo from '@expo/vector-icons/Entypo'
import InputField from '@/components/ui/InputField'
import Button from '@/components/ui/Button'
import { useTournament } from '@/context/tournament-provider'

const JoinTeam = ({ isJoinModalVisible, setIsJoinModalVisible }: { isJoinModalVisible: boolean, setIsJoinModalVisible: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [teamCode, setTeamCode] = useState("")
    const [screenDimensions, setScreenDimensions] = useState(Dimensions.get('window'))
    const { user } = useAuth()
    const { alert } = useAlert()
    const { setTournament } = useTournament()
    // Handle screen dimension changes (rotation)
    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            setScreenDimensions(window);
        });

        return () => subscription.remove();
    }, []);

    const handleJoinTeam = async () => {
        Keyboard.dismiss();
        try {
            const { data } = await TournamentService.joinTeam(user.id, teamCode)
            if (data) {
                const teamId = data.team_id
                setTournament(prevTournament => ({
                    ...prevTournament,
                    teamId: teamId,
                }));
                alert("Success", "Team joined successfully")
            }
            else {
                alert("Error", "While joining the team, please try again later")
            }
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                if (error.status === 409) {
                    alert("Error", "You have already joined the team.")
                    return
                }
            }
            alert("Error", "Something went wrong. Please try again")
        }
        finally {
            setIsJoinModalVisible(false)
        }
    }
    return (
        <Modal isVisible={isJoinModalVisible}>
            <KeyboardAvoidingView enabled={true} behavior="height" style={{ flex: 1 }} keyboardVerticalOffset={10}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1 }}>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <View className='w-80 max-w-sm bg-[#2c2d2c] py-8 px-8 mx-auto rounded-lg'>
                                <Pressable
                                    className='absolute top-1 right-1  rounded-full z-10'
                                    onPress={() => {
                                        Keyboard.dismiss();
                                        setIsJoinModalVisible(false);
                                        setTeamCode("")
                                    }}
                                >
                                    <Entypo name="cross" size={24} color="white" />
                                </Pressable>
                                <Text className='text-white text-lg mb-4'>Enter the code to join the Team</Text>
                                <InputField
                                    placeholder="Team Code"
                                    value={teamCode}
                                    onChangeText={(text) => setTeamCode(text)}
                                    autoCapitalize="characters"
                                />
                                <Button
                                    className="mt-6"
                                    onPress={handleJoinTeam}
                                >
                                    Join Team
                                </Button>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Modal>
    )
}

export default JoinTeam