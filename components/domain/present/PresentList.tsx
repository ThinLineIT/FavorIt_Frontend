import styled from '@emotion/styled';
import Image from 'next/image';
import { PresentType } from '@apis/@types/present';
import { Dispatch, SetStateAction } from 'react';

const PresentList = ({
  presentRow,
  setPresent,
}: {
  presentRow: Array<PresentType>;
  setPresent: Dispatch<SetStateAction<PresentType | null>>;
}) => {
  return (
    <ImageRowWrapper>
      {presentRow &&
        presentRow.map((present: PresentType, index: number) => {
          if (index % 3 == 0)
            return (
              <LeftPolaroid key={index} onClick={() => setPresent(present)}>
                <LeftContent>
                  {present.image && (
                    <Image
                      src={present.image}
                      width={'45%'}
                      height={'45%'}
                      alt="gift-image"
                      className="center"
                    />
                  )}
                  <FromName>{present.from_name}</FromName>
                </LeftContent>
              </LeftPolaroid>
            );
          else if (index % 3 == 1)
            return (
              <CenterPolaroid key={index} onClick={() => setPresent(present)}>
                <CenterContent>
                  {present.image && (
                    <Image
                      src={present.image}
                      width={'45%'}
                      height={'45%'}
                      alt="gift-image"
                      className="center"
                    />
                  )}
                  <FromName>{present.from_name}</FromName>
                </CenterContent>
              </CenterPolaroid>
            );
          else
            return (
              <RightPolaroid key={index} onClick={() => setPresent(present)}>
                <RightContent>
                  {present.image && (
                    <Image
                      src={present.image}
                      width={'45%'}
                      height={'45%'}
                      alt="gift-image"
                      className="center"
                    />
                  )}
                  <FromName>{present.from_name}</FromName>
                </RightContent>
              </RightPolaroid>
            );
        })}
    </ImageRowWrapper>
  );
};

const FromName = styled.div`
  margin-top: 15px;
  overflow: hidden;
  margin-top: 15px;
  width: 75%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  white-space: nowrap;
`;

const ImageRowWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 130px 130px 130px;
  gap: 10px 8px;
  padding: 5% 4% 0 8%;
  font-weight: 700;
  font-size: 11px;
`;

const RightText = styled.span`
  left: 50%;
  position: absolute;
  bottom: 17%;
  transform: rotate(7deg) translateX(-50%);
  width: 85%;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CenterText = styled.span`
  left: 53%;
  position: absolute;
  bottom: 23%;
  transform: rotate(-7deg) translateX(-50%);
  width: 85%;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const LeftContent = styled.div`
  transform: rotate(8deg);
  height: 90%;
  display: flex;
  flex-direction: column;
  width: 80%;
  justify-content: end;
  align-items: center;
  margin: 0 auto;
  padding-bottom: 5px;
`;
const RightContent = styled.div`
  transform: rotate(9deg);
  height: 90%;
  display: flex;
  flex-direction: column;
  width: 80%;
  justify-content: end;
  align-items: center;
  margin: 0 auto;
  padding-bottom: 5px;
`;
const CenterContent = styled.div`
  transform: rotate(5deg);
  height: 90%;
  display: flex;
  flex-direction: column;
  width: 80%;
  justify-content: end;
  align-items: center;
  margin: 0 auto;
  padding-bottom: 5px;
`;

const LeftText = styled.span`
  left: 50%;
  position: absolute;
  bottom: 15%;
  transform: rotate(7deg) translateX(-50%);
  width: 85%;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const RightPolaroid = styled.div`
  background-image: url('/assets/images/PresentListRightPolaroid.png');
  width: 100%;
  height: 90%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
  position: relative;
`;

const LeftPolaroid = styled.div`
  background-image: url('/assets/images/PresentListLeftPolaroid.png');
  width: 100%;
  height: 90%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
  position: relative;
`;

const CenterPolaroid = styled.div`
  background-image: url('/assets/images/PresentListCenterRotatePolaroid.png');
  width: 100%;
  height: 90%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
  position: relative;
  transform: rotate(-15deg);
`;

export default PresentList;
