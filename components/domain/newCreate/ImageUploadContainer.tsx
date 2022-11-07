import styled from '@emotion/styled';
import Image from 'next/image';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface ImageUploadContainerProps {
  imagePreview?: string;
  isReadOnly?: boolean;
  handleDeleteImage?: () => void;
  register?: UseFormRegisterReturn;
}

const ImageUploadContainer = ({
  imagePreview,
  isReadOnly,
  handleDeleteImage,
  register,
}: ImageUploadContainerProps) => {
  return (
    <RootStyle>
      <UploadBox>
        {imagePreview ? (
          <>
            <CloseIcon type="button" onClick={handleDeleteImage}>
              X
            </CloseIcon>
            <PreviewImage src={imagePreview} layout="fill" />
          </>
        ) : (
          <>
            <label htmlFor="imageUpload"></label>
            {!isReadOnly && (
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                {...register}
              />
            )}
          </>
        )}
      </UploadBox>
    </RootStyle>
  );
};

export default ImageUploadContainer;

const RootStyle = styled.div`
  width: calc(100% - 80px);
  height: 200px;
  margin: 0 auto;
  background-color: #92caed;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
`;

const UploadBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > label {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #fff;
    text-align: center;
    cursor: pointer;
  }

  & > input {
    display: none;
  }
`;

const PreviewImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CloseIcon = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
  border-radius: 100;
  width: 25px;
  height: 25px;
  z-index: 10000;
`;
