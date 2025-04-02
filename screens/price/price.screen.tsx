import { View, FlatList, StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import GlobalLayout from '@/components/global/global-layout';
import Button from '@/components/ui/Button';
import { PRICE_LIST } from '@/constants/pricelist';
import { useTournament } from '@/context/tournament-provider';
import { useRouter } from 'expo-router';
import Badge from '@/components/ui/Badge';

const PriceScreen = () => {
    const { tournament, setTournament } = useTournament();
    const [activeTooltipIndex, setActiveTooltipIndex] = useState<number | null>(null);

    const router = useRouter();

    // Ensure `tournament.matches` is one of the valid keys in PRICE_LIST
    if (!tournament.matches || ![`1`, `3`, `6`].includes(tournament.matches)) {
        router.back();
        return null;
    }

    // Dynamically construct the key for PRICE_LIST
    const priceListKey = `totalMatches_${tournament.matches}` as keyof typeof PRICE_LIST;

    const handleOnPress = (item: string) => {
        setTournament({ ...tournament, price: item })
        router.push('/(routes)/tournaments')
    }
    
    return (
        <GlobalLayout>
            <FlatList
                data={PRICE_LIST[priceListKey]}
                keyExtractor={(item, index) => index.toString() + index}
                numColumns={2}
                contentContainerStyle={styles.list}
                renderItem={({ item, index }) => (
                    <View>
                        <Button
                            className="w-40 m-6 relative"
                            onPress={() => {
                                handleOnPress(item)
                            }}
                        >
                            Rs. {item}
                        </Button>
                        <View className='absolute right-6 top-6'>
                            <Badge
                                isVisible={activeTooltipIndex === index}
                                onPress={() =>
                                    setActiveTooltipIndex(activeTooltipIndex === index ? null : index)
                                }
                                message={`Price: Rs. ${item}`}
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