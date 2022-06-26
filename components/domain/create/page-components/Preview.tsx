import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { Button } from '@components/base';
import useMutation from '@apis/useMutation';
import { textStyle } from '@styles/mixins/_text-style';
import { columnFlexbox } from '@styles/mixins/_flexbox';
import { GeneratorType, isFundingForm, isLocalGenerator } from '@recoil/create';

const Base = styled.div`
  width: 100%;
  height: 100%;
  ${columnFlexbox('start', 'center')};
`;

const Description = styled.div`
  width: 100%;
  ${textStyle(18, '#333C4A')}
`;

interface fundingId {
  funding_id: string;
}
interface MutationResult {
  data: fundingId;
  message: string;
}

const Preview = () => {
  const fundingForm = useRecoilValue(isFundingForm);
  const setGenerator = useSetRecoilState(isLocalGenerator);
  const [create, { loading, data, error }] = useMutation<MutationResult>(
    'http://3.35.218.213/api/funding',
  );
  const onMutate = () => create(fundingForm);

  useEffect(() => {
    if (data?.data?.funding_id) {
      setGenerator((prev: GeneratorType) => ({
        ...prev,
        done: true,
        proceed: false,
      }));
    }
  }, [data, setGenerator]);

  return (
    <Base role="tabpanel" aria-label="펀딩 정보 프리뷰" id="pagination-tab-6">
      <Description>
        반가워요 유저님! <br />
        작성하신 내용을 확인해주세요
        <br />
        펀딩 생성을 진행할까요 ?
        <br />
        <br />
        요기에 미리 작성한 것들 보여줌
      </Description>
      <br />
      <br />
      <br />
      <Button onClick={onMutate}>좋아요</Button>
    </Base>
  );
};

export default Preview;
