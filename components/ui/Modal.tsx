import { PropsWithChildren } from 'react';
import { View, Modal as RNModal, StyleSheet } from 'react-native'

type Props = PropsWithChildren<{
    isVisible: boolean;
    bottom?: any
}>
const Modal = ({ isVisible, children, bottom = "25%" }: Props) => {
    return (
        <RNModal animationType="slide" transparent={true} visible={isVisible}>
            <View style={styles.centeredView}>
                <View style={[styles.modalContent, { bottom }]}>
                    {children}
                </View>
            </View>
        </RNModal>
    )
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '100%',
        backgroundColor: '#',
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        position: 'absolute',
    },

});
export default Modal