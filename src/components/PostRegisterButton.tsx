import React from "react";
import { useNavigate } from "react-router-dom";
import iconPencil from '../assets/img/icon_pencil.svg'

const PostRegisterButton: React.FC = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/qna/regist"); // QuestionRegister 경로로 이동
    };

    return (
        <div style={{ backgroundColor: '#F3F5F7', height: '180px', alignContent: 'center', paddingLeft: '20px', paddingRight: '20px', borderRadius: '5px' }}>
            <div style={{ marginBottom: '25px' }}>
                <p style={{ lineHeight: '1.5', fontSize: '18px' }}>찾으시는 질문이 없으신가요?</p>
                <p style={{ lineHeight: '1.9', fontSize: '14px', marginBottom: '10px' }}>이 게시판에 질문해보세요.</p>
            </div>
            <button 
                onClick={handleButtonClick}
                style={{ backgroundColor: '#008485', borderRadius: '5px', width: '100%', color: 'white', height: '50px' }}
            >
                <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <p>질문하기</p>
                <img src={iconPencil}  alt='notebookUser'
              width={20} style={{marginLeft:'3px'}}/>
                </div>
                
            </button>
        </div>
    );
};

export default PostRegisterButton;
