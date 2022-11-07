import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import Keypad from '@components/base/Keypad';
import { flexbox } from '@styles/mixins/_flexbox';
import useAddBanking from './hooks/useAddBanking';

interface AddBankingFormProps {
  bank_code: string;
  handleSetBank: () => void;
}

const AddBankingForm = ({ bank_code, handleSetBank }: AddBankingFormProps) => {
  const router = useRouter();
  const {
    value,
    labelString,
    handleSubmit,
    inputSuccess,
    handleKeyClick,
    bankingIsSuccess,
    handleUpdateForm,
    handleCheckAccount,
  } = useAddBanking({ router, bank_code });

  useEffect(() => {
    if (bankingIsSuccess) {
      router.replace({
        pathname: '/settle-complete',
        query: { banking: 'bankingSuccess' },
      });
    }
  }, [bankingIsSuccess, router]);

  return (
    <>
      <InputWrapper price={Boolean(value)}>
        <CustomInput price={Boolean(value)}>{labelString}</CustomInput>
      </InputWrapper>
      <ButtonGroup inputSuccess={inputSuccess}>
        <CustomGoBack
          onClick={!inputSuccess ? handleSetBank : handleUpdateForm}
        >
          이전
        </CustomGoBack>
        <CustomGoNext
          disabled={!value}
          onClick={!inputSuccess ? handleCheckAccount : handleSubmit}
        >
          {!inputSuccess ? '다음' : '정산받기'}
        </CustomGoNext>
      </ButtonGroup>
      <CustomKeypad onClick={handleKeyClick} inputSuccess={inputSuccess} />
    </>
  );
};

export default AddBankingForm;

const bounce = keyframes`
  0% {
    transform: translate3d(0, 500px, 0);
    opacity: 0;
  }
  75% {
    transform: translate3d(0, 330px, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, 300px, 0);
    opacity: 1;
  }
`;

const InputWrapper = styled.div<{ price?: boolean }>`
  width: 80%;
  height: 30px;
  margin-left: 54px;
  padding-left: ${({ price }) => (price ? '0' : '8px')};
  position: relative;
  border-left: ${({ price }) => (price ? 'none' : '2px solid black')};
  ${flexbox('start', 'center')};
`;

const CustomInput = styled.span<{
  price?: boolean;
  inputSuccess?: boolean;
}>`
  font-weight: ${({ price }) => (price ? 500 : 400)};
  font-size: ${({ price }) => (price ? '28px' : '18px')};
  line-height: ${({ price }) => (price ? '34px' : '22px')};
  color: ${({ price }) => (price ? 'black' : '#727272')};
`;

const ButtonGroup = styled.div<{ inputSuccess?: boolean }>`
  ${flexbox('between', 'center')};
  z-index: 10;
  width: 100%;
  height: 4rem;
  position: absolute;
  bottom: 300px;
  transform: ${({ inputSuccess }) =>
    inputSuccess ? 'translate3d(0, 300px, 0)' : ''};
  animation-name: ${({ inputSuccess }) => (inputSuccess ? bounce : '')};
  animation-duration: 1.8s;
  animation-iteration-count: initial;
  transition: transform 1s ease;
`;
const CustomGoBack = styled.button`
  flex: 50%;
  color: #92d2ff;
  font-weight: 700;
  font-size: 17px;
  line-height: 11px;
`;
const CustomGoNext = styled.button<{ disabled?: boolean }>`
  flex: 50%;
  color: ${({ disabled }) => (disabled ? 'lightgray' : '#92d2ff')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-weight: 700;
  font-size: 17px;
  line-height: 11px;
`;

const CustomKeypad = styled(Keypad)<{ inputSuccess?: boolean }>`
  opacity: ${({ inputSuccess }) => (inputSuccess ? 0 : 1)};
  transform: ${({ inputSuccess }) =>
    inputSuccess ? 'translate3d(0, 100%, 0)' : 'translate3d(0, 0, 0)'};
  transition: opacity 1.2s ease, visibility 1.2s ease, transform 1.2s ease;
`;
