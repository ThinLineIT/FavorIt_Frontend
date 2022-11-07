import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import FormContainer from './FormContainer';
import ImageUploadContainer from './ImageUploadContainer';

const CreateFund = ({ watch, register, errors, handleSubmit }: any) => {
  const thumbnailImage = watch('image');
  const [imagePreview, setImagePreview] = useState('');

  const handleDeleteImage = () => setImagePreview('');

  useEffect(() => {
    if (thumbnailImage && thumbnailImage.length > 0) {
      const file = thumbnailImage[0];
      setImagePreview(URL.createObjectURL(file));
    }
  }, [thumbnailImage]);

  return (
    <RootStyle>
      <ImageUploadContainer
        imagePreview={imagePreview}
        register={register('image')}
        handleDeleteImage={handleDeleteImage}
      />
      <FormContainer
        watch={watch}
        errors={errors}
        register={register}
        handleSubmit={handleSubmit}
        thumbnailImage={thumbnailImage}
      />
    </RootStyle>
  );
};

export default CreateFund;

const RootStyle = styled.div`
  position: relative;
  top: 0;
  left: 2px;
  width: 100%;
  height: calc(100vh - 40px);
  padding: 0 30px;
`;
