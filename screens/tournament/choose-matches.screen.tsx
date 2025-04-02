import GlobalLayout from '@/components/global/global-layout'
import Button from '@/components/ui/Button'
import { useTournament } from '@/context/tournament-provider'
import { useRouter } from 'expo-router'
import { View } from 'react-native'

const ChooseMatchesScreen = () => {
    const { tournament, setTournament } = useTournament()
    const router = useRouter()
    const handleTournamentChange = (key: string, value: string) => {
        setTournament({ ...tournament, [key]: value })
        router.push('/(routes)/prices')
    }
    return (
        <GlobalLayout>
            <View className='w-60 mx-auto justify-center gap-4 h-full'>
                <Button onPress={() => handleTournamentChange('matches', "1")}>1 Match</Button>
                <Button onPress={() => handleTournamentChange('matches', "3")}>3 Matches</Button>
                <Button onPress={() => handleTournamentChange('matches', "6")}>6 Matches</Button>
            </View>
        </GlobalLayout>
    )
}

export default ChooseMatchesScreen