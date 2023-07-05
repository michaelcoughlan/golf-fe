export interface Hole {
    [key: string]: Score[];
}

// The type sent to update Firestore entry
export interface HolePayload {
    [key: string]: Score;
}

export interface Score {
    name: string;
    score: number;
    scorecardIndex: number;
}
