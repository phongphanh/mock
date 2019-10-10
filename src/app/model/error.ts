export interface Error {
    errors: {
        email?: string[];
        username?: string[];
        password?: string[];
    }
}