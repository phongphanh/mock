import { Profile } from './profile';

export interface Comment {
    "id": number;
    "createdAt": string;
    "updatedAt": string;
    "body": string;
    "author": Profile;
}

export interface Comments{
    comments: Comment[];
}

export interface CommentRes {
    comment: Comment;
}