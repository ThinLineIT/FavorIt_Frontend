import Complete from '@components/base/Complete';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

export default function PresentComplete() {
  const router = useRouter();

  const makeNewFunding = () => {
    router.push(`/fund/${router.asPath.split('/')[2]}`);
  };
  const mainText = useMemo(() => '선물이 완료되었습니다!', []);
  const buttonText = useMemo(() => '펀딩보기', []);
  return (
    <Complete
      mainText={mainText}
      buttonText={buttonText}
      method={makeNewFunding}
    />
  );
}
