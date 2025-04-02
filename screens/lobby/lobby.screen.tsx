import { View, Text, Image, ScrollView, useWindowDimensions } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import Button from '@/components/ui/Button';

const LobbyScreen = () => {
    const { id } = useLocalSearchParams();
    const { width } = useWindowDimensions();
    const imageSize = width * 0.08; // Adjust image size based on screen width
    const teamContainerWidth = width * 0.2; // Adjust team box width

    return (
        <View className='bg-[#3c3c3c] flex-1 p-4 gap-2'>
            {/* Logout Button */}
            <View className='bg-white rounded-full w-16 h-16 flex items-center absolute right-4 top-4 justify-center self-end mt-2'>
                <Image source={require('../../assets/icons/logout.png')} alt='logout' className='w-7 h-7' />
            </View>

            {/* Timer Box */}
            <View style={{ maxWidth: '50%' }} className='w-full mx-auto bg-[#333333] p-4 mt-6'>
                <Text className='text-white text-center text-lg'>10:00</Text>
            </View>

            {/* Teams List */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
                className='w-full px-4 py-2 mx-auto mt-4 bg-black shrink-0'
            >
                {[...Array(4)].map((_, index) => (
                    <View key={index} style={{ width: teamContainerWidth }} className='bg-[#333333] rounded-lg py-2 mx-2 '>
                        <Text className='text-white pl-2 pb-1 text-center'>Team {index + 1}</Text>
                        <View className='flex flex-row gap-1 flex-wrap items-center justify-center'>
                            {[...Array(4)].map((_, imgIndex) => (
                                <Image
                                    key={imgIndex}
                                    source={require('../../assets/icons/player-placeholder.png')}
                                    alt='user'
                                    style={{ width: imageSize, height: imageSize }}
                                />
                            ))}
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Upload Button */}
            <Button onPress={() => { }} className='self-end mb-4 '>
                <View className='flex flex-row items-center gap-2'>
                    <Text className='text-xl text-white'>Upload</Text>
                    <Image source={require('../../assets/icons/upload.png')} alt='upload' className='w-6 h-6' />
                </View>
            </Button>
        </View>
    );
};

export default LobbyScreen;