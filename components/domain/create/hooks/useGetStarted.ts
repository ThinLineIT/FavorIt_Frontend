import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import siteMetadata from '@constants/sitemap';

function useGetStarted() {
  const router = useRouter();
  const [labelString, setLabelString] = useState('');
  const { id, name, price, present, banking } = router.query;

  const isFromPresent = Boolean(present);
  const isFromBanking = Boolean(banking);

  const copyTextUrl = () => {
    const baseUrl = `${siteMetadata.siteUrl}fund/${id}`;
    navigator.clipboard.writeText(baseUrl).then(() => {
      alert('링크를 복사했습니다.');
    });
  };

  const handleRouteDetail = () => router.replace(`/fund/${id}`);

  const handleCreateNewFunding = () => router.replace('/fund/create');

  useEffect(() => {
    if (isFromPresent) {
      setLabelString(`${name}에 \n ${price} 원을 선물했어요!`);
    } else if (isFromBanking) {
      setLabelString(`정산 완료되었습니다! \n 좋은 선물 사세요 😆`);
    } else {
      setLabelString(
        '펀딩이 시작되었습니다. \n 링크를 공유하여 펀딩을 받으세요!',
      );
    }
  }, [isFromBanking, isFromPresent, name, price]);

  return {
    id,
    labelString,
    isFromBanking,
    copyTextUrl,
    handleRouteDetail,
    handleCreateNewFunding,
  };
}

export default useGetStarted;
