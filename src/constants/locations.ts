import hwayangImg from '../assets/img/bank/hwayang.jpg';
import seongsuImg from '../assets/img/bank/seongsu.png';
import seouluuuuuupImg from '../assets/img/bank/seoulsuuuuuup.jpg';
import markerImg from '../assets/img/mark.png';
import markerAtmImg from '../assets/img/mark_atm.png';
import iconLocation from '../assets/img/icon_location.svg';
import iconLocationWhite from '../assets/img/icon_location_white.svg';

export const BRANCH_IMAGES: Record<string, string> = {
  '하나은행 화양동지점': hwayangImg,
  '하나은행 성수역지점': seongsuImg,
  '하나은행 서울숲지점': seouluuuuuupImg,
};

export const ICONS = {
  MARKER: markerImg,
  MARKER_ATM: markerAtmImg,
  LOCATION: iconLocation,
  LOCATION_WHITE: iconLocationWhite,
};

export const locations = [
  '강서구',
  '양천구',
  '구로구',
  '금천구',
  '영등포구',
  '동작구',
  '관악구',
  '서초구',
  '강남구',
  '송파구',
  '강동구',
  '마포구',
  '서대문구',
  '은평구',
  '종로구',
  '성북구',
  '동대문구',
  '중구',
  '광진구',
  '중랑구',
  '용산구',
  '강북구',
  '도봉구',
  '노원구',
  '성동구',
];
