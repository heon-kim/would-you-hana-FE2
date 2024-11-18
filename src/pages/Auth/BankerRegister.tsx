import React, { useState } from 'react';
import { Banker } from "../../constants/users";
import { saveBanker, findBanker } from '../../utils/userStorage';
import { Form, Input, Button, message, Select } from 'antd';
import { RuleObject } from 'antd/es/form';
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  DownOutlined,
  BankOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Categories } from '../../constants/posts';

interface formProps {
  email: string;
  password: string;
  passwordConfirm: string;
  authNum: number;
  name: string;
  branchName: string;
}

const InputForm: React.FC<{
  setBanker: React.Dispatch<React.SetStateAction<Banker>>;
  setCompleteInputForm: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setBanker, setCompleteInputForm }) => {
  const [sendAuthNum, setSendAuthNum] = useState<boolean>(false);

  const validatePassword = (_: RuleObject, value: string): Promise<void> => {
    const passwordPattern = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#^&*]).{8,}$/;
    if (passwordPattern.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(
      `비밀번호는 최소 8자 이상이고, 영소문자, 숫자, 특수문자(!, @, #, ^, &, *)를 적어도 하나 포함하여야 합니다.`
    );
  };

  const validatePasswordConfirm = (
    _: RuleObject,
    value: string
  ): Promise<void> => {
    if (
      form.getFieldValue('password') &&
      form.getFieldValue('password') !== value
    ) {
      return Promise.reject('비밀번호가 일치하지 않습니다.');
    }
    return Promise.resolve();
  };

  const handleAuthNum = () => {
    if (findBanker(form.getFieldValue('email'))) {
      message.warning('이미 존재하는 이메일입니다.');
      return;
    }
    // Implement your auth number logic here
    setSendAuthNum(true);
  };

  const handleRegister = (values: formProps) => {
    // values 중 authNum과 passwordConfirm은 저장 안함
    const { authNum, passwordConfirm, ...rest } = values;
    // void를 이용해 명시적으로 무시
    void authNum;
    void passwordConfirm;

    setBanker({
      ...rest,
      interests: '',
    });
    setCompleteInputForm(true);
  };

  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      name="bankerRegister"
      onFinish={handleRegister}
      initialValues={{
        email: '',
        password: '',
        passwordConfirm: '',
        authNum: null,
        name: '',
        branchName: '',
      }}
      colon={false}
      size="large"
      scrollToFirstError
    >
      <Form.Item
        // label="이름"
        name="name"
        rules={[{ required: true, message: '이름을 입력해주세요.' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="이름"></Input>
      </Form.Item>

      <Form.Item
        // label="이메일"
        name="email"
        rules={[
          { required: true, message: '이메일을 입력해주세요.' },
          {
            type: 'email',
            message: '올바른 이메일 형식이 아닙니다.',
          },
        ]}
      >
        <div className="flex gap-2">
          <Input prefix={<MailOutlined />} placeholder="이메일" />
          <Button color="default" variant="filled" onClick={handleAuthNum}>
            인증번호 발송
          </Button>
        </div>
      </Form.Item>

      <Form.Item
        // label="인증번호"
        name="authNum"
        rules={[{ required: true, message: '인증번호를 입력해주세요.' }]}
      >
        <Input
          prefix={<MailOutlined />}
          disabled={!sendAuthNum}
          placeholder="인증번호"
        />
      </Form.Item>

      <Form.Item
        // label="비밀번호"
        name="password"
        rules={[
          { required: true, message: '비밀번호를 입력해주세요.' },
          { validator: validatePassword },
        ]}
        hasFeedback
      >
        <Input.Password prefix={<LockOutlined />} placeholder="비밀번호" />
      </Form.Item>

      <Form.Item
        // label="비밀번호 확인"
        name="passwordConfirm"
        rules={[
          { required: true, message: '비밀번호를 확인해주세요.' },
          { validator: validatePasswordConfirm },
        ]}
        hasFeedback
      >
        <Input.Password prefix={<LockOutlined />} placeholder="비밀번호 확인" />
      </Form.Item>

      <Form.Item
        // label="지점명"
        name="branchName"
        rules={[{ required: true, message: '지점명을 입력해주세요.' }]}
      >
        <Input prefix={<BankOutlined />} placeholder="지점명" />
      </Form.Item>

      <Form.Item label={null}>
        <Button block type="primary" htmlType="submit">
          다음
        </Button>
      </Form.Item>
    </Form>
  );
};

const SelectInterest: React.FC<{
  banker: Banker;
  setBanker: React.Dispatch<React.SetStateAction<Banker>>;
}> = ({ banker, setBanker }) => {
  const MAX_COUNT = 3;
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleChange = (value: string[]) => {
    if (value.length <= MAX_COUNT) {
      setSelectedItems(value);
      setBanker((prevBanker) => ({
        ...prevBanker,
        interests: JSON.stringify(value),
      }));
    } else {
      message.warning(`최대 ${MAX_COUNT}개까지 선택할 수 있습니다.`);
    }
  };

  const handleSaveBanker = () => {
    saveBanker(banker);
    message.success('회원가입이 완료되었습니다!');
    navigate('/');
  };

  const suffix = (
    <>
      <span>
        {selectedItems.length} / {MAX_COUNT}
      </span>
      <DownOutlined />
    </>
  );

  return (
    <div className="flex flex-col gap-16 items-center m-auto">
      <h2 className="text-2xl font-bold text-center">WOULD YOU HANA</h2>
      <div className="flex flex-col items-center gap-8 w-80">
        <p>관심 분야를 선택해 주세요!</p>

        <Select
          mode="multiple"
          value={selectedItems}
          style={{ width: '100%' }}
          onChange={handleChange}
          suffixIcon={suffix}
          placeholder="선택"
          options={Categories.map((category) => ({
            label: category,
            value: category,
          }))}
          maxTagCount="responsive"
        />

        <Button
          type="primary"
          onClick={handleSaveBanker}
          disabled={selectedItems.length !== MAX_COUNT}
          className="mt-4"
          block
        >
          완료
        </Button>
      </div>
    </div>
  );
};

const BankerRegister: React.FC = () => {
  const [completeInputForm, setCompleteInputForm] = useState<boolean>(false);
  const [banker, setBanker] = useState<Banker>({
    email: '',
    password: '',
    name: '',
    branchName: '',
    interests: '',
  });

  return (
    <div className="h-fit flex justify-center">
      <div className="w-2/5 h-fit m-10 shadow-lg shadow-gray-300 p-8 flex flex-col gap-6 rounded-md">
        <h2 className="text-lg font-bold text-center">WOULD YOU HANA</h2>
        {completeInputForm ? (
          <SelectInterest banker={banker} setBanker={setBanker} />
        ) : (
          <InputForm
            setBanker={setBanker}
            setCompleteInputForm={setCompleteInputForm}
          />
        )}
      </div>
    </div>
  );
};

export default BankerRegister;
