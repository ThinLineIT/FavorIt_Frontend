import styled from '@emotion/styled';

import { Bank } from '@apis/@types/fund';
import BankCard from './BankCard';

interface BankCardListProps {
  banks: Bank[];
  handleSetBank: () => void;
  handleSetValue: (val: string) => void;
}

function BankCardList({
  banks,
  handleSetBank,
  handleSetValue,
}: BankCardListProps) {
  return (
    <PaddingWrapper>
      <ListWrapper>
        {Array.from({ length: 25 }).map((_, idx) => {
          return (
            <BankCard
              key={idx}
              bank={banks && banks[idx]}
              handleSetBank={handleSetBank}
              handleSetValue={handleSetValue}
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
  grid-template-columns: repeat(3, minmax(auto, 150px));
  grid-auto-rows: minmax(auto, 150px);
  gap: 10px 14px;
  width: 100%;
  height: 100%;
  padding: 18px 24px;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;
