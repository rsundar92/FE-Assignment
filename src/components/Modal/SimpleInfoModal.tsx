import React, { MouseEvent, useEffect, useState, CSSProperties } from "react";
import styled from "styled-components";
import Animated from "./Animated";
import ModalContainer from "./ModalContainer";

export const Modal = styled.div`
  overflow-y: auto;
  background-color: #1f2021ad;
  height: 100%;
`;

export const ModalBody = styled.div`
  width: 100%;
  height: 100vh;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  background: #ffffff;
  border: 1px solid #dedede;
  position: relative;
  border-radius: 24px;
  padding: 32px 40px;
`;

export const Close = styled.button`
  position: absolute;
  top: -45px;
  font-size: 14px;
  color: #ffffff;
  right: -45px;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: grey;
  border-radius: 16px;
`;

interface ISimpleInfoModalProps {
  isOpen?: boolean;
  onClose(): void;
  width?: number;
  borderRadius?: number;
  zIndex?: number;
  styles?: {
    contentStyles?: CSSProperties;
  };
  children?:
    | React.ReactNode
    | (({ closeModal }: { closeModal: () => void }) => void);
}

const SimpleInfoModal: React.FC<ISimpleInfoModalProps> = ({
  onClose,
  children,
  zIndex = 500,
  isOpen = true,
  styles = {},
}) => {
  const [modal, hideModal] = useState(isOpen);

  const { contentStyles = { width: "577px" } } = styles;

  useEffect(() => {
    hideModal(isOpen);
  }, [isOpen]);

  return (
    <ModalContainer zIndex={zIndex}>
      <Modal className="open">
        <Animated show={modal} onDestroy={onClose}>
          <ModalBody>
            <Content style={contentStyles}>
              <>
                <Close
                  onClick={(evt: MouseEvent<HTMLButtonElement>) => {
                    evt.stopPropagation();
                    hideModal(false);
                  }}
                >
                  <i className="nucleoinvest-close" />X
                </Close>
                {typeof children === "function"
                  ? children({ closeModal: () => hideModal(false) })
                  : children}
              </>
            </Content>
          </ModalBody>
        </Animated>
      </Modal>
    </ModalContainer>
  );
};

export default SimpleInfoModal;
