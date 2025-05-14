import { View, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import GlobalLayout from '@/components/global/global-layout';
import Button from '@/components/ui/Button';
import { useTournament } from '@/context/tournament-provider';
import { useRouter } from 'expo-router';
import Badge from '@/components/ui/Badge';
import { TournamentService } from '@/services/tournament-service';
import { useAlert } from '@/context/alert-provider';

const PriceScreen = () => {
    const [activeTooltipIndex, setActiveTooltipIndex] = useState<number | null>(null);
    const [priceList, setPriceList] = useState<{ amount: string, id: number }[]>([])

    const { alert } = useAlert();
    const { tournament, setTournament } = useTournament();
    const router = useRouter();

    const getPriceList = async () => {
        try {
            const { data } = await TournamentService.prices(tournament.matchId as number)
            if (!data) {
                throw new Error("Invalid Match Id");
            }
            console.log(data);
            setPriceList(data)
        } catch (error) {
            alert("Error", "Something went wrong. Please try again", () => {
                router.back()
            })
        }
    }
    useEffect(() => {
        if (!tournament.matchId) {
            router.back()
            return
        }
        getPriceList()
    }, [])

    const handleOnPress = (amount: string, id: number) => {
        setTournament({ ...tournament, price: { amount, id } })
        router.push('/(routes)/tournaments')
    }

    return (
        <GlobalLayout>
            <FlatList
                data={priceList}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.list}
                renderItem={({ item, index }) => (
                    <View>
                        <Button
                            className="w-40 m-6 relative"
                            onPress={() => {
                                handleOnPress(item.amount, item.id)
                            }}
                        >
                            Rs. {item.amount}
                        </Button>
                        <View className='absolute right-6 top-6'>
                            <Badge
                                isVisible={activeTooltipIndex === index}
                                onPress={() =>
                                    setActiveTooltipIndex(activeTooltipIndex === index ? null : index)
                                }
                                message={`Price: Rs. ${item.amount}`}
                            />
                        </View>
                    </View>
                )}
            />
        </GlobalLayout>
    );
};

const styles = StyleSheet.create({
    list: {
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1, // Ensures centering even if there are fewer items
        width: '100%',
        height: '100%',
    },
});

export default PriceScreen;