import React from 'react';
import { useAuth } from '@/context/auth-provider';
import { Redirect, Stack } from 'expo-router';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const RoutesLayout = () => {
    const { user, loading } = useAuth();
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    }
    if (!user) {
        return <Redirect href={'/(auth)/login'} />;
    }

    return <Stack screenOptions={{ headerShown: false }} />
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333',
    },
});

export default RoutesLayout;