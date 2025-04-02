import GlobalLayout from '@/components/global/global-layout'
import TournamentCard from '@/components/global/tournament/tournament-card'
import { useRouter } from 'expo-router'
import { View, Text, FlatList, StyleSheet } from 'react-native'

const getTournaments = [{
    name: "Tournament 1", status: "matchmaking", totalPlayers: 64, joinedPlayers: 10
}, { name: "Tournament 2", status: "readytogo", totalPlayers: 64, joinedPlayers: 10 }, { name: "Tournament 3", status: "matchmaking", totalPlayers: 64, joinedPlayers: 10 }]

const TournamentScreen = () => {

    return (
        <GlobalLayout>
            <View>
                <FlatList contentContainerStyle={styles.list} keyExtractor={(item) => item.name} data={getTournaments} renderItem={({ item }) => <TournamentCard  tournament={item} />} />
            </View>
        </GlobalLayout>
    )
}

const styles = StyleSheet.create({
    list: {
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1, // Ensures centering even if there are fewer items
        width: '100%',
        height: '100%',
        gap: 20
    },
});

export default TournamentScreen

