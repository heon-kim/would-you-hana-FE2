import { useNavigate } from 'react-router-dom';
import icon_logo from '../../assets/img/icon_logo.png'
import nbbsgi from '../../assets/img/notebook_byulsongi.png'
import bddi from '../../assets/img/byeoldole.png'

const LandingForRegister : React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="h-full flex justify-center items-center">
            <div className="flex-col">
                <div className='flex flex-row justify-between'>
                    <div>
                        <h1
                            style={{
                            color: 'black',
                            fontSize: '30px',
                            lineHeight: '1.3',
                            textAlign: 'left',
                            marginTop: '30px',
                            marginBottom: '40px',
                            fontWeight: 'bold',
                            }}
                        >
                            <p>
                            <span style={{ color: '#008485' }}>우</span>
                            리 
                            <span style={{ color: '#008485' }}> 주</span>
                            변의
                            <br />
                            금융 정보들을
                            <span style={{ color: '#008485' }}> 하나</span>로,
                            <br /> 우주하나
                            </p>
                        </h1>
                    </div>
                    <div>
                        <img src={icon_logo} style={{width:'100px', height:'100px', marginTop:'30px'}}></img>
                    </div>
                    
                </div>
                
                <h2 className='px-3'>회원 유형을 선택해주세요.</h2>
                <div className="flex flex-row justify-center gap-10 p-3 ">
                    <div className="rounded-xl shadow-lg p-3 bg-mainColor"
                    style={{width:'200px', height:'200px'}}
                    onClick={() => navigate('/register/user')}>
                        <h2 className="text-center mb-2">일반 회원</h2>
                        <img src={bddi} style={{display:'block', margin:'auto', width:'90px'}}></img>
                    </div>
                    <div className="rounded-xl shadow-lg p-3"
                    style={{width:'200px', height:'200px'}}
                    onClick={() => navigate('/register/banker')}>
                        <h2 className="text-center mb-2">행원</h2>
                        <img src={nbbsgi} style={{display:'block', margin:'auto'}} className="w-4/5"></img>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default LandingForRegister;