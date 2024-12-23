export interface AnswerAddRequestDTO {
    bankerId: number;
    content: string;
}

export interface AnswerResponseDTO {
    bankerId: number;
    bankerName: string;
    content: string;
    createdAt: string;
    goodCount: number;
    questionId: number;
    updatedAt: string;
}

export interface AnswerGoodRequestDTO {
    questionId: number;
    customerId: number;
}