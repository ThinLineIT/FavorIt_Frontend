export const util = '유틸';

export const dateToString = (date: Date) => {
  if (date) {
    return (
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      date.getDate().toString().padStart(2, '0')
    );
  }
};

export const copyTextUrl = () => {
  const { href } = window.location;
  navigator.clipboard.writeText(href).then(() => {
    alert('링크를 복사했습니다.');
  });
};
