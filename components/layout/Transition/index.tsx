import { ReactNode } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';

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

  return (
    <TransitionGroup>
      <Transition key={path} timeout={50}>
        {(state) => (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            {children}
          </div>
        )}
      </Transition>
    </TransitionGroup>
  );
};

export default TransitionWrapper;
