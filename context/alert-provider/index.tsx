import React, { createContext, useContext, useState, ReactNode } from "react";
import { Dialog, Portal, Button, Paragraph } from "react-native-paper";

// Context type definition
type AlertContextType = {
    alert: (title: string, message: string, onConfirm?: () => void, cancelText?: string, onCancel?: () => void) => void;
};

// Create context
const AlertContext = createContext<AlertContextType | undefined>(undefined);

// Hook to use alert
export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error("useAlert must be used within an AlertProvider");
    }
    return context;
};

// Provider component
export const AlertProvider = ({ children }: { children: ReactNode }) => {
    const [alertData, setAlertData] = useState<{
        title: string;
        message: string;
        onConfirm?: () => void;
        cancelText?: string;
        onCancel?: () => void;
    } | null>(null);

    const showAlert = (title: string, message: string, onConfirm?: () => void, cancelText?: string, onCancel?: () => void) => {
        setAlertData({ title, message, onConfirm, cancelText, onCancel });
    };

    const closeAlert = () => {
        if (alertData?.onConfirm) alertData.onConfirm();
        setAlertData(null);
    };

    return (
        <AlertContext.Provider value={{ alert: showAlert }}>
            {children}
            <Portal>
                <Dialog
                    visible={!!alertData}
                    onDismiss={closeAlert}
                    style={{
                        borderRadius: 10,
                        backgroundColor: "#333333",
                        width: 500,
                        alignSelf: "center", // Center horizontally
                        marginTop: -90
                    }}
                >
                    {alertData?.title && <Dialog.Title style={{ color: "white" }}>{alertData.title}</Dialog.Title>}
                    {alertData?.message && (
                        <Dialog.Content>
                            <Paragraph style={{ color: "white" }}>{alertData.message}</Paragraph>
                        </Dialog.Content>
                    )}

                    <Dialog.Actions>
                        {alertData?.cancelText && (
                            <Button
                                onPress={() => {
                                    if (alertData?.onCancel) alertData.onCancel();
                                    setAlertData(null);
                                }}
                                mode="contained-tonal"
                                style={{ backgroundColor: "#333333" }}
                                textColor="white"
                            >
                                {alertData.cancelText}
                            </Button>
                        )}
                        <Button onPress={closeAlert} mode="contained" style={{ backgroundColor: "#333333" }} textColor="white">
                            OK
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </AlertContext.Provider>
    );
};
