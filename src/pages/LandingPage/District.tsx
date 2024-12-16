import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { useParams, Navigate } from 'react-router-dom';
import hanaFamilyTogether from '../../assets/img/HanaFamilyTogether.png';
import SearchInput from '../../components/common/SearchInput';
import DistrictBadge from '../../components/landing/DistrictBadge/DistrictBadge';
import RegulationBadge from '../../components/landing/RegulationBadge/RegulationBadge';
import TrendingKeywords from '../../components/landing/TrendingKeywords/TrendingKeywords';
import PopularCard from '../../components/landing/PopularCard/PopularCard';
import TopBanker from '../../components/landing/TopBanker/TopBanker';
import { DISTRICT_DATA } from '../../constants/districtData';

const District: React.FC = () => {
  const { districtId } = useParams<{ districtId: string }>();
  const [carouselIndex, setCarouselIndex] = useState(0);

  if (!districtId || !DISTRICT_DATA[districtId]) {
    return <Navigate to="/404" replace />;
  }

  const districtData = DISTRICT_DATA[districtId];

  const onSearch = (value: string) => {
    console.log(value);
  };

  return (
    <div className="w-full pb-5">
      <div className="text-center">
        <Row gutter={[16, 16]} className="bg-[#00848515] h-[600px]">
          <Col span={12}>
            <div className="ml-[100px] flex justify-start">
              <div className="flex gap-8 w-[300px]">
                <DistrictBadge logoSrc={districtData.logo} padding="p-4" />
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
              keywords={districtData.keywords}
              carouselIndex={carouselIndex}
              onCarouselChange={setCarouselIndex}
              districtName={districtData.name}
            />
            <div className="mr-[150px]">
              <SearchInput onSearch={onSearch} />
            </div>
          </Col>
        </Row>

        <Row gutter={[16, 16]} className="bg-white px-8">
          <Col span={24} className="mt-10">
            <h2 className="text-2xl mb-3"></h2>
          </Col>

          <Col xs={24} sm={8}>
            <PopularCard
              title="🔥 HOT 금융 게시물"
              contents={districtData.hotPosts}
            />
          </Col>

          <Col xs={24} sm={8}>
            <PopularCard
              title="✒️ 방금 답변이 작성된 Q&A"
              contents={districtData.recentQna}
            />
          </Col>

          <Col xs={24} sm={8}>
            <TopBanker bankers={districtData.topBankers} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default District; 