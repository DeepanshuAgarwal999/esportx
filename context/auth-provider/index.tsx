import { createContext, useState, ReactNode, useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

type AuthContextType = {
    user: {
        id: number,
        phone: string,
    };
    setUser: (user: any) => void;
    logOut: () => void
    loading: boolean
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
    children: ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter()

    useEffect(() => {
        (async () => {
            try {
                const data = SecureStore.getItem("user");
                if (data) {
                    setUser(JSON.parse(data));
                }
                else {
                    router.push('/(auth)/login')
                }
            } catch (error) {
                router.push('/(auth)/login')
            }
            finally {
                setLoading(false)
            }
        })();
    }, []);


    const logOut = async () => {
        await SecureStore.deleteItemAsync("user");
        setUser(null);
        router.replace('/(auth)/login')
    }
    return (
        <AuthContext.Provider value={{ user, setUser, logOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a AuthContextProvider");
    }
    return context;
};

export { AuthContextProvider, useAuth };
