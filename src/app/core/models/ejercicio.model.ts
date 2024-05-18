export interface Exercise {
    _id ?: string;
    name: string;
    description: string;
    difficulty: string;
    muscles : string;
    image ?: string;
    video ?: string;
    created_by ?: string;
    creation_date ?: Date;
}
