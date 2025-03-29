import GlobalLayout from '@/components/global/global-layout'
import Button from '@/components/ui/Button'
import { useTournament } from '@/context/tournament-provider'
import { useRouter } from 'expo-router'
import { View, Text } from 'react-native'

const ChooseTeamSizeScreen = () => {
    const { tournament, setTournament } = useTournament()
    const router = useRouter()
    const handleTournamentChange = (key: string, value: string) => {
        setTournament({ ...tournament, [key]: value })
        router.push('/(routes)/choosematches')
    }

    return (
        <GlobalLayout>
            <View className='w-60 mx-auto justify-center gap-4 h-full'>
                <Button onPress={() => handleTournamentChange('teamSize', "Solo")}>Solo</Button>
                <Button onPress={() => handleTournamentChange('teamSize', "Duo")}>Duo</Button>
                <Button onPress={() => handleTournamentChange('teamSize', "Squad")}>Squad</Button>
            </View>
        </GlobalLayout>
    )
}

export default ChooseTeamSizeScreen