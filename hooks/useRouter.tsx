import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const useRouterEvent = () => {
  const router = useRouter();

  const [url, setUrl] = useState(() => router.asPath);

  const routeChangeStartHandler = (url: string) => {
    console.log(url, 'routeChangeStartHandler');
    // setUrl(url);
  };

  const beforeHistoryChangeHandler = (url: string) => {
    console.log(url, 'beforeHistoryChangeHandler');
    setUrl(url);
  };

  const hashChangeCompleteHandler = (url: string) => {
    console.log(url, 'hashChangeCompleteHandler');
    // setUrl(url);
  };

  useEffect(() => {
    const path = router.asPath;
    setUrl(path);
    // window.onpopstate = function (event) {
    //   console.log(event);
    //   event.preventDefault();
    // };
    router.events.on('routeChangeStart', routeChangeStartHandler);
    router.events.on('beforeHistoryChange', beforeHistoryChangeHandler);
    router.events.on('hashChangeComplete', hashChangeCompleteHandler);
    return () => {
      router.events.off('routeChangeStart', routeChangeStartHandler);
      router.events.off('beforeHistoryChange', beforeHistoryChangeHandler);
      router.events.off('hashChangeComplete', hashChangeCompleteHandler);
    };
  }, []);

  return { url, router };
};

export default useRouterEvent;
