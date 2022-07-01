import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { GoBack } from '@components/layout';
import { isLocalGenerator } from '@recoil/create';
import { useRouter } from 'next/router';

function DetailFundPage() {
  const router = useRouter();
  const { id } = router.query;
  const [generator, setGenerator] = useRecoilState(isLocalGenerator);

  useEffect(() => {
    // 디테일 페이지 fetch 로직 추가

    return () => {
      setGenerator((prev) => ({ ...prev, done: false }));
    };
  }, [setGenerator]);
  return (
    <>
      <GoBack path="/" />
      <div style={{ width: '100%' }}>detail_{id}</div>
    </>
  );
}

export default DetailFundPage;