import React, { createContext, useContext, useState, useCallback } from 'react';

type Tournament = {
    teamSize?: string;
    price?: {
        amount: string,
        id: number
    },
    teamId?: number | null,
    matchId?: number,
    matchName?: string,
    isTeamLeader?: boolean,
};

type TournamentContextType = {
    tournament: Tournament;
    setTournament: React.Dispatch<React.SetStateAction<Tournament>>;
};

const TournamentContext = createContext<TournamentContextType | undefined>(undefined);

export const TournamentProvider = React.memo(({ children }: { children: React.ReactNode }) => {
    const [tournament, setTournamentState] = useState<Tournament>({
        teamSize: "",
        teamId: null
    });

    // Memoize the setTournament function to avoid unnecessary re-renders

    return (
        <TournamentContext.Provider value={{ tournament, setTournament: setTournamentState }}>
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