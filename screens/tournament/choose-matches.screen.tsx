import GlobalLayout from '@/components/global/global-layout'
import Button from '@/components/ui/Button'
import { useTournament } from '@/context/tournament-provider'
import { TournamentService } from '@/services/tournament-service'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { View } from 'react-native'

const ChooseMatchesScreen = () => {
    const [matches, setMatches] = useState<{ id: number, name: string }[]>([])

    const { tournament, setTournament } = useTournament()
    const router = useRouter()

    const handleTournamentChange = (id: number, matchName: string) => {
        setTournament((prev) => ({ ...prev, matchId: id, matchName: matchName }))
        router.push('/(routes)/prices')
    }

    const getMatches = async () => {
        try {
            const { data } = await TournamentService.matchTypes(tournament.teamId as number)
            if (data) {
                setMatches(data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!tournament.teamId) {
            router.back()
            return
        }
        getMatches()
    }, [])

    return (
        <GlobalLayout>
            <View className='w-60 mx-auto justify-center gap-4 h-full'>
                {
                    matches?.map((match, index) => (
                        <Button
                            key={index}
                            onPress={() => handleTournamentChange(match.id, match.name)}
                            textClassName='text-xl'
                        >
                            {match.name}
                        </Button>
                    ))
                }
            </View>
        </GlobalLayout>
    )
}

export default ChooseMatchesScreen