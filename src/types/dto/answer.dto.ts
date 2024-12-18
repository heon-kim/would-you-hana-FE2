export interface AnswerAddRequestDTO {
    bankerId: number;
    content: string;
}

export interface AnswerResponseDTO {
    bankerId: number;
    questionId: number;
    content: string;
    createdAt: string;
    updatedAt: string;
}