import { Poll } from "./poll";

export interface Answer{
    id: number;
    content: string;
    rating: number;
    pollId: number;
    userId: number;
}