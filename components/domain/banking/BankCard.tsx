import Image from 'next/image';
import styled from '@emotion/styled';

import { Bank } from '@apis/@types/fund';

export type BankCardProps = {
  bank: Bank;
  handleSetBank: () => void;
  handleSetValue: (val: string) => void;
};

function BankCard({ bank, handleSetBank, handleSetValue }: BankCardProps) {
  const handleBank = () => {
    handleSetBank();
    handleSetValue(bank?.value);
  };

  return (
    <Wrapper onClick={handleBank}>
      <BankImage>
        {bank?.image && (
          <Image
            priority
            width={36}
            height={36}
            alt="bank img"
            src={bank.image}
          />
        )}
      </BankImage>
      <BankTitle>{bank?.text}</BankTitle>
    </Wrapper>
  );
}

export default BankCard;

const Wrapper = styled.div`
  display: flex;
  align-self: center;
  justify-self: center;
  flex-direction: column;
  justify-content: center;
  min-width: 80px;
  min-height: 84px;
  border-radius: 10px;
  background-color: #fafafc;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25),
    inset 0px 0px 11px rgba(191, 191, 191, 0.25);
`;

const BankImage = styled.div`
  position: relative;
  width: 36px;
  margin: 0 auto;

  & > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BankTitle = styled.span`
  display: block;
  font-size: 12px;
  line-height: 11px;
  text-align: center;
  color: #000000;
`;
