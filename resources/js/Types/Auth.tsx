export type Auth = {
    user: {
        id: number;
        name: string;
        email: string;
        email_verified_at: string;
        created_at: string;
        updated_at: string;
        is_admin: boolean;
        is_coach: boolean;
        section_id: number;
        github_id: number;
        section: {
            id: number;
            name: string;
        };
    };
};
