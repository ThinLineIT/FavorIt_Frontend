import { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import { Transition, TransitionGroup } from 'react-transition-group';

import { isShowModalState, modalComponentState } from '@recoil/layout';
interface TransitionWrapperProps {
  children: ReactNode;
  path: string;
}

const TransitionWrapper: React.FC<TransitionWrapperProps> = ({
  children,
  path,
}) => {
  const defaultStyle = {
    transition: `opacity ${50}ms ease-in-out`,
  };

  const transitionStyles = {
    entering: { opacity: 0.5 },
    entered: { opacity: 1 },
    exiting: { opacity: 1 },
    exited: { opacity: 1 },
    unmounted: { opacity: 1 },
  };

  const isShowModal = useRecoilValue(isShowModalState);
  const modalComponent = useRecoilValue(modalComponentState);

  return (
    <TransitionGroup>
      <Transition key={path} timeout={50}>
        {(state) => (
          <div
            style={{
              overflow: 'hidden',
              height: ' 100vh',
              position: 'relative',
              aspectRatio: '9 / 20',
              margin: '0 auto',
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            {children}
            {isShowModal && modalComponent}
          </div>
        )}
      </Transition>
    </TransitionGroup>
  );
};

export default TransitionWrapper;
