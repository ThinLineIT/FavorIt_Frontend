import { useRouter } from 'next/router';
import siteMetadata from '@constants/sitemap';

function useGetStarted() {
  const router = useRouter();
  const { id, name, price } = router.query;
  const isFromPresent = Boolean(name || price);
  const labelString = isFromPresent
    ? `${name}에 \n ${price} 원을 선물했어요!`
    : '펀딩이 시작되었습니다. \n 링크를 공유하여 펀딩을 받으세요!';

  const copyTextUrl = () => {
    const baseUrl = `${siteMetadata.siteUrl}fund/${id}`;
    navigator.clipboard.writeText(baseUrl).then(() => {
      alert('링크를 복사했습니다.');
    });
  };

  const handleRouteDetail = () => router.replace(`/fund/${id}`);

  return { id, labelString, copyTextUrl, handleRouteDetail };
}

export default useGetStarted;
