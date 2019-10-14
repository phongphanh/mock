export interface Profile {
        "username": string;
        "bio": string;
        "image": string;
        "following": boolean;
}

export interface ProfileRes{
    profile: Profile;
}