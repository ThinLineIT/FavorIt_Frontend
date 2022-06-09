import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { GoBack } from '@components/layout';
import { isLocalGenerator } from '@recoil/generate';

function DetailFundPage() {
  const [generator, setGenerator] = useRecoilState(isLocalGenerator);

  useEffect(() => {
    return () => {
      setGenerator((prev) => ({ ...prev, done: false }));
    };
  }, [setGenerator]);
  return (
    <>
      <GoBack path="/" />
      <div style={{ width: '100%' }}>detail</div>
    </>
  );
}

export default DetailFundPage;
