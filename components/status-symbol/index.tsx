import { View, Text } from 'react-native'
import React from 'react'

const StatusSymbol = ({ status }: { status: string }) => {
    if (!status) return null

    switch (status.toLocaleLowerCase()) {
        case 'matchmaking':
            return (
                <View className='bg-red-500 w-5 h-5 rounded-full'></View>
            )
        case 'readytogo':
            return (
                <View className='bg-yellow-500 w-5 h-5 rounded-full'></View>
            )
        case 'joinnow':
            return (
                <View className='bg-red-500 w-5 h-5 rounded-full'></View>
            )
        default:
            return (
                <View className='bg-gray-500 w-5 h-5 rounded-full'></View>
            )
    }
}

export default StatusSymbol