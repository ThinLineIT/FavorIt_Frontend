import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

// 사용할 때
// @Note 추후에 스켈레톤 컴포넌트 만들기
// <Suspense
//     fallback={
//       <DeferredComponent>
//         <HomeSkeleton />
//       </DeferredComponent>
//     }
//   >
//     <CategoryList />
//   </Suspense>

interface PropsWithChildren {
  children: ReactNode;
}

const DeferredComponent = ({ children }: PropsWithChildren) => {
  const [isDeferred, setIsDeferred] = useState(false);
  useEffect(() => {
    // 200ms 지난 후 children Render
    const timeoutId = setTimeout(() => {
      setIsDeferred(true);
    }, 200);
    return () => clearTimeout(timeoutId);
  }, []);
  if (!isDeferred) {
    return null;
  }
  return <>{children}</>;
};

export default DeferredComponent;
