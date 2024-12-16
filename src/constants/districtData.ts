import { DistrictData } from '../types/district';
import logoSeocho from '../assets/img/logo_seocho.png';
import logoGwangjin from '../assets/img/logo_gwangjin.png';

export const DISTRICT_DATA: Record<string, DistrictData> = {
  seocho: {
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
        rank: "🥇",
        name: "보섭살김하나",
        level: "LV24",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#ffC0CB60]",
        showFullProfile: true
      },
      {
        rank: "🥈",
        name: "별돌이도내꺼야",
        level: "LV18",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#f6FE8060]"
      },
      {
        rank: "🥉",
        name: "나폴리맛피아",
        level: "LV42",
        activities: "16",
        likes: "24",
        bgColor: "bg-[#ADC8E650]"
      }
    ]
  },
  gwangjin: {
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
        rank: "🥇",
        name: "안창살김하나",
        level: "LV24",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#ffC0CB60]",
        showFullProfile: true
      },
      {
        rank: "🥈",
        name: "별송이내꺼야",
        level: "LV18",
        activities: "46",
        likes: "89",
        bgColor: "bg-[#f6FE8060]"
      },
      {
        rank: "🥉",
        name: "최강식록",
        level: "LV42",
        activities: "16",
        likes: "24",
        bgColor: "bg-[#ADC8E650]"
      }
    ]
  }
}; 