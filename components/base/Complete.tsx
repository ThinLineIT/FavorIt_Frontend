import Image from 'next/image';
import styled from '@emotion/styled';
import FireCracker from '@public/assets/images/FireCracker.png';
import ArrowFatRightMedium from '@public/assets/images/ArrowFatRight-medium.svg';

const Complete = ({
  mainText,
  buttonText,
  method,
}: {
  mainText: string;
  buttonText: string;
  method: () => void;
}) => {
  return (
    <CompletePage>
      <Wrapper>
        <Image src={FireCracker} width={158} height={122} alt="fire" />
        <Title>이거 가지고 싶어요</Title>
        <MainContent>{mainText}</MainContent>
      </Wrapper>
      <Button onClick={method}>
        {buttonText}
        <div style={{ position: 'absolute', right: '26.65px' }}>
          <Image src={ArrowFatRightMedium} width={23} height={19} alt="arrow" />
        </div>
      </Button>
    </CompletePage>
  );
};

const CompletePage = styled.section`
  width: 100%;
  height: 100vh;
  background-color: white;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 25px;
  margin: 10px 0;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  text-align: center;
`;

const MainContent = styled.div`
  font-weight: 400;
  font-size: 20px;
`;

const Button = styled.button`
  width: 80%;
  box-shadow: 0px 0px 9px rgba(231, 231, 231, 0.25),
    inset 0px -2px 9px rgba(0, 0, 0, 0.25);
  font-weight: 700;
  color: #fda2e3;
  font-size: 15px;
  height: 49px;
  border-radius: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 10%;
`;

export default Complete;
