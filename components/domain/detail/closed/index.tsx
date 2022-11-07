import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import siteMetadata from '@constants/sitemap';
import useToast from '@hooks/useToast';
import { css } from '@emotion/react';

import HomeIcon from 'components/domain/detail/assets/HomeIcon.svg';
import LogoIcon from 'components/domain/detail/assets/LogoIcon.svg';
import Note from 'components/domain/detail/assets/Note.png';
import Camera from 'components/domain/detail/assets/Camera.png';
import Ribbon from 'components/domain/detail/assets/Ribbon.png';
import Box from 'components/domain/detail/assets/Box.png';
import Pencil from 'components/domain/detail/assets/Pencil.png';
import { FundDetailModel } from 'pages/fund/[id]';

interface ClosedDetailPageProps {
  data?: FundDetailModel;
}

function ClosedDetailPage({ data }: ClosedDetailPageProps) {
  console.log(data);
  const router = useRouter();
  const toast = useToast();

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
          <b>이거사줘</b>
        </Title>
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
}

export default ClosedDetailPage;

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
  align-items: center;
  row-gap: 4px;
  z-index: 10;
`;

const Title = styled.h3``;
const Desc = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
