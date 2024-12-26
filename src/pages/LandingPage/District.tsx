import React, { useEffect, useState } from 'react';
import { Row, Col, message } from 'antd';
import { useParams, Navigate } from 'react-router-dom';
import hanaFamilyTogether from '../../assets/img/HanaFamilyTogether.png';
import DistrictBadge from '../../components/landing/DistrictBadge/DistrictBadge';
import RegulationBadge from '../../components/landing/RegulationBadge/RegulationBadge';
import TrendingKeywords from '../../components/landing/TrendingKeywords/TrendingKeywords';
import PopularCard from '../../components/landing/PopularCard/PopularCard';
import TopBanker from '../../components/landing/TopBanker/TopBanker';
import { DISTRICT_DATA } from '../../constants/districtData';
import { districtService } from '../../services/district.service';
import { QnaListDTO } from '../../types/dto/question.dto';
import { CommunityListDTO } from '../../types/dto/community.dto';
import { AxiosResponse } from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../hoc/store';

const District: React.FC = () => {
  const { districtId } = useParams<{ districtId: string }>();
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [latestQuestions, setLatestQuestions] = useState<QnaListDTO[]>();
  const [hotPosts, setHotPost] = useState<CommunityListDTO[]>();
  const { userLocation } = useSelector((state: RootState) => state.auth);


  if (!districtId || !DISTRICT_DATA[districtId]) {
    message.error('존재하지 않는 지역입니다.');
    return <Navigate to="/404" replace />;
  }

  const districtData = DISTRICT_DATA[districtId];

  const getLatest3Questions = async () => {
    if (!userLocation) {
      message.error("위치 정보를 설정하세요.");
      return;
    }

    try {
      const response: AxiosResponse<QnaListDTO[]> = await districtService.getLatest3Questions(userLocation);

      if (response && response.data) {
        setLatestQuestions(response.data);
      } else {
        console.error('Error fetching data: response.data is undefined');
      }
    } catch (err) {
      console.error('Error fetching data:', err);

    }
  }

  const getHot3Post = async () => {
    if (!userLocation) {
      message.error("위치 정보를 설정하세요.");
      return;
    }

    try {
      const response: AxiosResponse<CommunityListDTO[]> = await districtService.getLatest3Post(userLocation);

      if (response && response.data) {
        setHotPost(response.data);
      } else {
        console.error('Error fetching data: response.data is undefined');
      }
    } catch (err) {
      console.error('Error fetching data:', err);

    }
  }


  useEffect(() => {
    getHot3Post();
    getLatest3Questions();
  }, [userLocation]);

  return (
    <div className="w-full pb-5">
      <div className="text-center">
        <Row gutter={[16, 16]} className="bg-[#00848515] h-[600px]">
          <Col span={12}>
            <div className="ml-[100px] flex justify-start">
              <div className="flex gap-8 w-[300px]">
                <DistrictBadge logoSrc={districtData.logo ?? undefined} name={districtData.name} padding="p-4" />
                {districtData.isRegulationArea && <RegulationBadge />}
              </div>
            </div>
            <div className="ml-[150px] mt-9">
              <img
                src={hanaFamilyTogether}
                alt="hanaFamilyTogether"
                className="w-[550px]"
              />
            </div>
          </Col>

          <Col span={12} className="content-center w-full items-end">
            <TrendingKeywords
              carouselIndex={carouselIndex}
              onCarouselChange={setCarouselIndex}
              districtName={districtData.name}
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]} className="px-8 mt-8">
          {hotPosts && (
            <Col xs={24} sm={8}>
              <PopularCard
                title="🔥 HOT 금융 게시물"
                contents={hotPosts}
              />
            </Col>
          )}
          {latestQuestions && (
            <Col xs={24} sm={8}>
              <PopularCard
                title="✒️ 방금 답변이 작성된 Q&A"
                contents={latestQuestions}
              />
            </Col>
          )}

          <Col xs={24} sm={8}>
            <TopBanker bankers={districtData.topBankers} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default District; 