import React, { useState } from 'react';
import styled from '@emotion/styled';
import useModal from '@hooks/useModal';
import CalendarModal from './CalendarModal';
import KeypadModal from './KeypadModal';
import useKeypads from '@hooks/useKeypads';
import { dateToString } from '@util/index';
import useMutation from '@hooks/useMutation';
import { deleteComma } from '@util/helper/formatter';
import dayjs from 'dayjs';

const tableList = {
  name: { label: '펀딩 이름', placeholder: '펀딩 이름을 입력해주세요!' },
  link: { label: '상품 링크', placeholder: '상품 링크를 입력해주세요!' },
  contents: { label: '펀딩 내용', placeholder: '펀딩 내용을 입력해주세요!' },
  price: { label: '목표 금액', placeholder: '목표 금액을 입력해주세요!' },
  due_date: { label: '펀딩 일정', placeholder: '언제까지 펀딩할까요?' },
};

type FormValues = {
  name: string;
  link: string;
  contents: string;
  price: string;
  due_date: string;
};

interface FormContainerProps {
  watch: any;
  register: any;
  errors: any;
  thumbnailImage: any;
  handleSubmit: (onSuccess: (data: any) => void, onError?: () => void) => any;
}

interface MutationResult {
  data: {
    funding_id: number;
    link_for_sharing: string;
  };
  message: string;
}

const FormContainer = ({
  watch,
  register,
  errors,
  handleSubmit,
}: FormContainerProps) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const onChange = (dates: Date[]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const { openModal, closeModal } = useModal();
  const { value: price, handleKeyClick } = useKeypads(true);

  const handleCalendarModalOpen = () => {
    openModal(
      <CalendarModal
        startDate={startDate}
        endDate={endDate}
        onChange={onChange}
        closeModal={closeModal}
      />,
    );
  };

  const handleKeypadModalOpen = () => {
    openModal(
      <KeypadModal closeModal={closeModal} handleKeyClick={handleKeyClick} />,
    );
  };

  const [create, { loading, data }] = useMutation<MutationResult>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/funding`,
  );
  const onMutate = (data: any) => create(data);

  const handleSubmitData = (data: FormValues) => {
    const { name, contents, link } = data;
    const reqData = {
      name,
      contents,
      link,
      image: watch('image')[0],
      price: Number(deleteComma(price)),
      due_date: dateToString(endDate as Date),
    };

    const formData = new FormData();
    for (const [key, value] of Object.entries(reqData)) {
      formData.append(key, value);
    }
    formData.append('Content-type', watch('image')[0].type);
    formData.append('file', watch('image')[0]);

    onMutate(formData);
  };

  return (
    <RootStyle onSubmit={handleSubmit(handleSubmitData)}>
      {Object.entries(tableList).map(([key, value], idx) => {
        switch (key) {
          case 'name':
          case 'link':
            return (
              <DefaultInputSection key={idx}>
                <dt>{value.label}</dt>
                <dd>
                  <input
                    {...register(key)}
                    autoComplete="off"
                    spellCheck={false}
                    placeholder={value.placeholder}
                  />
                </dd>
              </DefaultInputSection>
            );

          case 'contents':
            return (
              <DefaultTextAreaSection key={idx}>
                <dt>{value.label}</dt>
                <dd>
                  <CustomTextarea
                    data-status="contents"
                    {...register(key)}
                    spellCheck={false}
                    placeholder="펀딩 내용을 입력해주세요!"
                    rows={4}
                  />
                </dd>
              </DefaultTextAreaSection>
            );

          case 'price':
            return (
              <DefaultTextAreaSection key={idx}>
                <dt>{value.label}</dt>
                <dd>
                  <span onClick={handleKeypadModalOpen}>
                    {price !== '' ? price : value.placeholder}
                  </span>
                </dd>
              </DefaultTextAreaSection>
            );

          case 'due_date':
            return (
              <DefaultTextAreaSection key={idx}>
                <dt>{value.label}</dt>
                <dd>
                  <span onClick={handleCalendarModalOpen}>
                    {endDate
                      ? dayjs(endDate).format('M월DD일')
                      : value.placeholder}
                  </span>
                </dd>
              </DefaultTextAreaSection>
            );
        }
      })}
      <button>다음</button>
    </RootStyle>
  );
};

export default FormContainer;

const RootStyle = styled.form`
  position: relative;
  top: 0;
  left: 2px;
  width: calc(100% - 70px);
  margin: 0 auto;
  margin-top: 50px;
`;

const DefaultInputSection = styled.dl`
  display: flex;
  align-items: center;
  width: 100%;
  border-top: 1px solid #2227979e;

  & > dt {
    color: '000';
    font-size: 12px;
    font-weight: 700;
    padding: 9px 9px 9px 16px;
  }

  & > dd {
    border-left: 1px solid #e70f0f;

    & > input {
      color: #969696;
      font-size: 12px;
      padding: 9px 9px 9px 16px;

      &::placeholder {
        color: #969696;
        font-size: 12px;
      }
    }
  }
`;

const DefaultTextAreaSection = styled.dl`
  width: 100%;
  display: flex;
  align-items: center;
  width: 100%;
  border-top: 1px solid #2227979e;

  & > dt {
    flex-shrink: 1;
    color: '000';
    font-size: 12px;
    font-weight: 700;
    padding: 9px 9px 9px 16px;
  }

  & > dd {
    flex-shrink: 1;
    flex-grow: 1;
    flex-wrap: wrap;
    border-left: 1px solid #e70f0f;

    & > textarea,
    span {
      flex-wrap: wrap;
      word-wrap: break-word;
      display: inline-flex;
      align-items: center;
      max-width: 100%;
      height: 100%;
      color: #969696;
      font-size: 12px;
      padding: 9px 16px;

      &:focus {
        border: none;
        outline: none;
      }
    }
  }
`;

const CustomTextarea = styled.textarea`
  color: #969696;
  font-size: 12px;
  padding: 9px 9px 9px 16px;
  width: 100%;
  resize: none;

  &::placeholder {
    color: #969696;
    font-size: 12px;
  }
`;
