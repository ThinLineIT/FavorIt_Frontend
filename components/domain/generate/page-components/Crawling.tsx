import { useSetRecoilState } from 'recoil';
import { isLocalGenerator } from '@recoil/generate';
import styled from '@emotion/styled';
import { flexbox } from '@styles/mixins/_flexbox';

const Crawling = () => {
  const setGenerator = useSetRecoilState(isLocalGenerator);
  const handleClick = () => {
    setGenerator((prev: any) => ({ ...prev, page: prev.page + 1 }));
  };

  return (
    <Base onClick={handleClick}>
      <Input type="text" placeholder="상품 링크를 입력해주세요" />
    </Base>
  );
};

export default Crawling;

const Base = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 10px;
  margin-top: 150px;
  ${flexbox('center', 'start')};
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  border-radius: 12px;
  background-color: #ffffff;
`;
