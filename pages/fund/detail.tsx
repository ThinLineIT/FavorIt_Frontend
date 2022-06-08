import { GoBack } from '@components/layout';
import { isLocalGenerator } from '@recoil/generate';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

function DetailFundPage() {
  const [generator, setGenerator] = useRecoilState(isLocalGenerator);
  useEffect(() => {
    return () => {
      setGenerator((prev) => ({ ...prev, done: false }));
    };
  }, []);
  return (
    <div style={{ width: '100%' }}>
      <GoBack path="/" />
      sex
    </div>
  );
}

export default DetailFundPage;
