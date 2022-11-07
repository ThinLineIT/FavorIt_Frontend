import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useMemo } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { serverRequestInterceptor } from '@apis/serverAuth';
import PresentPictures from '@components/domain/settle/PresentPictures';
import ProgressBar from '@components/domain/settle/ProgressBar';
import axios from 'axios';
import { AxiosError } from 'axios';
import { isAfter, differenceInDays } from 'date-fns';
import { useRouter } from 'next/router';

export default function FundSettle({
  presentList,
  creationDate,
  progressPercent,
  dueDate,
  price,
  fundId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const collectedAmount = useMemo(
    () => Math.floor((progressPercent / 100) * price),
    [],
  );
  const fundingPeriod = useMemo(() => {
    const dueDateObj = new Date(dueDate);
    const creationDateObj = new Date(creationDate);
    const todayObj = new Date();
    const isAfterDueDate = isAfter(todayObj, dueDateObj);
    if (isAfterDueDate) return differenceInDays(dueDateObj, creationDateObj);
    else return differenceInDays(todayObj, creationDateObj);
  }, []);
  const moveToBanking = () => {
    router.push(`/fund/${fundId}/banking`);
  };
  return (
    <SettleBackground>
      <BlackCover>
        <PositionWrapper height={23} timing={2.5}>
          <PresentCount>
            {' '}
            <BoldText>{presentList.length}</BoldText> 명이 선물해줬어요
          </PresentCount>
        </PositionWrapper>
        <PositionWrapper height={18} timing={3}>
          <PresentPictures presentList={presentList}></PresentPictures>
        </PositionWrapper>
        <PositionWrapper height={18} timing={3.5}>
          <FundingDueDate>
            <BoldText>{fundingPeriod}</BoldText> 일간의 펀딩이 완료되었습니다.
          </FundingDueDate>
        </PositionWrapper>
        <PositionWrapper height={21} timing={4}>
          <ProgressBox>
            <Test>
              목표 금액은 <BoldText>{price}</BoldText>원
            </Test>
            <Test>
              <ProgressBar
                totalAmount={50000}
                collectedAmount={collectedAmount}
              />
            </Test>

            <Test>
              <BoldText>{collectedAmount}</BoldText>원을 모았어요!
            </Test>
          </ProgressBox>
        </PositionWrapper>
        <PositionWrapper height={20} timing={4.5}>
          <SettleButton onClick={moveToBanking}>정산받기</SettleButton>
        </PositionWrapper>
      </BlackCover>
    </SettleBackground>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const fundId = Number(req.url?.split('/')[2]);

  const serverAuthApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  });

  serverRequestInterceptor(serverAuthApi, req, res);

  try {
    const fundDetails = await serverAuthApi.get(`api/funding/${fundId}`);
    const { data: data } = await serverAuthApi.get(
      `/api/funding/${fundId}/presents`,
    );
    const { progress_percent, due_date, product, creation_date } =
      fundDetails.data.data;
    return {
      props: {
        presentList: data.data,
        progressPercent: progress_percent,
        dueDate: due_date,
        creationDate: creation_date,
        price: product.price,
        fundId,
      },
    };
  } catch (err) {
    const { response } = err as unknown as AxiosError;
    if (response?.status === 401) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    } else {
      return {
        redirect: {
          destination: '/404',
          permanent: false,
        },
      };
    }
  }
};

type wrapperProps = {
  height: number;
  timing: number;
};

const DisolveAnimation = keyframes`
  0%{
    opacity: 0;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  } 
`;

const Test = styled.div`
  display: flex;
  height: 33%;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const PositionWrapper = styled.div<wrapperProps>`
  opacity: 0;
  animation: ${DisolveAnimation} 0.3s linear ${(props) => props.timing}s
    forwards;
  width: 100%;
  height: ${(props) => props.height}vh;
  position: relative;
`;

const SettleButton = styled.div`
  width: 91%;
  background-color: white;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 6.5 / 1;
  bottom: 25%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
`;

const ProgressBox = styled.div`
  width: 91%;
  background-color: white;
  border-radius: 10px;
  aspect-ratio: 1.97 / 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const PresentCount = styled.div`
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-image: url('/assets/images/Ribbon.png');
  color: white;
  width: 70%;
  height: 50%;
  position: absolute;
  bottom: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
`;

const FundingDueDate = styled.div`
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-image: url('/assets/images/Ribbon.png');
  color: white;
  width: 95%;
  height: 50%;
  position: absolute;
  bottom: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
`;

const SettleBackground = styled.div`
  background-image: url('/assets/images/BoxGif.gif');
  width: 100%;
  height: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const BlackCover = styled.div`
  display: flex;
  flex-direction: column;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  animation: ${DisolveAnimation} 0.5s linear 2s forwards;
`;

const BoldText = styled.div`
  font-weight: 700;
  font-size: 20px;
`;
