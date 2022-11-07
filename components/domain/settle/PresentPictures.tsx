import styled from '@emotion/styled';
import type { PresentType } from '@apis/@types/present';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

// const PresentPictures = ({ pictures }: { pictures: Array<string> }) => {
const PresentPictures = ({
  presentList,
}: {
  presentList: Array<PresentType>;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);
  useEffect(() => {
    timerRef.current = window.setTimeout(() => {
      if (containerRef.current) {
        const max =
          containerRef.current.scrollWidth - containerRef.current.clientWidth;
        containerRef.current.scroll({
          left: max,
          behavior: 'smooth',
        });
      }
    }, 5500);
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);
  return (
    <PictureContainer ref={containerRef}>
      {presentList.length &&
        presentList.map((present: PresentType, index: number) => {
          if (index % 3 == 0)
            return (
              <LeftPolaroid>
                <LeftContent>
                  {present.image && (
                    <Image
                      src={present.image}
                      width={'50%'}
                      height={'50%'}
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
              <CenterPolaroid>
                <CenterContent>
                  {present.image && (
                    <Image
                      src={present.image}
                      width={'50%'}
                      height={'50%'}
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
              <RightPolaroid>
                <RightContent>
                  {present.image && (
                    <Image
                      src={present.image}
                      width={'50%'}
                      height={'50%'}
                      alt="gift-image"
                      className="center"
                    />
                  )}
                  <FromName>{present.from_name}</FromName>
                </RightContent>
              </RightPolaroid>
            );
        })}
    </PictureContainer>
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

const PictureContainer = styled.div`
  display: flex;
  height: 110%;
  overflow-x: auto;
  overflow-y: hidden;
  width: 100%;
  top: -10%;
  position: absolute;
  &::-webkit-scrollbar {
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }
`;

const RightPolaroid = styled.div`
  background-image: url('/assets/images/PresentListRightPolaroid.png');
  min-width: 90px;
  // height: 90%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
  position: relative;
  margin: 0 10px;
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

const LeftPolaroid = styled.div`
  background-image: url('/assets/images/PresentListLeftPolaroid.png');
  min-width: 90px;
  // height: 90%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
  position: relative;
  margin: 0 10px;
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

const CenterPolaroid = styled.div`
  background-image: url('/assets/images/PresentListCenterRotatePolaroid.png');
  min-width: 90px;
  // height: 90%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
  position: relative;
  transform: rotate(-15deg);
  margin: 0 10px;
  & .center {
    transform: rotate(5deg);
  }
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

export default PresentPictures;
