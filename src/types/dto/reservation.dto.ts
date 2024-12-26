export interface ReservationResponseDTO{
    branchName: string;
    rdayTime: string;
    bankerName: string;
}

export interface ReservationRequestDTO{
    customerId: number;
    branchName: string;
    reservationDate: string;
    bankerName: string;
}