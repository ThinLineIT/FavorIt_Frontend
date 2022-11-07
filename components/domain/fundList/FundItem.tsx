import Image from 'next/image';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import NoteImg from './assets/note.png';
import DefaultThumbnail from './assets/thumbnail.png';
import { DefaultListModel } from 'pages/fund/list';

interface FundItemProps {
  data: DefaultListModel;
  rotate?: boolean;
}

function FundItem({ data, rotate }: FundItemProps) {
  const ImageErrorHandler = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.src = DefaultThumbnail.src;
  };

  return (
    <RootStyle rotate={rotate}>
      <Base
        priority
        src={NoteImg}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <figcaption className="visually-hidden">펀딩</figcaption>
      <ThumbnailImageBox>
        {data?.image !== '' ? (
          <Image
            src={data?.image}
            alt="thumbnail"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            onError={ImageErrorHandler}
          />
        ) : (
          <Image
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            src={DefaultThumbnail}
            alt="default thumbnail"
          />
        )}
      </ThumbnailImageBox>
      <Desc>
        <Title>{data?.name}</Title>
        <Date dateTime={data?.due_date}>{data?.due_date}</Date>
      </Desc>
    </RootStyle>
  );
}

export default FundItem;

type RootStyleProps = {
  rotate?: boolean;
};

const RootStyle = styled.section<RootStyleProps>`
  ${({ rotate }) => css`
    position: relative;
    width: 170px;
    height: 170px;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 12px;
    transform: ${rotate ? 'rotate(20deg)' : ''};
  `}
`;

const Base = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const ThumbnailImageBox = styled.div`
  position: relative;
  width: 135px;
  aspect-ratio: 1 / 1;
`;

const Desc = styled.div`
  width: 100%;
  z-index: 10;
`;

const Title = styled.h3`
  font-size: 11px;
  font-weight: 700;
`;
const Date = styled.time`
  font-size: 11px;
  font-weight: 700;
`;
