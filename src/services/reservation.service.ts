import { request } from '../hoc/request';
import { config } from '../config/config';
import { ReservationRequestDTO, ReservationResponseDTO } from '../types/dto/reservation.dto';

const BASE_URL = config.apiUrl;

export const reservationService = {
  // 유저 예약 내역
  getReservations: (customerId: number) => {
    return request<ReservationResponseDTO>({
      method: 'GET',
      url: `${BASE_URL}/my/rsvList/${customerId}`
    });
  },

  //행원별 예약 현황 확인
  getReservatoinsForBanker: (bankerId: number) => {
    return request<ReservationResponseDTO>({
        method: 'GET',
        url: `${BASE_URL}/my/bankers/reservations`,
        params: {
            bankerId: bankerId.toString()
        }
      });
  },

  //예약 등록
  registReservation: (data: ReservationRequestDTO) => {
    return request<ReservationRequestDTO>({
        method: 'POST',
        url: `${BASE_URL}/reservation/register`,
        data
      });
  },
};
