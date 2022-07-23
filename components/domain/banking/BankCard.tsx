import styled from '@emotion/styled';
import Image from 'next/image';
import { Bank } from './BankCardList';

export type BankCardProps = {
  bank: Bank;
  setIsSetBank: (x: boolean) => void;
  handleSetValue: (val: string) => void;
};

function BankCard({ bank, setIsSetBank, handleSetValue }: BankCardProps) {
  const handleBank = () => {
    setIsSetBank(true);
    handleSetValue(bank?.value);
  };
  return (
    <Wrapper onClick={handleBank}>
      <BankImage>
        {bank?.image && (
          <Image
            src={bank.image}
            width={36}
            height={36}
            priority
            alt="bank img"
          />
        )}
      </BankImage>
      <BankTitle>{bank?.text}</BankTitle>
    </Wrapper>
  );
}

export default BankCard;

const Wrapper = styled.div`
  justify-self: center;
  align-self: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 80px;
  min-height: 84px;
  background-color: #fafafc;
  border-radius: 10px;
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
  text-align: center;
  font-size: 12px;
  line-height: 11px;
  color: #000000;
`;
