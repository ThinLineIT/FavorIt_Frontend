import styled from '@emotion/styled';
import { flexbox } from '@styles/mixins/_flexbox';

export type indexProps = {
  list: any[];
  chapterNum: number;
  handleChapterClick: (idx: number) => void;
};

function UpperPagination({ list, chapterNum, handleChapterClick }: indexProps) {
  const handleClick = (idx: number) => () => {
    chapterNum > idx && handleChapterClick(idx);
  };

  return (
    <Pagination role="tablist">
      {list.map((_, idx) => (
        <Chapter
          key={idx}
          role="tab"
          onClick={handleClick(idx)}
          done={chapterNum > idx}
          active={chapterNum === idx}
          id={`pagination-tab-${idx}`}
        />
      ))}
    </Pagination>
  );
}

export default UpperPagination;

const Pagination = styled.div`
  ${flexbox()};
  flex-shrink: 1;
  flex-grow: 0;
  width: 100%;
  margin-bottom: 50px;
  column-gap: 26px;
`;
const Chapter = styled.div<{ active: boolean; done: boolean }>`
  position: relative;
  width: 24px;
  height: 24px;
  border: 1px solid #92d2ff;
  border-radius: calc((22px + 22px) / 2);
  background-color: ${({ active, done }) =>
    active || done ? (active && !done ? '#E6F6FF' : '#92d2ff') : '#fff'};

  transform: ${({ active }) => (active ? 'scale(1.4)' : 'none')};
  transition: background-color 200ms ease-in-out, transform 200ms ease-in-out;
  cursor: pointer;

  &:not(:last-child)::after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: calc(50% + (24px / 2));
    width: 25px;
    border: 0.5px solid #92d2ff;
  }
`;
