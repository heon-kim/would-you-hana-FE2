export interface CommentAddRequestDTO {
    content: string;
}

export interface CommentDTO {
    id: number;
    parentCommentId: number;
    content: string;
    customerId: number;
    createdAt: string;
}

export interface CommentResponseDTO {
    userName: string;
    questionId: number;
    content: string;
    createdAt: string;
}