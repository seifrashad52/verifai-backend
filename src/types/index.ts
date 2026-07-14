export type Verdict = "true" | "false" | "unverifiable";

export interface Source {
  title: string;
  url: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

export interface Session {
  user: User;
  session: {
    id: string;
    token: string;
    expiresAt: string;
  };
}

export interface Country {
  id: string;
  name: string;
  nameAr: string;
  code: string;
  flagUrl?: string | null;
}

export interface Level {
  id: string;
  countryId: string;
  orderIndex: number;
  difficulty: number;
  platformType: string;
  scenarioText: string;
  scenarioImageUrl?: string | null;
}

export interface ClaimResult {
  id: string;
  verdict: Verdict;
  explanation: string;
  sources: Source[];
}
