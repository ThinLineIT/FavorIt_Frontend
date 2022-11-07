import React from 'react';
import Image from 'next/image';
import type { NextPage } from 'next';
import { useQuery } from 'react-query';
import { clientAuthApi as ax } from 'apis/auth';

import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import HomeIcon from 'components/domain/detail/assets/HomeIcon.svg';
import LogoIcon from 'components/domain/detail/assets/LogoIcon.svg';
import Note from 'components/domain/detail/assets/Note.png';
import Camera from 'components/domain/detail/assets/Camera.png';
import Ribbon from 'components/domain/detail/assets/Ribbon.png';
import Box from 'components/domain/detail/assets/Box.png';
import Pencil from 'components/domain/detail/assets/Pencil.png';

import useToast from '@hooks/useToast';
import siteMetadata from '@constants/sitemap';
import { css } from '@emotion/react';
import FundingProgress from '@components/domain/detail/FundingProgress';

interface FundDetailModel {
  data: {
    name: string;
    contents: string;
    state: string;
    is_maker: boolean;
    image: string;
    creation_date: string;
    due_date: string;
    progress_percent: number;
    link_for_sharing: string;
    product: {
      link: string;
      price: number;
    };
  };
  message: string;
}

const Home: NextPage = () => {
  const router = useRouter();

  const toast = useToast();

  const api = async (): Promise<FundDetailModel> => {
    const res = await ax.get(`/api/funding/${router.query.id}`);
    return res.data;
  };

  const { data } = useQuery<FundDetailModel>(['get-detail'], api);

  const onClickHomeHandler = () => {
    router.push('/');
  };

  const onClickNoteHandler = () => {
    router.push(`/fund/${router.query.id}/detail`);
  };

  const onClickCameraHandler = () => {
    router.push(`/fund/${router.query.id}/present`);
  };

  const onClickBoxHandler = () => {
    router.push('/');
  };

  const onClickRibbonHandler = () => {
    router.push('/');
  };

  const onClickPencilHandler = () => {
    const baseUrl = `${siteMetadata.siteUrl}fund/${router.query.id}`;
    navigator.clipboard.writeText(baseUrl).then(() => {
      toast('복사 완료!');
    });
  };

  return (
    <HomePage>
      <ImageWrapper top={3} left={10} zIndex={1}>
        <Image src={HomeIcon} onClick={onClickHomeHandler} alt="Home" />
      </ImageWrapper>
      <ImageWrapper top={2} left={25} zIndex={1} isPointer={false}>
        <Image src={LogoIcon} alt="Logo" />
      </ImageWrapper>

      <DescBox>
        <Title>
          <b>이거사줘</b> 님의 선물상자
        </Title>
        <FundingProgress
          dueDate={data?.data.due_date}
          creationDate={data?.data.creation_date}
          percent={data?.data.progress_percent}
          price={data?.data.product.price}
        />
        <Desc>
          <span>
            <b>30명</b>이 선물해줬어요
          </span>
          <span>
            펀딩 마감까지 <b>12</b>일 남았어요
          </span>
        </Desc>
      </DescBox>

      <ImageWrapper top={40} left={2} zIndex={1}>
        <Image src={Camera} onClick={onClickCameraHandler} alt="camera" />
      </ImageWrapper>
      <ImageWrapper top={40} left={65} zIndex={0}>
        <Image src={Note} onClick={onClickNoteHandler} alt="note" />
      </ImageWrapper>
      <CustomImageWrapper>
        <Image src={Box} onClick={onClickBoxHandler} alt="Box" />
      </CustomImageWrapper>
      <ImageWrapper top={77} left={2} zIndex={0}>
        <Image src={Ribbon} onClick={onClickRibbonHandler} alt="Ribbon" />
      </ImageWrapper>
      <ImageWrapper top={77} left={65} zIndex={0}>
        <Image src={Pencil} onClick={onClickPencilHandler} alt="Pencil" />
      </ImageWrapper>
    </HomePage>
  );
};

const HomePage = styled.main`
  background-image: url('/assets/images/detailBackground.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: auto 100%;
  height: 100%;
`;

// TODO: 반응형
interface ImagePositionProps {
  top: number;
  left: number;
  zIndex: number;
  isPointer?: boolean;
}

const ImageWrapper = styled.div<ImagePositionProps>`
  ${({ top, left, zIndex, isPointer = true }) => css`
    position: absolute;
    top: ${top}%;
    left: ${left}%;
    z-index: ${zIndex};
    cursor: ${isPointer ? 'pointer' : ''};
  `}
`;

const CustomImageWrapper = styled.div`
  position: absolute;
  top: 67%;
  left: 50%;
  transform: translate(-50%, -67%);
  z-index: 1;
`;

export default Home;

const DescBox = styled.div`
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 18px;
  padding: 12px;
  width: 80%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  z-index: 10;
`;

const Title = styled.h3``;
const ProgressBar = styled.span``;
const Desc = styled.span``;
