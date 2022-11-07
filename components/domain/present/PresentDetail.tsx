import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';
import ArrowRight from '@public/assets/images/ArrowRight.svg';
import PresentTo from '@public/assets/images/PresentTo.png';
import PresentFrom from '@public/assets/images/PresentFrom.png';
import PresentPrice from '@public/assets/images/PresentPrice.png';
import { PresentType } from '@apis/@types/present';

const PresentItem = ({
  present,
  setPresent,
}: {
  present: PresentType;
  setPresent: Dispatch<SetStateAction<PresentType | null>>;
}) => {
  return (
    <PresentItemCard>
      <BackToList onClick={() => setPresent(null)}>
        <Image src={ArrowRight} width={32} height={32} />
        목록으로 가기
      </BackToList>
      <PresentImage>
        <Image src={present.image} layout="fill" className="present-image" />
      </PresentImage>
      <LetterWrapper>
        <NameWrapper>
          <Image src={PresentTo} width={36} />
          <span>{present.to_name}</span>
        </NameWrapper>
        <div>{present.contents}</div>
        <LetterBottom>
          <NameWrapper style={{ marginBottom: '11px' }}>
            <Image src={PresentFrom} width={71} />
            <span>{present.from_name}</span>
          </NameWrapper>
          <NameWrapper>
            <Image src={PresentPrice} width={69} />{' '}
            <span>{present.amount}원</span>
          </NameWrapper>
        </LetterBottom>
      </LetterWrapper>
    </PresentItemCard>
  );
};

const PresentItemCard = styled.div`
  width: 100%;
  background-color: #ffffff;
  height: 85%;
  margin: 52px auto 0 auto;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
`;

const BackToList = styled.div`
  display: flex;
  align-items: center;
  color: #686868;
  font-size: 16px;
  font-weight: 400;
  padding: 17px 0 18px 17px;
  line-height: 20.57px;
`;

const PresentImage = styled.div`
  width: 91.25%;
  background-color: #bcdfff;
  aspect-ratio: 1 / 1;
  border-radius: 30px;
  margin: 0 auto;
  & > span {
    position: unset !important;
    & .present-image {
      object-fit: contain !important;
      position: relative !important;
      height: auto !important;
    }
  }
`;

const LetterWrapper = styled.div`
  font-weight: 400;
  font-size: 16px;
  width: 100%;
  padding: 25px 32px 28px 32px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  & > span {
    margin-left: 19px;
  
`;

const LetterBottom = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 25%;
`;

export default PresentItem;
