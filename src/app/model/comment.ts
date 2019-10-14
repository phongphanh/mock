import { Profile } from './profile';

interface Comment {
    "id": number;
    "createdAt": string;
    "updatedAt": string;
    "body": string;
    "author": Profile;
}

export interface Comments{
    comments: Comment[];
}