import { useState, useEffect, useRef } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { isAfter } from 'date-fns';
import axios from 'axios';
import { useQuery } from 'react-query';
import styled from '@emotion/styled';
import { detailFundApi } from '@apis/fundApi';
import Portal from '@components/base/Portal';
import { Modal } from '@components/base';
import FundingCloseModal from '@components/domain/detail/FundingCloseModal';
import FundingCloseDialogue from '@components/domain/detail/FundingCloseDialogue';
import FundingProgress from '@components/domain/detail/FundingProgress';
import { serverRequestInterceptor } from '@apis/serverAuth';
import ArrowFatRightMedium from '@public/assets/images/ArrowFatRight-medium.svg';
import ArrowFatRightLarge from '@public/assets/images/ArrowFatRight-large.svg';
import giftImage from '@public/assets/images/Gift-gradation.svg';
import Link from '@public/assets/images/Link.svg';
import { fundKeys } from '@apis/queryKeys/fund';

type DetailDataType = {
  name: string;
  contents: string;
  creation_date: string;
  due_date: string;
  is_maker: false;
  link_for_sharing: string;
  product: ProductType;
  progress_percent: number;
  state: string;
};

type ProductType = {
  link: string;
  option: string;
  price: number;
};

const DetailFundPage = ({
  id,
  detailData,
}: {
  id: string;
  detailData: DetailDataType;
}) => {
  const { data, refetch } = useQuery(
    fundKeys.detail(+id),
    () => detailFundApi(+id),
    {
      initialData: detailData,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  );

  const [isFundingClosing, setIsFundingClosing] = useState(false);
  const [isPortal, setPortal] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const timer = useRef<any>(null);
  const router = useRouter();

  const moveToFundingItem = () => {
    router.push(data.product.link);
  };

  const copyPageLink = async (link: string) => {
    setPortal(true);
    await navigator.clipboard.writeText(link);

    timer.current = setTimeout(() => {
      setPortal(false);
    }, 3000);
  };

  useEffect(() => {
    const isAfterDueDate = isAfter(new Date(), new Date(data.due_date));
    if (isAfterDueDate && data.is_maker && data.state === 'OPENED')
      setIsModal(true);

    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <FundingDetailMain>
      <GiftImageWrapper>
        <Image src={giftImage} width={'95px'} height={'90px'} />
      </GiftImageWrapper>
      <FundingName>{data.name}</FundingName>
      <FundingItemLink onClick={moveToFundingItem}>
        상품 보러 가기
      </FundingItemLink>
      <FundingContent>{data.contents}</FundingContent>
      <FundingProgress
        dueDate={data.due_date}
        creationDate={data.creation_date}
        percent={data.progress_percent}
        price={data.product.price}
      />
      <ButtonWrapper>
        <LinkCopyButton onClick={() => copyPageLink(data.link_for_sharing)}>
          {isPortal && (
            <Portal>
              <CopySuccessTooltip>복사 완료!</CopySuccessTooltip>
            </Portal>
          )}
          <Image src={Link} width={19} height={18} />
        </LinkCopyButton>

        <PresentButton>
          {data.state === 'OPENED' ? (
            <>
              선물하기{' '}
              <Image src={ArrowFatRightMedium} width={18} height={18} />
            </>
          ) : (
            <>마감된 펀딩입니다.</>
          )}
        </PresentButton>
      </ButtonWrapper>
      {data.is_maker && data.state === 'OPENED' && !isFundingClosing && (
        <FundingCloseButton onClick={() => setIsFundingClosing(true)}>
          펀딩 마감
          <div style={{ position: 'absolute', right: '26.65px' }}>
            <Image src={ArrowFatRightLarge} width={23} height={19} />
          </div>
        </FundingCloseButton>
      )}
      {isFundingClosing && (
        <>
          <FundingCloseDialogue
            setIsFundingClosing={setIsFundingClosing}
            percentage={data.progress_percent}
            fundId={id}
          />
        </>
      )}
      {isModal && (
        <Modal isOpen={isModal} onClose={() => setIsModal(false)}>
          <FundingCloseModal onClose={() => setIsModal(false)} />
        </Modal>
      )}
    </FundingDetailMain>
  );
};

// TODO: Hydrate 변경하기

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  let detailData: undefined | DetailDataType;

  const fundingId = params?.id;

  const serverAuthApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  });
  serverRequestInterceptor(serverAuthApi, req, res);
  try {
    const { data } = await serverAuthApi.get(`api/funding/${fundingId}`);
    detailData = data.data;
  } catch (err) {
    console.log(err);
  }

  if (!detailData) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  return {
    props: {
      id: fundingId,
      detailData,
    },
  };
};

export default DetailFundPage;

const FundingDetailMain = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 310px;
`;

const GiftImageWrapper = styled.div`
  margin: 71px 0 38px 0;
`;

const FundingName = styled.h2`
  font-size: 25px;
  font-weight: 500;
  margin-bottom: 14px;
`;

const FundingItemLink = styled.button`
  margin-bottom: 15px;
  font-weight: 700;
  font-size: 17px;
  color: #ffba50;
`;

const FundingContent = styled.p`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 25px;
`;

const LinkCopyButton = styled.button`
  background: #ffffff;
  box-shadow: 0px 0px 9px rgba(231, 231, 231, 0.25),
    inset 0px -2px 9px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  width: 52px;
  height: 49px;
`;

const PresentButton = styled.button`
  width: 247px;
  height: 49px;
  box-shadow: 0px 0px 9px rgba(231, 231, 231, 0.25),
    inset 0px -2px 9px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  margin-left: 10px;
  font-weight: 700;
  font-size: 15px;
  color: #fda2e3;
  display: flex;
  align-items: center;
  padding: 0 15px 0 74px;
  justify-content: space-between;
  box-sizing: border-box;
`;

const FundingCloseButton = styled.div`
  width: 100%;
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
  position: relative;
`;

const CopySuccessTooltip = styled.div`
  position: fixed;
  bottom: 63px;
  color: white;
  textalign: center;
  background-color: rgba(33, 33, 33, 0.6);
  left: 50%;
  transform: translate(-50%, 0);
  width: 278px;
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-bottom: 14px;
`;
