import GlobalLayout from '@/components/global/global-layout'
import Button from '@/components/ui/Button'
import { useAlert } from '@/context/alert-provider'
import { useTournament } from '@/context/tournament-provider'
import { TournamentService } from '@/services/tournament-service'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

const ChooseTeamSizeScreen = () => {
    const [teams, setTeams] = useState<{ id: number, name: string }[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const { alert } = useAlert()
    const router = useRouter()
    const { setTournament } = useTournament()

    useEffect(() => {
        const getTeamType = async () => {
            try {
                const { data } = await TournamentService.teamTypes()
                if (data) {
                    setTeams(data)
                }
            } catch (error) {
                console.log(error);
                alert("Error", "Something went wrong. Please try again", () => {
                    router.back()
                })
            }
            finally {
                setIsLoading(false)
            }
        }
        getTeamType()
    }, [])


    const handleSelectTeam = (id: number, name: string) => {
        setTournament((prev) => ({ ...prev, teamId: id, teamSize: name }))
        router.push('/(routes)/choosematches')
    }

    return (
        <GlobalLayout>
            <View className='w-60 mx-auto justify-center gap-4 h-full'>
                {
                    isLoading ? <ActivityIndicator color={'#fff'} /> : <>
                        {
                            teams.map((team, index) => (
                                <Button
                                    key={index}
                                    onPress={() => handleSelectTeam(team.id, team.name)}
                                    textClassName='text-xl'
                                >
                                    {team.name}
                                </Button>
                            ))}</>
                }
            </View>
        </GlobalLayout >
    )
}

export default ChooseTeamSizeScreen