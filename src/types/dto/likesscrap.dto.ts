export interface LikesScrapDTO{
    requestId : number;
    questionId : number;
    categoryName : string;
    title : string;
    likeCount : number;
    viewCount : number;
    createdAt : string;
    answerBanker : string;
}

export interface ScrapQuestionDTO{
    requestId : number;
    questionId : number;
    categoryName : string;
    title : string;
    likeCount : number;
    viewCount : number;
    createdAt : string;
    answerBanker : string;
}

export interface ScrapPostDTO{
    requestId : number;
    questionId : number;
    categoryName : string;
    title : string;
    customerName : string;
    likeCount : number;
    viewCount : number;
    createdAt : string;
    updatedAt : string;
}