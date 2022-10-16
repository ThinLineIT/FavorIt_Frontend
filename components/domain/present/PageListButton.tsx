import styled from '@emotion/styled';

const PageListButton = ({
  currentIndex,
  lastIndex,
  totalNumber,
}: {
  currentIndex: number;
  lastIndex: number;
  totalNumber: number;
}) => {
  return (
    <NumberWrapper>
      <PreviousNumber last={lastIndex} current={currentIndex}>
        {currentIndex}
      </PreviousNumber>
      <CurrentNumber last={lastIndex} current={currentIndex}>
        {currentIndex + 1}
      </CurrentNumber>
      <NextNumber last={lastIndex} current={currentIndex} total={totalNumber}>
        {currentIndex + 2}
      </NextNumber>
    </NumberWrapper>
  );
};

interface IndexProps {
  current: number;
  last: number;
  total?: number;
}
const NumberWrapper = styled.div`
  display: flex;
`;

const PreviousNumber = styled.div<IndexProps>`
  display: ${(props) => (props.current === 0 ? 'none' : 'block')};
  color: #000000;
  margin-right: 5px;
`;

const CurrentNumber = styled.div<IndexProps>`
  color: #6db8ff;
`;

const NextNumber = styled.div<IndexProps>`
  display: ${(props) => (props.current === props.last ? 'none' : 'block')};
  color: #000000;
  margin-left: 5px;
`;

export default PageListButton;
