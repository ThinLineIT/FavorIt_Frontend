import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { Button } from '@components/base';
import useMutation from '@apis/useMutation';
import { textStyle } from '@styles/mixins/_text-style';
import { columnFlexbox, flexbox } from '@styles/mixins/_flexbox';
import { GeneratorType, isFundingForm, isLocalGenerator } from '@recoil/create';
import { smoothAppearDownUp } from '@styles/modules/_keyframes';

interface fundingId {
  funding_id: string;
}
interface MutationResult {
  data: fundingId;
  message: string;
}

const Preview = () => {
  const router = useRouter();
  const fundingForm = useRecoilValue(isFundingForm);
  const setGenerator = useSetRecoilState(isLocalGenerator);
  const [create, { loading, data, error }] =
    useMutation<MutationResult>('/fund/create');
  const onMutate = () => {
    // create(fundingForm);
    setGenerator((prev: GeneratorType) => ({
      ...prev,
      done: true,
      proceed: false,
    }));
  };

  // useEffect(() => {
  //   if (data?.message === 'succeed') {
  //     setGenerator((prev: GeneratorType) => ({
  //       ...prev,
  //       done: true,
  //       proceed: false,
  //     }));
  //   }
  // }, [data, setGenerator]);

  return (
    <Base>
      <Description>
        반가워요 유저님! <br />
        작성하신 내용을 확인해주세요
        <br />
        펀딩 생성을 진행할까요 ?
      </Description>
      <Button onClick={onMutate}>좋아요</Button>
    </Base>
  );
};

export default Preview;

const Base = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 10px;
  margin-top: 150px;
  ${flexbox('center', 'start')};
`;

const Description = styled.div`
  width: 100%;
  ${textStyle(18, '#333C4A')}
`;
