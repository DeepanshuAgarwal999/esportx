import { View, Text } from 'react-native';
import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import StatusSymbol from '@/components/status-symbol';
import Badge from '@/components/ui/Badge';
import { useRouter } from 'expo-router';

const TournamentCard = ({ tournament }: { tournament: any }) => {
    const { name = 'Tournament 1', status = "matchmaking", totalPlayers = 64, joinedPlayers = 10 } = tournament || {};
    const [isBadgeVisible, setBadgeVisible] = useState(false); // State to control badge visibility

    const handleBadgeToggle = () => {
        setBadgeVisible(!isBadgeVisible); // Toggle badge visibility
    };
    const router = useRouter()

    const handleClick = () => {
        router.push(`/(routes)/lobby/${tournament?.name}`)
    }

    return (
        <View className='relative'>
            <Button onPress={handleClick} className="w-52 py-2 relative">
                <View>
                    <Text className="text-white text-lg text-center">{name}</Text>
                    <View className="flex flex-row items-center justify-between w-full mt-2">
                        <View className="flex flex-row items-center gap-2">
                            <StatusSymbol status={status} />
                            <Text className="text-white text-sm">{status}</Text>
                        </View>
                        <Text className="text-white text-sm">
                            {joinedPlayers}/{totalPlayers}
                        </Text>
                    </View>
                </View>
            </Button>
            <View className='absolute top-0 right-0'>
                {/* Badge Component */}
                <Badge
                    isVisible={isBadgeVisible} // Control visibility dynamically
                    message={`${status}`}
                    onPress={handleBadgeToggle} // Toggle badge visibility on press
                />
            </View>
        </View>
    );
};

export default TournamentCard;