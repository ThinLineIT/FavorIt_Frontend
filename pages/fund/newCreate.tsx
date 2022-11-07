import React from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';

import NoteImg from 'public/assets/images/newCreate.png';
import CreateFund from '@components/domain/newCreate/CreateFund';
import { GoBack } from '@components/layout';
import { useForm } from 'react-hook-form';

const FundCreate = () => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

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
      <CreateFund
        watch={watch}
        errors={errors}
        register={register}
        handleSubmit={handleSubmit}
      />
    </CreateSection>
  );
};

export default FundCreate;

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
