import React, { createContext, useContext, useState, useCallback } from 'react';

type Tournament = {
    teamSize: string;
    matches: string | null;
    price: string,
    tournamentId: string
};

type TournamentContextType = {
    tournament: Tournament;
    setTournament: (tournament: Tournament) => void;
};

const TournamentContext = createContext<TournamentContextType | undefined>(undefined);

export const TournamentProvider = React.memo(({ children }: { children: React.ReactNode }) => {
    const [tournament, setTournamentState] = useState<Tournament>({
        teamSize: "",
        matches: null,
        price: '',
        tournamentId: ''
    });

    // Memoize the setTournament function to avoid unnecessary re-renders
    const setTournament = useCallback((newTournament: Tournament) => {
        setTournamentState(newTournament);
    }, []);

    return (
        <TournamentContext.Provider value={{ tournament, setTournament }}>
            {children}
        </TournamentContext.Provider>
    );
});

const useTournament = () => {
    const context = useContext(TournamentContext);
    if (context === undefined) {
        throw new Error('useTournament must be used within a TournamentProvider');
    }
    return context;
};

export { useTournament };