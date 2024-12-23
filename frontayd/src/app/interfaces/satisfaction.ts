export interface Satisfaction {
    [key: string]: string; 
    Question1: string,
	Question2: string,
	Question3: string,
	Question4: string,
	Question5: string
}

export interface SendSatisfaction{
    account_id: number,
    category: string,
    score: number,
    responded_at: number,
    comment: string,
    answer1: string,
    answer2: string,
    answer3: string,
    answer4: string,
    answer5: string
}