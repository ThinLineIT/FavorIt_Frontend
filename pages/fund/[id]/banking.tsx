import React from 'react';
import styled from '@emotion/styled';

import BankCardList from '@components/domain/banking/BankCardList';
import useLoadBanks from '@components/domain/banking/hooks/useLoadBank';
import AddBankingForm from '@components/domain/banking/AddBankingForm';

function Banking() {
  const {
    banks,
    bankCode,
    bankName,
    isSetBank,
    isLoading,
    handleSetBank,
    handleSetValue,
    handleSetBankName,
  } = useLoadBanks();

  console.log(bankName);

  if (isLoading) return <div>loading..</div>;

  return (
    <Root>
      <LabelWrapper>
        <LabelTitle>어디로 받을까요?</LabelTitle>
        <LabelText>
          {bankName !== '' ? `${bankName}` : '은행을 선택해주세요!'}
        </LabelText>
      </LabelWrapper>
      {banks && !isSetBank ? (
        <BankCardList
          banks={banks}
          handleSetBank={handleSetBank}
          handleSetValue={handleSetValue}
          handleSetBankName={handleSetBankName}
        />
      ) : (
        <Wrapper>
          <AddBankingForm bank_code={bankCode} handleSetBank={handleSetBank} />
        </Wrapper>
      )}
    </Root>
  );
}

export default Banking;

const Root = styled.div`
  width: 100%;
  height: calc(100% - 3rem);
  display: flex;
  flex-flow: column;
  background-color: white;
`;

const LabelWrapper = styled.div`
  padding: 28px 27px;
  padding-left: 54px;
  padding-bottom: 0;
`;
const LabelTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  line-height: 29px;
  color: #000000;
`;

const LabelText = styled.span`
  display: block;
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
  color: #000000;
  margin-top: 4px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  padding-top: 50px;
`;
