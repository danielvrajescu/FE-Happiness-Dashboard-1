import { Answer } from "./answer";

export interface Poll{
    id: number;
    topic: string;
    answers: Answer[];
}