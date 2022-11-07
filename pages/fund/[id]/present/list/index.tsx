import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next';
import { PresentType } from '@apis/@types/present';
import Image from 'next/image';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { keyframes } from '@emotion/react';
import { serverRequestInterceptor } from '@apis/serverAuth';
import axios from 'axios';
import { useRouter } from 'next/router';
import PresentList from '@components/domain/present/PresentList';
import PageListButton from '@components/domain/present/PageListButton';
import PresentDetail from '@components/domain/present/PresentDetail';
import usePresentList from '@components/domain/present/hooks/usePresentList';
import CloseButton from '@public/assets/images/CloseButton.svg';
import PreviousButton from '@public/assets/images/PreviousButton.svg';
import NextButton from '@public/assets/images/NextButton.svg';

const Present: NextPage = ({
  presentList,
  fundId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    lastIndex,
    pageIndex,
    processedData,
    moveToNextPage,
    moveToPreviosPage,
  } = usePresentList(presentList);

  const presentListRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [eventType, setEventType] = useState('event');
  const [seletedPresent, setPresent] = useState<PresentType | null>(null);

  const moveToFundingDeteil = () => {
    router.push(`/fund/${fundId}`);
  };

  useEffect(() => {
    if (!seletedPresent && pageIndex !== 0) {
      if (pageIndex % 2 === 1)
        presentListRef.current?.classList.add('slide-right');
    }
  }, [seletedPresent]);

  const onClickNextButton = () => {
    presentListRef.current?.classList.remove(eventType);
    if (pageIndex % 2 === 1) {
      presentListRef.current?.classList.add('fadeout-left');
      setEventType('fadeout-left');
    } else {
      presentListRef.current?.classList.add('slide-right');
      setEventType('slide-right');
    }
    moveToNextPage();
  };

  const onClickPreviosButton = () => {
    presentListRef.current?.classList.remove(eventType);
    if (pageIndex % 2 === 1) {
      presentListRef.current?.classList.add('slide-left');
      setEventType('slide-left');
    } else {
      presentListRef.current?.classList.add('fadeout-right');
      setEventType('fadeout-right');
    }
    moveToPreviosPage();
  };

  return (
    <>
      {seletedPresent ? (
        <PresentDetail present={seletedPresent} setPresent={setPresent} />
      ) : (
        <PresentPage>
          <div style={{ padding: '23px 0 32px 18px', cursor: 'pointer' }}>
            <Image
              src={CloseButton}
              width={27}
              onClick={() => moveToFundingDeteil()}
            />
          </div>
          <PresentCountText>
            총 {presentList.length ? presentList.length : 0}분이 선물하셨어요
          </PresentCountText>
          <ListWrapper ref={presentListRef}>
            <LeftPage>
              <PresentList
                presentRow={processedData[Math.floor(pageIndex / 2)]}
                setPresent={setPresent}
              />
            </LeftPage>
            <RightPage>
              <PresentList
                presentRow={processedData[Math.floor(pageIndex / 2) + 1]}
                setPresent={setPresent}
              />
            </RightPage>
          </ListWrapper>
          <PresentListPagination>
            {pageIndex >= 1 ? (
              <Image
                onClick={onClickPreviosButton}
                src={PreviousButton}
                width={41.5}
              />
            ) : (
              <EmptySpace />
            )}
            <PageListButton
              lastIndex={lastIndex}
              currentIndex={pageIndex}
              totalNumber={presentList.length}
            />
            {pageIndex < lastIndex ? (
              <Image
                onClick={onClickNextButton}
                src={NextButton}
                width={41.5}
              />
            ) : (
              <EmptySpace />
            )}
          </PresentListPagination>
        </PresentPage>
      )}
    </>
  );
};

const slideToRight = keyframes`
  from {
    transform: translateX(0%);
  } 
  to {
    transform: translateX(-50%);
  }
`;
const slideToLeft = keyframes`
  from {
    transform: translateX(-50%);
  } 
  to {
    transform: translateX(0%);
  }
`;
const fadeOutToRight = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0%);
  }
  49% {
    transform: translateX(0%);
    opacity: 0;
  }
  50% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(-50%);
    opacity: 1;
  }
`;
const fadeOutToLeft = keyframes`
  0% {
    opacity: 1;
    transform: translateX(-50%);
  }
  49% {
    transform: translateX(-50%);
    opacity: 0;
  }
  50% {
    transform: translateX(0%);
  }
  100% {
    opacity: 1;
  }
`;

const PresentCountText = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 19px;
  font-weight: 700;
  font-size: 20px;
`;

const PresentPage = styled.main`
  height: 100vh;
  width: 100%;
  background-color: #f9ede5;
`;

const ListWrapper = styled.div`
  display: flex;
  height: 77%;
  width: 185%;
  padding: 0 17px;
  box-sizing: content-box;
  &.slide-right {
    animation: ${slideToRight} 0.5s ease forwards;
  }
  &.slide-left {
    animation: ${slideToLeft} 0.5s ease forwards;
  }
  &.fadeout-left {
    animation: ${fadeOutToLeft} 0.5s ease forwards;
  }
  &.fadeout-right {
    animation: ${fadeOutToRight} 0.5s ease forwards;
  }
`;

const LeftPage = styled.div`
  width: 50%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-image: url('/assets/images/PresentLeftPage.png');
`;

const RightPage = styled.div`
  width: 50%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-image: url('/assets/images/PresentRightPage.png');
`;

const PresentListPagination = styled.div`
  display: flex;
  position: absolute;
  bottom: 13%;
  left: 48%;
  transform: translateX(-50%);
  width: 90%;
  justify-content: space-around;
`;

const EmptySpace = styled.div`
  width: 42px;
`;

export default Present;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const fundId = Number(req.url?.split('/')[2]);

  const serverAuthApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  });

  serverRequestInterceptor(serverAuthApi, req, res);
  const { data } = await serverAuthApi.get(`api/funding/${fundId}/presents`);
  return {
    props: {
      presentList: data.data,
      fundId,
    },
  };

  // try {
  // } catch (err) {
  //   console.log(err);
  //   return {
  //     redirect: {
  //       destination: '/404',
  //       permanent: false,
  //     },
  //   };
  // }

  // TODO: SSR을 위한 API 형식 추가
  // const queryClient = new QueryClient();

  // await queryClient.prefetchQuery('presentList', () => presentListApi(fundId));

  // return {
  //   props: {
  // dehydratedState: dehydrate(queryClient),
  //   },
  // };
};
