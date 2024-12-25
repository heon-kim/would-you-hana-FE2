import { request } from '../hoc/request';
import { config } from '../config/config';
import { ReservationResponseDTO } from '../types/dto/reservation.dto';

const BASE_URL = config.apiUrl;

export const reservationService = {
  // 유저 예약 내역
  getReservations: (customerId: number) => {
    return request<ReservationResponseDTO>({
      method: 'GET',
      url: `${BASE_URL}/my/rsvList/${customerId}`
    });
  },
};
