import { ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }: { children: ReactNode }) => {
  const portalRef = useRef<HTMLElement>(document.getElementById('portal'));

  if (portalRef.current !== null) {
    return createPortal(<>{children}</>, portalRef.current);
  }

  return null;
};

export default Portal;
