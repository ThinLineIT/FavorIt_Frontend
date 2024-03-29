import styled from '@emotion/styled';

import { Bank } from '@apis/@types/fund';
import BankCard from './BankCard';

interface BankCardListProps {
  banks: Bank[];
  handleSetBank: () => void;
  handleSetValue: (val: string) => void;
  handleSetBankName: (val: string) => void;
}

function BankCardList({
  banks,
  handleSetBank,
  handleSetValue,
  handleSetBankName,
}: BankCardListProps) {
  return (
    <PaddingWrapper>
      <ListWrapper>
        {Array.from({ length: 15 }).map((_, idx) => {
          return (
            <BankCard
              key={idx}
              bank={banks && banks[idx]}
              handleSetBank={handleSetBank}
              handleSetValue={handleSetValue}
              handleSetBankName={handleSetBankName}
            />
          );
        })}
      </ListWrapper>
    </PaddingWrapper>
  );
}

export default BankCardList;

const PaddingWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 37px;
  border-radius: 8px;
`;

const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(auto, 84px);
  gap: 10px 14px;
  width: 100%;
  height: 100%;
  padding: 18px 24px;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;
