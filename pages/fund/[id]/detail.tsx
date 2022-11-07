import React from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';

import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { clientAuthApi as ax } from 'apis/auth';

import NoteImg from 'public/assets/images/newCreate.png';
import { GoBack } from '@components/layout';
import ImageUploadContainer from '@components/domain/newCreate/ImageUploadContainer';

const tableList = {
  name: { label: '펀딩 이름', placeholder: '펀딩 이름을 입력해주세요!' },
  link: { label: '상품 링크', placeholder: '상품 링크를 입력해주세요!' },
  contents: { label: '펀딩 내용', placeholder: '펀딩 내용을 입력해주세요!' },
  price: { label: '목표 금액', placeholder: '목표 금액을 입력해주세요!' },
  due_date: { label: '펀딩 일정', placeholder: '언제까지 펀딩할까요?' },
};

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

function Detail() {
  const router = useRouter();

  const api = async (): Promise<FundDetailModel> => {
    const res = await ax.get(`/api/funding/${router.query.id}`);
    return res.data;
  };

  const { data } = useQuery<FundDetailModel>(['get-detail'], api);

  const imagePreview = data?.data?.image;

  return (
    <CreateSection>
      <CustomGoBack />
      <Base
        priority
        src={NoteImg}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />

      <figcaption className="visually-hidden">펀딩 생성</figcaption>
      <RootStyle>
        <ImageUploadContainer isReadOnly imagePreview={imagePreview} />
        <DetailUI>
          {data &&
            Object.entries(tableList).map(([key, value], idx) => {
              switch (key) {
                case 'name':
                  return (
                    <DefaultInputSection key={idx}>
                      <dt>{value.label}</dt>
                      <dd>{data?.data[key]}</dd>
                    </DefaultInputSection>
                  );

                case 'link':
                  return (
                    <DefaultInputSection key={idx}>
                      <dt>{value.label}</dt>
                      <dd>{data?.data['product']['link']}</dd>
                    </DefaultInputSection>
                  );

                case 'contents':
                  return (
                    <DefaultTextAreaSection key={idx}>
                      <dt>{value.label}</dt>
                      <dd>{data?.data[key]}</dd>
                    </DefaultTextAreaSection>
                  );

                case 'price':
                  return (
                    <DefaultTextAreaSection key={idx}>
                      <dt>{value.label}</dt>
                      <dd>{data?.data['product']['price']}</dd>
                    </DefaultTextAreaSection>
                  );

                case 'due_date':
                  return (
                    <DefaultTextAreaSection key={idx}>
                      <dt>{value.label}</dt>
                      <dd>{data?.data[key]}</dd>
                    </DefaultTextAreaSection>
                  );
              }
            })}
        </DetailUI>
      </RootStyle>
    </CreateSection>
  );
}

export default Detail;

const CreateSection = styled.section`
  width: 100%;
  height: 85%;
  position: relative;
  top: 40px;
  display: flex;
  flex-direction: column;
`;

const Base = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const CustomGoBack = styled(GoBack)`
  top: 32px;
  left: 28px;
`;

const RootStyle = styled.div`
  position: relative;
  top: 0;
  left: 2px;
  width: 100%;
  height: calc(100vh - 40px);
  padding: 0 30px;
`;

const DetailUI = styled.div`
  top: 0;
  left: 2px;
  width: calc(100% - 70px);
  margin: 0 auto;
  margin-top: 50px;
`;

const DefaultInputSection = styled.dl`
  display: flex;
  align-items: center;
  width: 100%;
  border-top: 1px solid #2227979e;

  & > dt {
    color: '000';
    font-size: 12px;
    font-weight: 700;
    padding: 9px 9px 9px 16px;
  }

  & > dd {
    border-left: 1px solid #e70f0f;

    color: #000000;
    font-size: 12px;
    padding: 9px 9px 9px 16px;
  }
`;

const DefaultTextAreaSection = styled.dl`
  width: 100%;
  display: flex;
  align-items: center;
  border-top: 1px solid #2227979e;

  & > dt {
    flex-shrink: 1;
    color: '#000';
    font-size: 12px;
    font-weight: 700;
    padding: 9px 9px 9px 16px;
  }

  & > dd {
    flex-shrink: 1;
    flex-grow: 1;
    flex-wrap: wrap;
    border-left: 1px solid #e70f0f;

    flex-wrap: wrap;
    word-wrap: break-word;
    display: inline-flex;
    align-items: center;
    max-width: 100%;
    height: 100%;
    color: #000000;
    font-size: 12px;
    padding: 9px 16px;
  }
`;
