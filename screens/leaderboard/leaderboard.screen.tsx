import { View, Text } from 'react-native'
import React from 'react'
import GlobalLayout from '@/components/global/global-layout'

const LeaderBoardScreen = () => {
    return (
        <GlobalLayout>
            <View className='flex flex-row  justify-between w-full h-full'>
                <View className='w-1/2'>

                </View>
                <View className='bg-[#333333] py-4 w-2/5'>
                    <Text className='p-4 text-white text-2xl text-center'>Ranking</Text>
                    <View className='p-4 bg-[#5F5F5F] flex flex-row justify-around'>
                        <Text className='text-white text-xl'>
                            Weekly
                        </Text>
                        <Text className='text-white text-xl'>
                            Recent
                        </Text>
                    </View>
                </View>
            </View>
        </GlobalLayout>
    )
}

export default LeaderBoardScreen