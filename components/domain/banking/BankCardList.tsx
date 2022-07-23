import styled from '@emotion/styled';
import BankCard from './BankCard';

export type Bank = {
  text: string;
  value: string;
  image: string;
};

export type BankCardListProps = {
  banks: Bank[];
  setIsSetBank: (x: boolean) => void;
  handleSetValue: (val: string) => void;
};

function BankCardList({
  banks,
  setIsSetBank,
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
              setIsSetBank={setIsSetBank}
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
  padding: 18px 24px;
  width: 100%;
  height: 100%;

  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;
