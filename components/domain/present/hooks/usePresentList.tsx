import { useCallback, useState, useEffect, useMemo } from 'react';

const usePresentList = (presentList: any) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [processedData, setProcessedData] = useState<any>([]);
  const lastIndex = useMemo(() => processedData.length - 1, [processedData]);

  const listIndexing = () => {
    const pageCount = Math.floor(presentList.length / 9) + 1;
    const pagedData = [];

    for (let i = 0; i < pageCount; i++) {
      const startIndex = i * 9;
      const pageData = presentList.slice(startIndex, startIndex + 9);
      pagedData.push(pageData);
    }

    setProcessedData(pagedData);
  };

  const moveToNextPage = () => setPageIndex(pageIndex + 1);
  const moveToPreviosPage = () => setPageIndex(pageIndex - 1);

  useEffect(() => {
    listIndexing();
  }, []);

  return {
    lastIndex,
    pageIndex,
    processedData,
    moveToNextPage,
    moveToPreviosPage,
  };
};

export default usePresentList;
