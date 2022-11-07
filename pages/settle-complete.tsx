import Complete from '@components/base/Complete';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

export default function SettleComplete() {
  const router = useRouter();
  const makeNewFunding = () => {
    router.push('/');
  };
  const mainText = useMemo(() => '정산 완료 되었습니다! 좋은 선물 사세요!', []);
  const buttonText = useMemo(() => '새로운 펀딩 만들기', []);
  return (
    <Complete
      mainText={mainText}
      buttonText={buttonText}
      method={makeNewFunding}
    />
  );
}
