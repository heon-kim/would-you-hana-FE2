export interface CommentAddRequestDTO {
    customerId: number;
    content: string;
}

export interface CommentDTO {
    id: number;
    content: string;
    customerId: number;
    nickname: string;
    createdAt: string;
}

export interface CommentResponseDTO {
    nickname: string;
    id: number;
    content: string;
    createdAt: string;
}