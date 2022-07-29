import { Poll } from "./poll";

export interface Answer{
    id: number;
    content: string;
    rating: number;
    poll: Poll;
}