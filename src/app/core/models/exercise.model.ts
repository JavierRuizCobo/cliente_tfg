export interface Exercise {
    _id ?: string;
    name: string;
    description: string;
    difficulty: string;
    muscles : string;
    video ?: string;
    created_by ?: string;
    creation_date ?: Date;
}
