import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

type ModalContainerProps = {
  children?: React.ReactNode | (({ scrollTop }: { scrollTop: number }) => void);
  backdrop?: boolean;
  className?: string;
  zIndex?: number;
};

const ModalContainer: React.FC<ModalContainerProps> = ({ children }) => {
  const scrollTop = document.documentElement.scrollTop;
  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, []);

  const modalRoot = document.getElementById("modal-root") as HTMLElement;
  return ReactDOM.createPortal(
    <div className="absolute w-full h-full p-0 min-h-full z-50 top-0 shadow-md">
      <>
        {typeof children === "function" && children({ scrollTop })}
        {children && children}
      </>
    </div>,
    modalRoot
  );
};

export default ModalContainer;

export const FullScreenModal = styled.div`
  bottom: -100%;
  overflow-y: auto;
  background-color: #eaecf3;
  height: 100%;
`;
