import {
  format,
  isAfter,
  formatDistanceStrict,
  formatDistanceToNowStrict,
} from 'date-fns';
import styled from '@emotion/styled';

const FundingProgress = ({
  dueDate,
  creationDate,
  percent,
  price,
}: {
  dueDate: string;
  creationDate: string;
  percent: number;
  price: number;
}) => {
  const periodProgress = (date: string, baseDate: string) => {
    const isDespired = isAfter(new Date(), new Date(date));

    if (isDespired) return 100;

    const total = Number(
      formatDistanceStrict(new Date(date), new Date(baseDate), {
        unit: 'day',
      }).split(' ')[0],
    );
    const upToToday = Number(
      formatDistanceToNowStrict(new Date(baseDate), { unit: 'day' }).split(
        ' ',
      )[0],
    );
    return Math.floor((upToToday / total) * 100);
  };
  const leftDays = (date: string) => {
    const isDespired = isAfter(new Date(), new Date(date));
    if (isDespired) return 0;

    const diffDays = Number(
      formatDistanceToNowStrict(new Date(date), { unit: 'day' }).split(' ')[0],
    );
    return diffDays;
  };
  return (
    <>
      <FundingPeriodProgress>
        <ProgressBackground color={'#e6f6ff'}>
          <ProgressBar
            value={periodProgress(dueDate, creationDate)}
            color={'#92d2ff'}
          >
            <MarkerWrapper>
              <BlueMarker>
                {leftDays(dueDate)}일
                <br />
                남음
              </BlueMarker>
            </MarkerWrapper>
          </ProgressBar>
        </ProgressBackground>

        <DatePeriodWrapper>
          <span>{format(new Date(creationDate), 'yy-MM-dd')}</span>
          <span>{format(new Date(dueDate), 'yy-MM-dd')}</span>
        </DatePeriodWrapper>
      </FundingPeriodProgress>
      <FundingAmountProgress>
        <ProgressBackground color={'#e6f6ff'}>
          <ProgressBar value={percent} color={'#FDA2E3'}>
            <MarkerWrapper>
              <PinkMarker>{percent}%</PinkMarker>
            </MarkerWrapper>
          </ProgressBar>
        </ProgressBackground>
        <AmountWrapper>
          <span>목표 금액</span> <span>{price}</span>
        </AmountWrapper>
      </FundingAmountProgress>
    </>
  );
};

const FundingPeriodProgress = styled.div`
  width: 310px;
  height: 83px;
  border-radius: 20px;
  margin-bottom: 12px;
  box-shadow: 0px 0px 9px rgba(231, 231, 231, 0.25),
    inset 0px -2px 9px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DatePeriodWrapper = styled.div`
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  width: 310px;
  color: #92d2ff;
  font-weight: 400;
  font-size: 8px;
`;

const AmountWrapper = styled.div`
  padding: 0 34px 0 35px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-weight: 400;
  font-size: 13px;
  color: #fda2e3;
`;

const FundingAmountProgress = styled.div`
  width: 310px;
  height: 83px;
  border-radius: 20px;
  margin-bottom: 18px;
  box-shadow: 0px 0px 9px rgba(231, 231, 231, 0.25),
    inset 0px -2px 9px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProgressBackground = styled.div`
  margin: 34px 0 9px 0;
  width: 237px;
  height: 5px;
  overflow: hidden;
  background-color: ${(props) => props.color};
`;
interface ProgressProps {
  value: number;
  color: string;
}

const ProgressBar = styled.div<ProgressProps>`
  width: ${(props) => props.value}%;
  height: 5px;
  background-color: ${(props) => props.color};
  position: relative;
`;

const MarkerWrapper = styled.div`
  position: absolute;
  right: -20px;
  top: -45px;
`;

const BlueMarker = styled.div`
  background-image: url('/assets/images/ProgressMarker-blue.svg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 47px;
  width: 38px;
  font-weight: 400;
  font-size: 8px;
  line-height: 11px;
  color: #ffffff;
  white-space: pre-line;
  padding-top: 4px;
  text-align: center;
`;

const PinkMarker = styled.div`
  background-image: url('/assets/images/ProgressMarker-pink.svg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 47px;
  width: 34px;
  font-weight: 400;
  font-size: 8px;
  line-height: 11px;
  color: #ffffff;
  padding-top: 10px;
  text-align: center;
`;

export default FundingProgress;
