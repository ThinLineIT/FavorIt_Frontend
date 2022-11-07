import { PresentType } from '@apis/@types/present';
import styled from '@emotion/styled';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

const PresentDetailIamge = ({
  imageSrc,
  setImageSrc,
}: {
  imageSrc: Blob | null;
  setImageSrc: Dispatch<SetStateAction<Blob | null>>;
}) => {
  const imgRef = useRef<HTMLInputElement>(null);
  const [imageStringSrc, setImageStringSrc] = useState<string | null>(null);
  const uploadImage = () => {
    const inputElement = imgRef.current;
    if (inputElement && inputElement.files && inputElement.files.length) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          const loadedImage = e.target.result as string;
          setImageStringSrc(loadedImage);
        }
      };
      setImageSrc(inputElement.files[0]);
      reader.readAsDataURL(inputElement.files[0]);
    }
  };
  useEffect(() => {
    const inputElement = imgRef.current;
    if (inputElement) inputElement.addEventListener('change', uploadImage);

    return () => {
      const inputElement = imgRef.current;
      if (inputElement) {
        inputElement.removeEventListener('change', uploadImage);
      }
    };
  }, []);
  return (
    <>
      {imageStringSrc !== null ? (
        <PresentImageWrapper>
          <Image src={imageStringSrc} layout="fill" className="upload-image" />
        </PresentImageWrapper>
      ) : (
        <>
          <ImageInput ref={imgRef} type="file" id="present-image" />
          <PresentImageLabel htmlFor="present-image" />
        </>
      )}
    </>
  );
};

export default PresentDetailIamge;

const PresentImageWrapper = styled.div`
  width: 91.25%;
  margin: 0 auto;
  aspect-ratio: 1 / 1;
  & > span {
    position: unset !important;
    height: 100% !important;
    & .upload-image {
      object-fit: contain !important;
      position: relative !important;
      height: auto !important;
    }
  }
`;

const ImageInput = styled.input`
  display: none;
`;

const PresentImageLabel = styled.label`
  width: 91.25%;
  aspect-ratio: 1 / 1;
  border-radius: 30px;
  margin: 0 auto;
  background-image: url('/assets/images/AddImage.png');
  background-color: #bcdfff;
  background-position: center center;
  background-repeat: no-repeat;
`;
