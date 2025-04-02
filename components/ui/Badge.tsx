import { View, Text, StyleSheet, TouchableWithoutFeedback, Pressable } from 'react-native';

const Badge = ({ onPress, isVisible, message = "This is a tooltip!" }: { onPress: () => void, message?: string, isVisible: boolean }) => {
    const handlePress = () => {
        onPress();
    };
    return (
        <View style={styles.container}>
            <Pressable onPress={handlePress}>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>i</Text>
                </View>
            </Pressable>
            {isVisible && (
                <TouchableWithoutFeedback onPress={onPress}>
                    <View style={styles.tooltip}>
                        <Text style={styles.tooltipText}>{message}</Text>
                    </View>
                </TouchableWithoutFeedback>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        alignItems: 'center',
    },
    badge: {
        backgroundColor: '#338', // Blue color
        width: 20,
        height: 20,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',

    },
    badgeText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    tooltip: {
        position: 'absolute',
        top: -35, // Position the tooltip below the badge
        left: 10,
        backgroundColor: '#444',
        padding: 8,
        borderRadius: 5,
        zIndex: 1,
        width: 100
    },
    tooltipText: {
        color: '#fff',
        fontSize: 12,
    },
});

export default Badge;