import { useSetRecoilState } from 'recoil';
import { isLocalGenerator } from '@recoil/generate';

function Crolling() {
  const setGenerator = useSetRecoilState(isLocalGenerator);
  const handleClick = () => {
    setGenerator((prev: any) => ({ ...prev, page: prev.page + 1 }));
  };

  return (
    <div
      onClick={handleClick}
      style={{
        backgroundColor: 'rgba(0,0,0,0.1)',
        width: '250px',
        height: '250px',
        cursor: 'pointer',
      }}
    >
      <input type="text" placeholder="상품 링크를 입력해주세요" />
    </div>
  );
}

export default Crolling;
