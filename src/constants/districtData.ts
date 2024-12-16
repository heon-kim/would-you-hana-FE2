import { DistrictData } from '../types/district';
import logoSeocho from '../assets/img/logo_seocho.png';
import logoGwangjin from '../assets/img/logo_gwangjin.png';

export const DISTRICT_DATA: Record<string, DistrictData> = {
  서초구: {
    name: "서초구",
    logo: logoSeocho,
    isRegulationArea: true,
    keywords: ["자산관리", "외국인금융", "경기침체", "주택담보대출"],
    hotPosts: [
      {
        type: "대출",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "서초구에서 전세자금 대출 상담 잘해주는 곳"
      },
      {
        type: "소비",
        date: "2024.10.29 09:15",
        likes: "10개",
        views: "121회",
        content: "서초구 맛집 리스트 공유해요"
      },
      {
        type: "주식",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "서초구 사람들 주식 어떤 종목 투자해요?"
      }
    ],
    recentQna: [
      {
        type: "대출",
        date: "2024.10.31 10:31",
        likes: "1개",
        views: "10회",
        content: "사업자 대출 조건이 궁금합니다"
      },
      {
        type: "외환",
        date: "2024.11.03 10:31",
        likes: "1개",
        views: "20회",
        content: "외화 통장 개설 관련 문의"
      }
    ],
    topBankers: [
      {
        rank: 1,
        name: "보섭살김하나",
        level: "LV24",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#ffC0CB60]",
        showFullProfile: true
      },
      {
        rank: 2,
        name: "별돌이도내꺼야",
        level: "LV18",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#f6FE8060]"
      },
      {
        rank: 3,
        name: "나폴리맛피아",
        level: "LV42",
        activities: "16",
        likes: "24",
        bgColor: "bg-[#ADC8E650]"
      }
    ]
  },
  광진구: {
    name: "광진구",
    logo: logoGwangjin,
    keywords: ["전세대출", "학자금대출", "체크카드", "학생증 발급"],
    hotPosts: [
      {
        type: "예금/적금",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "광진구에서 계좌 개설 어디가 좋을까요?"
      },
      {
        type: "소비",
        date: "2024.10.29 09:15",
        likes: "10개",
        views: "121회",
        content: "광진구에서 저렴한 카페 추천 좀!"
      },
      {
        type: "주식",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "광진구 근처 주식 강의 듣고 싶어요"
      }
    ],
    recentQna: [
      {
        type: "예금/적금",
        date: "2024.10.31 10:31",
        likes: "1개",
        views: "10회",
        content: "청년 우대 통장 관련 문의"
      },
      {
        type: "카드",
        date: "2024.11.03 10:31",
        likes: "1개",
        views: "20회",
        content: "적립형 체크카드 추천 부탁드려요"
      },
      {
        type: "대출",
        date: "2024.11.03 10:31",
        likes: "1개",
        views: "20회",
        content: "대출 추천 문의"
      }
    ],
    topBankers: [
      {
        rank: 1,
        name: "안창살김하나",
        level: "LV24",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#ffC0CB60]",
        showFullProfile: true
      },
      {
        rank: 2,
        name: "별송이내꺼야",
        level: "LV18",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#f6FE8060]"
      },
      {
        rank: 3,
        name: "최강식록",
        level: "LV42",
        activities: "16",
        likes: "24",
        bgColor: "bg-[#ADC8E650]"
      }
    ]
  },
  강서구: {
    name: "강서구",
    logo: null,
    keywords: ["주택청약", "전세대출", "신용대출", "카드"],
    hotPosts: [
      {
        type: "예금/적금",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "강서구에서 계좌 개설 어디가 좋을까요?"
      },
      {
        type: "소비",
        date: "2024.10.29 09:15",
        likes: "10개",
        views: "121회",
        content: "강서구에서 저렴한 카페 추천 좀!"
      },
      {
        type: "주식",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "강서구 근처 주식 강의 듣고 싶어요"
      }
    ],
    recentQna: [
      {
        type: "예금/적금",
        date: "2024.10.31 10:31",
        likes: "1개",
        views: "10회",
        content: "강서구 청년 우대 통장 관련 문의"
      },
      {
        type: "카드",
        date: "2024.11.03 10:31",
        likes: "1개",
        views: "20회",
        content: "적립형 체크카드 추천 부탁드려요"
      },
      {
        type: "대출",
        date: "2024.11.03 10:31",
        likes: "1개",
        views: "20회",
        content: "대출 추천 문의"
      }
    ],
    topBankers: [
      {
        rank: 1,
        name: "보섭살김하나",
        level: "LV24",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#ffC0CB60]",
        showFullProfile: true
      },
      {
        rank: 2,
        name: "별돌이도내꺼야",
        level: "LV18",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#f6FE8060]"
      },
      {
        rank: 3,
        name: "나폴리맛피아",
        level: "LV42",
        activities: "16",
        likes: "24",
        bgColor: "bg-[#ADC8E650]"
      }
    ]
  },
  성동구: {
    name: "성동구",
    logo: null,
    keywords: ["전세대출", "학자금대출", "체크카드", "학생증 발급"],
    hotPosts: [
      {
        type: "예금/적금",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "성동구에서 계좌 개설 어디가 좋을까요?"
      },
      {
        type: "소비",
        date: "2024.10.29 09:15",
        likes: "10개",
        views: "121회",
        content: "성동구에서 저렴한 카페 추천 좀!"
      },
      {
        type: "주식",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "성동구 근처 주식 강의 듣고 싶어요"
      }
    ],
    recentQna: [
      {
        type: "예금/적금",
        date: "2024.10.31 10:31",
        likes: "1개",
        views: "10회",
        content: "청년 우대 통장 관련 문의"
      },
      {
        type: "카드",
        date: "2024.11.03 10:31",
        likes: "1개",
        views: "20회",
        content: "적립형 체크카드 추천 부탁드려요"
      },
      {
        type: "대출",
        date: "2024.11.03 10:31",
        likes: "1개",
        views: "20회",
        content: "대출 추천 문의"
      }
    ],
    topBankers: [
      {
        rank: 1,
        name: "안창살김하나",
        level: "LV24",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#ffC0CB60]",
        showFullProfile: true
      },
      {
        rank: 2,
        name: "별송이내꺼야",
        level: "LV18",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#f6FE8060]"
      },
      {
        rank: 3,
        name: "최강식록",
        level: "LV42",
        activities: "16",
        likes: "24",
        bgColor: "bg-[#ADC8E650]"
      }
    ]
  },
  강남구: {
    name: "강남구",
    logo: null,
    isRegulationArea: true,
    keywords: ["주식투자", "부동산", "자산관리", "펀드"],
    hotPosts: [
      {
        type: "대출",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "강남구에서 전세자금 대출 상담 잘해주는 곳"
      },
      {
        type: "소비",
        date: "2024.10.29 09:15",
        likes: "10개",
        views: "121회",
        content: "강남구 맛집 리스트 공유해요"
      },
      {
        type: "주식",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "강남구 사람들 주식 어떤 종목 투자해요?"
      }
    ],
    recentQna: [
      {
        type: "대출",
        date: "2024.10.31 10:31",
        likes: "1개",
        views: "10회",
        content: "사업자 대출 조건이 궁금합니다"
      },
      {
        type: "외환",
        date: "2024.11.03 10:31",
        likes: "1개",
        views: "20회",
        content: "외화 통장 개설 관련 문의"
      }
    ],
    topBankers: [
      {
        rank: 1,
        name: "보섭살김하나",
        level: "LV24",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#ffC0CB60]",
        showFullProfile: true
      },
      {
        rank: 2,
        name: "별돌이도내꺼야",
        level: "LV18",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#f6FE8060]"
      },
      {
        rank: 3,
        name: "나폴리맛피아",
        level: "LV42",
        activities: "16",
        likes: "24",
        bgColor: "bg-[#ADC8E650]"
      }
    ]
  },
  송파구: {
    name: "송파구",
    logo: null,
    isRegulationArea: true,
    keywords: ["주택청약", "전세대출", "주택담보대출", "재테크"],
    hotPosts: [
      {
        type: "대출",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "송파구에서 전세자금 대출 상담 잘해주는 곳"
      },
      {
        type: "소비",
        date: "2024.10.29 09:15",
        likes: "10개",
        views: "121회",
        content: "송파구 맛집 리스트 공유해요"
      },
      {
        type: "주식",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "송파구 사람들 주식 어떤 종목 투자해요?"
      }
    ],
    recentQna: [
      {
        type: "대출",
        date: "2024.10.31 10:31",
        likes: "1개",
        views: "10회",
        content: "사업자 대출 조건이 궁금합니다"
      },
      {
        type: "외환",
        date: "2024.11.03 10:31",
        likes: "1개",
        views: "20회",
        content: "외화 통장 개설 관련 문의"
      }
    ],
    topBankers: [
      {
        rank: 1,
        name: "보섭살김하나",
        level: "LV24",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#ffC0CB60]",
        showFullProfile: true
      },
      {
        rank: 2,
        name: "별돌이도내꺼야",
        level: "LV18",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#f6FE8060]"
      },
      {
        rank: 3,
        name: "나폴리맛피아",
        level: "LV42",
        activities: "16",
        likes: "24",
        bgColor: "bg-[#ADC8E650]"
      }
    ]
  },
  양천구: {
    name: "양천구",
    logo: null,
    keywords: ["주택담보대출", "전세자금", "청년우대", "적금"],
    hotPosts: [
      {
        type: "예금/적금",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "양천구에서 계좌 개설 어디가 좋을까요?"
      },
      {
        type: "소비",
        date: "2024.10.29 09:15",
        likes: "10개",
        views: "121회",
        content: "양천구에서 저렴한 카페 추천 좀!"
      },
      {
        type: "주식",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "양천구 근처 주식 강의 듣고 싶어요"
      }
    ],
    recentQna: [
      {
        type: "예금/적금",
        date: "2024.10.31 10:31",
        likes: "1개",
        views: "10회",
        content: "양천구 청년 우대 통장 관련 문의"
      },
      {
        type: "카드",
        date: "2024.11.03 10:31",
        likes: "1개",
        views: "20회",
        content: "적립형 체크카드 추천 부탁드려요"
      },
      {
        type: "대출",
        date: "2024.11.03 10:31",
        likes: "1개",
        views: "20회",
        content: "대출 추천 문의"
      }
    ],
    topBankers: [
      {
        rank: 1,
        name: "보섭살김하나",
        level: "LV24",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#ffC0CB60]",
        showFullProfile: true
      },
      {
        rank: 2,
        name: "별돌이도내꺼야",
        level: "LV18",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#f6FE8060]"
      },
      {
        rank: 3,
        name: "나폴리맛피아",
        level: "LV42",
        activities: "16",
        likes: "24",
        bgColor: "bg-[#ADC8E650]"
      }
    ]
  },
  구로구: {
    name: "구로구",
    logo: null,
    keywords: ["주택청약", "대출상담", "카드발급", "예금"],
    hotPosts: [
      {
        type: "예금/적금",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "구로구에서 계좌 개설 어디가 좋을까요?"
      },
      {
        type: "소비",
        date: "2024.10.29 09:15",
        likes: "10개",
        views: "121회",
        content: "구로구에서 저렴한 카페 추천 좀!"
      },
      {
        type: "주식",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "구로구 근처 주식 강의 듣고 싶어요"
      }
    ],
    recentQna: [
      {
        type: "예금/적금",
        date: "2024.10.31 10:31",
        likes: "1개",
        views: "10회",
        content: "구로구 청년 우대 통장 관련 문의"
      },
      {
        type: "카드",
        date: "2024.11.03 10:31",
        likes: "1개",
        views: "20회",
        content: "적립형 체크카드 추천 부탁드려요"
      },
      {
        type: "대출",
        date: "2024.11.03 10:31",
        likes: "1개",
        views: "20회",
        content: "대출 추천 문의"
      }
    ],
    topBankers: [
      {
        rank: 1,
        name: "보섭살김하나",
        level: "LV24",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#ffC0CB60]",
        showFullProfile: true
      },
      {
        rank: 2,
        name: "별돌이도내꺼야",
        level: "LV18",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#f6FE8060]"
      },
      {
        rank: 3,
        name: "나폴리맛피아",
        level: "LV42",
        activities: "16",
        likes: "24",
        bgColor: "bg-[#ADC8E650]"
      }
    ]
  },
  금천구: {
    name: "금천구",
    logo: null,
    keywords: ["전세대출", "신용대출", "카드", "적금"],
    hotPosts: [
      {
        type: "예금/적금",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "금천구에서 계좌 개설 어디가 좋을까요?"
      },
      {
        type: "소비",
        date: "2024.10.29 09:15",
        likes: "10개",
        views: "121회",
        content: "금천구에서 저렴한 카페 추천 좀!"
      },
      {
        type: "주식",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "금천구 근처 주식 강의 듣고 싶어요"
      }
    ],
    recentQna: [
      {
        type: "예금/적금",
        date: "2024.10.31 10:31",
        likes: "1개",
        views: "10회",
        content: "금천구 청년 우대 통장 관련 문의"
      },
      {
        type: "카드",
        date: "2024.11.03 10:31",
        likes: "1개",
        views: "20회",
        content: "적립형 체크카드 추천 부탁드려요"
      },
      {
        type: "대출",
        date: "2024.11.03 10:31",
        likes: "1개",
        views: "20회",
        content: "대출 추천 문의"
      }
    ],
    topBankers: [
      {
        rank: 1,
        name: "보섭살김하나",
        level: "LV24",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#ffC0CB60]",
        showFullProfile: true
      },
      {
        rank: 2,
        name: "별돌이도내꺼야",
        level: "LV18",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#f6FE8060]"
      },
      {
        rank: 3,
        name: "나폴리맛피아",
        level: "LV42",
        activities: "16",
        likes: "24",
        bgColor: "bg-[#ADC8E650]"
      }
    ]
  },
  영등포구: {
    name: "영등포구",
    logo: null,
    keywords: ["주식투자", "펀드", "자산관리", "대출"],
    hotPosts: [
      {
        type: "대출",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "영등포구에서 전세자금 대출 상담 잘해주는 곳"
      },
      {
        type: "소비",
        date: "2024.10.29 09:15",
        likes: "10개",
        views: "121회",
        content: "영등포구에서 저렴한 카페 추천 좀!"
      },
      {
        type: "주식",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "영등포구 근처 주식 강의 듣고 싶어요"
      }
    ],
    recentQna: [
      {
        type: "대출",
        date: "2024.10.31 10:31",
        likes: "1개",
        views: "10회",
        content: "사업자 대출 조건이 궁금합니다"
      },
      {
        type: "외환",
        date: "2024.11.03 10:31",
        likes: "1개",
        views: "20회",
        content: "외화 통장 개설 관련 문의"
      }
    ],
    topBankers: [
      {
        rank: 1,
        name: "보섭살김하나",
        level: "LV24",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#ffC0CB60]",
        showFullProfile: true
      },
      {
        rank: 2,
        name: "별돌이도내꺼야",
        level: "LV18",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#f6FE8060]"
      },
      {
        rank: 3,
        name: "최강식록",
        level: "LV42",
        activities: "16",
        likes: "24",
        bgColor: "bg-[#ADC8E650]"
      }
    ]
  },
  동작구: {
    name: "동작구",
    logo: null,
    keywords: ["청년우대", "전세대출", "카드", "적금"],
    hotPosts: [
      {
        type: "대출",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "동작구에서 전세자금 대출 상담 잘해주는 곳"
      },
      {
        type: "소비",
        date: "2024.10.29 09:15",
        likes: "10개",
        views: "121회",
        content: "동작구에서 저렴한 카페 추천 좀!"
      },
      {
        type: "주식",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "동작구 근처 주식 강의 듣고 싶어요"
      }
    ],
    recentQna: [
      {
        type: "대출",
        date: "2024.10.31 10:31",
        likes: "1개",
        views: "10회",
        content: "사업자 대출 조건이 궁금합니다"
      },
      {
        type: "외환",
        date: "2024.11.03 10:31",
        likes: "1개",
        views: "20회",
        content: "외화 통장 개설 관련 문의"
      }
    ],
    topBankers: [
      {
        rank: 1,
        name: "보섭살김하나",
        level: "LV24",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#ffC0CB60]",
        showFullProfile: true
      },
      {
        rank: 2,
        name: "별돌이도내꺼야",
        level: "LV18",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#f6FE8060]"
      },
      {
        rank: 3,
        name: "최강식록",
        level: "LV42",
        activities: "16",
        likes: "24",
        bgColor: "bg-[#ADC8E650]"
      }
    ]
  },
  관악구: {
    name: "관악구",
    logo: null,
    keywords: ["학자금대출", "청년우대", "카드", "적금"],
    hotPosts: [
      {
        type: "대출",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "관악구에서 전세자금 대출 상담 잘해주는 곳"
      },
      {
        type: "소비",
        date: "2024.10.29 09:15",
        likes: "10개",
        views: "121회",
        content: "관악구에서 저렴한 카페 추천 좀!"
      },
      {
        type: "주식",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "관악구 근처 주식 강의 듣고 싶어요"
      }
    ],
    recentQna: [
      {
        type: "대출",
        date: "2024.10.31 10:31",
        likes: "1개",
        views: "10회",
        content: "사업자 대출 조건이 궁금합니다"
      },
      {
        type: "외환",
        date: "2024.11.03 10:31",
        likes: "1개",
        views: "20회",
        content: "외화 통장 개설 관련 문의"
      }
    ],
    topBankers: [
      {
        rank: 1,
        name: "보섭살김하나",
        level: "LV24",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#ffC0CB60]",
        showFullProfile: true
      },
      {
        rank: 2,
        name: "별돌이도내꺼야",
        level: "LV18",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#f6FE8060]"
      },
      {
        rank: 3,
        name: "최강식록",
        level: "LV42",
        activities: "16",
        likes: "24",
        bgColor: "bg-[#ADC8E650]"
      }
    ]
  },
  마포구: {
    name: "마포구",
    logo: null,
    keywords: ["청년우대", "전세대출", "카드", "적금"],
    hotPosts: [
      {
        type: "대출",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "마포구에서 전세자금 대출 상담 잘해주는 곳"
      },
      {
        type: "소비",
        date: "2024.10.29 09:15",
        likes: "10개",
        views: "121회",
        content: "마포구에서 저렴한 카페 추천 좀!"
      },
      {
        type: "주식",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "마포구 근처 주식 강의 듣고 싶어요"
      }
    ],
    recentQna: [
      {
        type: "대출",
        date: "2024.10.31 10:31",
        likes: "1개",
        views: "10회",
        content: "사업자 대출 조건이 궁금합니다"
      },
      {
        type: "외환",
        date: "2024.11.03 10:31",
        likes: "1개",
        views: "20회",
        content: "외화 통장 개설 관련 문의"
      }
    ],
    topBankers: [
      {
        rank: 1,
        name: "보섭살김하나",
        level: "LV24",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#ffC0CB60]",
        showFullProfile: true
      },
      {
        rank: 2,
        name: "별돌이도내꺼야",
        level: "LV18",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#f6FE8060]"
      },
      {
        rank: 3,
        name: "최강식록",
        level: "LV42",
        activities: "16",
        likes: "24",
        bgColor: "bg-[#ADC8E650]"
      }
    ]
  },
  서대문구: {
    name: "서대문구",
    logo: null,
    keywords: ["학자금대출", "청년우대", "카드", "적금"],
    hotPosts: [
      {
        type: "대출",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "서대문구에서 전세자금 대출 상담 잘해주는 곳"
      },
      {
        type: "소비",
        date: "2024.10.29 09:15",
        likes: "10개",
        views: "121회",
        content: "서대문구에서 저렴한 카페 추천 좀!"
      },
      {
        type: "주식",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "서대문구 근처 주식 강의 듣고 싶어요"
      }
    ],
    recentQna: [
      {
        type: "대출",
        date: "2024.10.31 10:31",
        likes: "1개",
        views: "10회",
        content: "사업자 대출 조건이 궁금합니다"
      },
      {
        type: "외환",
        date: "2024.11.03 10:31",
        likes: "1개",
        views: "20회",
        content: "외화 통장 개설 관련 문의"
      }
    ],
    topBankers: [
      {
        rank: 1,
        name: "보섭살김하나",
        level: "LV24",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#ffC0CB60]",
        showFullProfile: true
      },
      {
        rank: 2,
        name: "별돌이도내꺼야",
        level: "LV18",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#f6FE8060]"
      },
      {
        rank: 3,
        name: "최강식록",
        level: "LV42",
        activities: "16",
        likes: "24",
        bgColor: "bg-[#ADC8E650]"
      }
    ]
  },
  은평구: {
    name: "은평구",
    logo: null,
    keywords: ["주택청약", "전세대출", "카드", "적금"],
    hotPosts: [
      {
        type: "대출",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "은평구에서 전세자금 대출 상담 잘해주는 곳"
      },
      {
        type: "소비",
        date: "2024.10.29 09:15",
        likes: "10개",
        views: "121회",
        content: "은평구에서 저렴한 카페 추천 좀!"
      },
      {
        type: "주식",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "은평구 근처 주식 강의 듣고 싶어요"
      }
    ],
    recentQna: [
      {
        type: "대출",
        date: "2024.10.31 10:31",
        likes: "1개",
        views: "10회",
        content: "사업자 대출 조건이 궁금합니다"
      },
      {
        type: "외환",
        date: "2024.11.03 10:31",
        likes: "1개",
        views: "20회",
        content: "외화 통장 개설 관련 문의"
      }
    ],
    topBankers: [
      {
        rank: 1,
        name: "보섭살김하나",
        level: "LV24",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#ffC0CB60]",
        showFullProfile: true
      },
      {
        rank: 2,
        name: "별돌이도내꺼야",
        level: "LV18",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#f6FE8060]"
      },
      {
        rank: 3,
        name: "최강식록",
        level: "LV42",
        activities: "16",
        likes: "24",
        bgColor: "bg-[#ADC8E650]"
      }
    ]
  },
  종로구: {
    name: "종로구",
    logo: null,
    keywords: ["자산관리", "펀드", "외환", "투자"],
    hotPosts: [
      {
        type: "대출",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "종로구에서 전세자금 대출 상담 잘해주는 곳"
      },
      {
        type: "소비",
        date: "2024.10.29 09:15",
        likes: "10개",
        views: "121회",
        content: "종로구에서 저렴한 카페 추천 좀!"
      },
      {
        type: "주식",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "종로구 근처 주식 강의 듣고 싶어요"
      }
    ],
    recentQna: [
      {
        type: "대출",
        date: "2024.10.31 10:31",
        likes: "1개",
        views: "10회",
        content: "사업자 대출 조건이 궁금합니다"
      },
      {
        type: "외환",
        date: "2024.11.03 10:31",
        likes: "1개",
        views: "20회",
        content: "외화 통장 개설 관련 문의"
      }
    ],
    topBankers: [
      {
        rank: 1,
        name: "보섭살김하나",
        level: "LV24",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#ffC0CB60]",
        showFullProfile: true
      },
      {
        rank: 2,
        name: "별돌이도내꺼야",
        level: "LV18",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#f6FE8060]"
      },
      {
        rank: 3,
        name: "최강식록",
        level: "LV42",
        activities: "16",
        likes: "24",
        bgColor: "bg-[#ADC8E650]"
      }
    ]
  },
  성북구: {
    name: "성북구",
    logo: null,
    keywords: ["학자금대출", "청년우대", "카드", "적금"],
    hotPosts: [
      {
        type: "대출",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "성북구에서 전세자금 대출 상담 잘해주는 곳"
      },
      {
        type: "소비",
        date: "2024.10.29 09:15",
        likes: "10개",
        views: "121회",
        content: "성북구에서 저렴한 카페 추천 좀!"
      },
      {
        type: "주식",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "성북구 근처 주식 강의 듣고 싶어요"
      }
    ],
    recentQna: [
      {
        type: "대출",
        date: "2024.10.31 10:31",
        likes: "1개",
        views: "10회",
        content: "사업자 대출 조건이 궁금합니다"
      },
      {
        type: "외환",
        date: "2024.11.03 10:31",
        likes: "1개",
        views: "20회",
        content: "외화 통장 개설 관련 문의"
      }
    ],
    topBankers: [
      {
        rank: 1,
        name: "보섭살김하나",
        level: "LV24",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#ffC0CB60]",
        showFullProfile: true
      },
      {
        rank: 2,
        name: "별돌이도내꺼야",
        level: "LV18",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#f6FE8060]"
      },
      {
        rank: 3,
        name: "최강식록",
        level: "LV42",
        activities: "16",
        likes: "24",
        bgColor: "bg-[#ADC8E650]"
      }
    ]
  },
  동대문구: {
    name: "동대문구",
    logo: null,
    keywords: ["전세대출", "신용대출", "카드", "적금"],
    hotPosts: [
      {
        type: "대출",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "동대문구에서 전세자금 대출 상담 잘해주는 곳"
      },
      {
        type: "소비",
        date: "2024.10.29 09:15",
        likes: "10개",
        views: "121회",
        content: "동대문구에서 저렴한 카페 추천 좀!"
      },
      {
        type: "주식",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "동대문구 근처 주식 강의 듣고 싶어요"
      }
    ],
    recentQna: [
      {
        type: "대출",
        date: "2024.10.31 10:31",
        likes: "1개",
        views: "10회",
        content: "사업자 대출 조건이 궁금합니다"
      },
      {
        type: "외환",
        date: "2024.11.03 10:31",
        likes: "1개",
        views: "20회",
        content: "외화 통장 개설 관련 문의"
      }
    ],
    topBankers: [
      {
        rank: 1,
        name: "보섭살김하나",
        level: "LV24",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#ffC0CB60]",
        showFullProfile: true
      },
      {
        rank: 2,
        name: "별돌이도내꺼야",
        level: "LV18",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#f6FE8060]"
      },
      {
        rank: 3,
        name: "최강식록",
        level: "LV42",
        activities: "16",
        likes: "24",
        bgColor: "bg-[#ADC8E650]"
      }
    ]
  },
  중구: {
    name: "중구",
    logo: null,
    keywords: ["자산관리", "펀드", "외환", "투자"],
    hotPosts: [
      {
        type: "대출",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "중구에서 전세자금 대출 상담 잘해주는 곳"
      },
      {
        type: "소비",
        date: "2024.10.29 09:15",
        likes: "10개",
        views: "121회",
        content: "중구에서 저렴한 카페 추천 좀!"
      },
      {
        type: "주식",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "중구 근처 주식 강의 듣고 싶어요"
      }
    ],
    recentQna: [
      {
        type: "대출",
        date: "2024.10.31 10:31",
        likes: "1개",
        views: "10회",
        content: "사업자 대출 조건이 궁금합니다"
      },
      {
        type: "외환",
        date: "2024.11.03 10:31",
        likes: "1개",
        views: "20회",
        content: "외화 통장 개설 관련 문의"
      }
    ],
    topBankers: [
      {
        rank: 1,
        name: "보섭살김하나",
        level: "LV24",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#ffC0CB60]",
        showFullProfile: true
      },
      {
        rank: 2,
        name: "별돌이도내꺼야",
        level: "LV18",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#f6FE8060]"
      },
      {
        rank: 3,
        name: "최강식록",
        level: "LV42",
        activities: "16",
        likes: "24",
        bgColor: "bg-[#ADC8E650]"
      }
    ]
  },
  중랑구: {
    name: "중랑구",
    logo: null,
    keywords: ["전세대출", "신용대출", "카드", "적금"],
    hotPosts: [
      {
        type: "대출",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "중랑구에서 전세자금 대출 상담 잘해주는 곳"
      },
      {
        type: "소비",
        date: "2024.10.29 09:15",
        likes: "10개",
        views: "121회",
        content: "중랑구에서 저렴한 카페 추천 좀!"
      },
      {
        type: "주식",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "중랑구 근처 주식 강의 듣고 싶어요"
      }
    ],
    recentQna: [
      {
        type: "대출",
        date: "2024.10.31 10:31",
        likes: "1개",
        views: "10회",
        content: "사업자 대출 조건이 궁금합니다"
      },
      {
        type: "외환",
        date: "2024.11.03 10:31",
        likes: "1개",
        views: "20회",
        content: "외화 통장 개설 관련 문의"
      }
    ],
    topBankers: [
      {
        rank: 1,
        name: "보섭살김하나",
        level: "LV24",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#ffC0CB60]",
        showFullProfile: true
      },
      {
        rank: 2,
        name: "별돌이도내꺼야",
        level: "LV18",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#f6FE8060]"
      },
      {
        rank: 3,
        name: "최강식록",
        level: "LV42",
        activities: "16",
        likes: "24",
        bgColor: "bg-[#ADC8E650]"
      }
    ]
  },
  용산구: {
    name: "용산구",
    logo: null,
    isRegulationArea: true,
    keywords: ["자산관리", "펀드", "외환", "투자"],
    hotPosts: [
      {
        type: "대출",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "용산구에서 전세자금 대출 상담 잘해주는 곳"
      },
      {
        type: "소비",
        date: "2024.10.29 09:15",
        likes: "10개",
        views: "121회",
        content: "용산구에서 저렴한 카페 추천 좀!"
      },
      {
        type: "주식",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "용산구 근처 주식 강의 듣고 싶어요"
      }
    ],
    recentQna: [
      {
        type: "대출",
        date: "2024.10.31 10:31",
        likes: "1개",
        views: "10회",
        content: "사업자 대출 조건이 궁금합니다"
      },
      {
        type: "외환",
        date: "2024.11.03 10:31",
        likes: "1개",
        views: "20회",
        content: "외화 통장 개설 관련 문의"
      }
    ],
    topBankers: [
      {
        rank: 1,
        name: "보섭살김하나",
        level: "LV24",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#ffC0CB60]",
        showFullProfile: true
      },
      {
        rank: 2,
        name: "별돌이도내꺼야",
        level: "LV18",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#f6FE8060]"
      },
      {
        rank: 3,
        name: "최강식록",
        level: "LV42",
        activities: "16",
        likes: "24",
        bgColor: "bg-[#ADC8E650]"
      }
    ]
  },
  강북구: {
    name: "강북구",
    logo: null,
    keywords: ["주택청약", "전세대출", "카드", "적금"],
    hotPosts: [
      {
        type: "대출",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "강북구에서 전세자금 대출 상담 잘해주는 곳"
      },
      {
        type: "소비",
        date: "2024.10.29 09:15",
        likes: "10개",
        views: "121회",
        content: "강북구에서 저렴한 카페 추천 좀!"
      },
      {
        type: "주식",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "강북구 근처 주식 강의 듣고 싶어요"
      }
    ],
    recentQna: [
      {
        type: "대출",
        date: "2024.10.31 10:31",
        likes: "1개",
        views: "10회",
        content: "사업자 대출 조건이 궁금합니다"
      },
      {
        type: "외환",
        date: "2024.11.03 10:31",
        likes: "1개",
        views: "20회",
        content: "외화 통장 개설 관련 문의"
      }
    ],
    topBankers: [
      {
        rank: 1,
        name: "보섭살김하나",
        level: "LV24",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#ffC0CB60]",
        showFullProfile: true
      },
      {
        rank: 2,
        name: "별돌이도내꺼야",
        level: "LV18",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#f6FE8060]"
      },
      {
        rank: 3,
        name: "최강식록",
        level: "LV42",
        activities: "16",
        likes: "24",
        bgColor: "bg-[#ADC8E650]"
      }
    ]
  },
  도봉구: {
    name: "도봉구",
    logo: null,
    keywords: ["주택청약", "전세대출", "카드", "적금"],
    hotPosts: [
      {
        type: "대출",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "도봉구에서 전세자금 대출 상담 잘해주는 곳"
      },
      {
        type: "소비",
        date: "2024.10.29 09:15",
        likes: "10개",
        views: "121회",
        content: "도봉구에서 저렴한 카페 추천 좀!"
      },
      {
        type: "주식",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "도봉구 근처 주식 강의 듣고 싶어요"
      }
    ],
    recentQna: [
      {
        type: "대출",
        date: "2024.10.31 10:31",
        likes: "1개",
        views: "10회",
        content: "사업자 대출 조건이 궁금합니다"
      },
      {
        type: "외환",
        date: "2024.11.03 10:31",
        likes: "1개",
        views: "20회",
        content: "외화 통장 개설 관련 문의"
      }
    ],
    topBankers: [
      {
        rank: 1,
        name: "보섭살김하나",
        level: "LV24",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#ffC0CB60]",
        showFullProfile: true
      },
      {
        rank: 2,
        name: "별돌이도내꺼야",
        level: "LV18",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#f6FE8060]"
      },
      {
        rank: 3,
        name: "최강식록",
        level: "LV42",
        activities: "16",
        likes: "24",
        bgColor: "bg-[#ADC8E650]"
      }
    ]
  },
  노원구: {
    name: "노원구",
    logo: null,
    keywords: ["학자금대출", "청년우대", "카드", "적금"],
    hotPosts: [
      {
        type: "대출",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "노원구에서 전세자금 대출 상담 잘해주는 곳"
      },
      {
        type: "소비",
        date: "2024.10.29 09:15",
        likes: "10개",
        views: "121회",
        content: "노원구에서 저렴한 카페 추천 좀!"
      },
      {
        type: "주식",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "노원구 근처 주식 강의 듣고 싶어요"
      }
    ],
    recentQna: [
      {
        type: "대출",
        date: "2024.10.31 10:31",
        likes: "1개",
        views: "10회",
        content: "사업자 대출 조건이 궁금합니다"
      },
      {
        type: "외환",
        date: "2024.11.03 10:31",
        likes: "1개",
        views: "20회",
        content: "외화 통장 개설 관련 문의"
      }
    ],
    topBankers: [
      {
        rank: 1,
        name: "보섭살김하나",
        level: "LV24",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#ffC0CB60]",
        showFullProfile: true
      },
      {
        rank: 2,
        name: "별돌이도내꺼야",
        level: "LV18",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#f6FE8060]"
      },
      {
        rank: 3,
        name: "최강식록",
        level: "LV42",
        activities: "16",
        likes: "24",
        bgColor: "bg-[#ADC8E650]"
      }
    ]
  },
  강동구: {
    name: "강동구",
    logo: null,
    keywords: ["주택청약", "전세대출", "카드", "적금"],
    hotPosts: [
      {
        type: "대출",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "강동구에서 전세자금 대출 상담 잘해주는 곳"
      },
      {
        type: "소비",
        date: "2024.10.29 09:15",
        likes: "10개",
        views: "121회",
        content: "강동구에서 저렴한 카페 추천 좀!"
      },
      {
        type: "주식",
        date: "2024.10.30 10:31",
        likes: "25개",
        views: "212회",
        content: "강동구 근처 주식 강의 듣고 싶어요"
      }
    ],
    recentQna: [
      {
        type: "대출",
        date: "2024.10.31 10:31",
        likes: "1개",
        views: "10회",
        content: "사업자 대출 조건이 궁금합니다"
      },
      {
        type: "외환",
        date: "2024.11.03 10:31",
        likes: "1개",
        views: "20회",
        content: "외화 통장 개설 관련 문의"
      }
    ],
    topBankers: [
      {
        rank: 1,
        name: "보섭살김하나",
        level: "LV24",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#ffC0CB60]",
        showFullProfile: true
      },
      {
        rank: 2,
        name: "별돌이도내꺼야",
        level: "LV18",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#f6FE8060]"
      },
      {
        rank: 3,
        name: "최강식록",
        level: "LV42",
        activities: "16",
        likes: "24",
        bgColor: "bg-[#ADC8E650]"
      }
    ]
  }
}; 