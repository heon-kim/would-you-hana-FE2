import banker1 from '../assets/img/banker1.png';
import banker2 from '../assets/img/banker2.png';
import banker3 from '../assets/img/banker3.png';
import banker4 from '../assets/img/banker4.png';

export const bankerImages = {
  banker1,
  banker2,
  banker3,
  banker4,
};

export const hashtagLinks: { [key: string]: string } = {
    '#대출': 'https://www.kebhana.com/cont/mall/mall08/mall0805/index.jsp?catId=spb_2821,spb_2822,spb_2823,spb_2824,spb_2825,spb_2826&_menuNo=98786',
    '#주택담보대출': 'https://www.kebhana.com/cont/mall/mall08/mall0805/index.jsp?catId=spb_2821,spb_2822,spb_2823,spb_2824,spb_2825,spb_2826&_menuNo=98786',
    '#전세대출': 'https://www.kebhana.com/cont/mall/mall08/mall0805/index.jsp?catId=spb_2821,spb_2822,spb_2823,spb_2824,spb_2825,spb_2826&_menuNo=98786',
    '#주택청약': 'https://www.kebhana.com/cont/mall/mall08/mall0801/mall080102/1455802_115157.jsp',
    '#내집마련 더블업 적금': 'https://www.kebhana.com/cont/mall/mall08/mall0801/mall080102/1450446_115157.jsp',
    '#주택청약종합저축': 'https://www.kebhana.com/cont/mall/mall08/mall0801/mall080102/1419695_115157.jsp',
    '#적금': 'https://www.kebhana.com/cont/mall/mall08/mall0805/index.jsp?_menuNo=62608',
    '#청년희망적금': 'https://www.kebhana.com/cont/news/news01/1480227_115430.jsp?_menuNo=98835',
    '#급여하나 월복리 적금': 'https://www.kebhana.com/cont/mall/mall08/mall0801/mall080102/1455929_115157.jsp',
    '#압출금': 'https://www.kebhana.com/transfer/index.do',
    '#달달 하나': 'https://www.kebhana.com/cont/mall/mall08/mall0801/mall080103/1497693_115188.jsp',
    '#주거래 하나': 'https://www.kebhana.com/cont/mall/mall08/mall0801/mall080102/1455927_115157.jsp',
    '#연금 하나': 'https://www.kebhana.com/cont/mall/mall08/mall0801/mall080103/1455931_115188.jsp',
};

export const mainProfile = {
    name: '문 보 경',
    title:'RM',
    hashTag: ['#대출', '#주택담보대출', '#전세대출'],
    description: '고객님의 대출을 책임지는 문보경 대리입니다. 광진구 신자양점에서 고객님의 아주 작은 고민까지도 하나만의 대출 솔루션으로 해결해 드리겠습니다.',
};

export const specialists = [
    { name: '홍창기', title: 'PM', hashTag: ['#주택청약', '#내집마련 더블업 적금', '#주택청약종합저축'], description: '주택 청약을 도와드리는 홍창기 차장입니다. 많이 알고 있다고 생각하지만 실제로 보면 헷갈리는 주택청약에 대해서 알려드립니다.',image: bankerImages.banker2 },
    { name: '박해민', title: 'RM', hashTag: ['#적금','#청년희망적금', '#급여하나 월복리 적금'], description: '내 돈을 관리한다는 마음으로 관리해 드리는 박해민 대리입니다. 지금 고객님께 필요한 적금 방법 꼼꼼하게 알려드려요!',image: bankerImages.banker3 },
    { name: '강백호', title: 'RM', hashTag: ['#입출금','#달달 하나', '#주거래 하나', '#연금 하나'], description: '부동산 자산 관리 전문가로서 고객님의 재산을 안전하게 관리해 드립니다.',image: bankerImages.banker4 },
];