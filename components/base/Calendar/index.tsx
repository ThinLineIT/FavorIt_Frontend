import dayjs from 'dayjs';
import ko from 'date-fns/locale/ko';
import styled from '@emotion/styled';
import { flexbox } from '@styles/mixins/_flexbox';
import DatePicker, { registerLocale } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ko', ko);

const formatDate = (d: Date) => {
  //달력 년, 월, 일 header
  const date = new Date(d);
  const monthIndex = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}년 ${`0${monthIndex}`.slice(-2)}월`;
};

const CustomCalendarHeader = ({ date, decreaseMonth, increaseMonth }: any) => {
  return (
    <DateHeaderWrapper>
      <div>{formatDate(date)} 😊</div>
      <div
        onClick={
          dayjs(date).format('YY-MM') <= dayjs(new Date()).format('YY-MM')
            ? undefined
            : decreaseMonth
        }
      >
        {dayjs(date).format('YY-MM') <= dayjs(new Date()).format('YY-MM') ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#ddd"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        ) : (
          <svg
            style={{ cursor: 'pointer' }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        )}
      </div>
      <div style={{ cursor: 'pointer' }} onClick={increaseMonth}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </DateHeaderWrapper>
  );
};

type CalendarProps = {
  endDate: Date | null;
  startDate?: Date;
  onChange: (dates: any) => void;
};

const Calendar = ({ startDate, endDate, onChange }: CalendarProps) => {
  return (
    <CustomDatePicker
      inline
      id="asdsadadas"
      locale="ko"
      selectsRange
      endDate={endDate}
      onChange={onChange}
      selected={startDate}
      minDate={new Date()}
      startDate={startDate}
      disabledKeyboardNavigation
      renderCustomHeader={(
        { date, decreaseMonth, increaseMonth }, //header 커스텀 설정
      ) => (
        <CustomCalendarHeader
          date={date}
          decreaseMonth={decreaseMonth}
          increaseMonth={increaseMonth}
        />
      )}
    />
  );
};

export default Calendar;

const CustomDatePicker = styled(DatePicker)`
  width: 100%;
  height: 100%;
`;

const DateHeaderWrapper = styled.div`
  width: 100%;
  ${flexbox('around', 'center')}

  svg {
    width: 1.1rem;
    height: 1.1rem;
  }
`;
