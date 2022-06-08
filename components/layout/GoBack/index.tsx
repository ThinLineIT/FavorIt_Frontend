import styled from '@emotion/styled';
import { useRouter } from 'next/router';

interface BackProps {
  path?: string;
}

function GoBack({ path }: BackProps) {
  const router = useRouter();
  const onClick = () => {
    if (path) {
      router.push(path);
    }
    router.back();
  };
  return (
    <Button onClick={onClick}>
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 19l-7-7 7-7"
        ></path>
      </svg>
    </Button>
  );
}

export default GoBack;

const Button = styled.button`
  position: fixed;
  top: 0;
  max-width: 640px;
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom-width: 1px;
  background-color: white;
  padding-left: 0.8rem;
  padding-right: 0 2.5rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 500;
  color: gray;

  > svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;
