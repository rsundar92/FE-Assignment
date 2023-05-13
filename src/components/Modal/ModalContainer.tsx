import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import styled from "styled-components";

export const BaseModal = styled.div`
  position: absolute;
  width: 100%;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12);
  height: 100%;
  padding: 0;
  z-index: 500;
  min-height: 100%;
`;

type ModalContainerProps = {
  children?: React.ReactNode | (({ scrollTop }: { scrollTop: number }) => void);
  backdrop?: boolean;
  className?: string;
  zIndex?: number;
};

const ModalContainer: React.FC<ModalContainerProps> = ({
  children,
  backdrop = false,
  className = "",
  zIndex = 500,
}) => {
  const scrollTop = document.documentElement.scrollTop;
  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, []);

  const modalRoot = document.getElementById("modal-root") as HTMLElement;
  return ReactDOM.createPortal(
    <BaseModal
      className={className}
      style={{
        top: `${scrollTop}px`,
        backgroundColor: backdrop ? "rgba(0,0,0,0.4)" : "inherit",
        zIndex,
      }}
    >
      <>
        {typeof children === "function" && children({ scrollTop })}
        {children && children}
      </>
    </BaseModal>,
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
