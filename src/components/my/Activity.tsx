import { useSelector } from 'react-redux';
import { RootState } from '../../hoc/store';
import { Layout } from 'antd';
import {
  HeartOutlined,
  MessageOutlined,
  CommentOutlined,
} from '@ant-design/icons';
import star4 from '../../assets/img/stars/star4.png';

const { Content } = Layout;

/* 내 정보 및 이 주의 활약 */
const Activity: React.FC = () => {
  const userRole = useSelector((state: RootState) => state.auth.userRole);

  return (
    <Content>
      <div style={{ display: 'flex', gap: '30px' }}>
        <div
          style={{
            width: '100%',
            backgroundColor: '#f5f5f5',
            padding: '24px',
            borderRadius: '24px',
          }}
        >
          <div
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              marginBottom: '15px',
            }}
          >
            내 정보
          </div>
          <div
            style={{ paddingTop:'30px', display: 'flex', gap: '10px', justifyContent:'space-between', alignItems:'center', fontSize: '16px'}}
          >
            <div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center', gap:'18px'}}>
              <HeartOutlined /> 
              <p>{userRole=='C'?'좋아요':'도움돼요'} <span id="likes-count" className='text-mainColor'>53</span></p>
            </div>
            <div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center', gap:'18px'}}>
              <MessageOutlined /> 
              <p>답변수 <span id="answers-count" className='text-mainColor'>5</span></p>
            </div>
            <div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center', gap:'18px'}}>
              <CommentOutlined /> 
              <p>댓글수 <span id="comments-count" className='text-mainColor'>34</span></p>
            </div>
          </div>
        </div>
        <div
          style={{
            width: '100%',
            backgroundColor: '#f5f5f5',
            padding: '24px',
            borderRadius: '24px',
          }}
        >
          <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
            이 주의 활약
          </div>
          <div className="flex justify-center">
            <img className="h-40" src={star4} alt="star4" />
          </div>
        </div>
      </div>
    </Content>
  );
};

export default Activity;
