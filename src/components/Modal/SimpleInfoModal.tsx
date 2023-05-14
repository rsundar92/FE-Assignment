import React, { useEffect, useState } from "react";
import Animated from "./Animated";
import ModalContainer from "./ModalContainer";

type TSimpleInfoModalProps = {
  isOpen?: boolean;
  onClose(): void;
  width?: number;
  zIndex?: number;
  children?:
    | React.ReactNode
    | (({ closeModal }: { closeModal: () => void }) => void);
};

const SimpleInfoModal: React.FC<TSimpleInfoModalProps> = ({
  onClose,
  children,
  zIndex = 500,
  isOpen = true,
}) => {
  const [modal, hideModal] = useState(isOpen);

  useEffect(() => {
    hideModal(isOpen);
  }, [isOpen]);

  return (
    <ModalContainer zIndex={zIndex}>
      <div className="overflow-y-auto bg-[#1f2021ad] h-screen">
        <Animated show={modal} onDestroy={onClose}>
          <div className="w-full h-screen flex items-center justify-center">
            <div className="bg-white relative rounded-lg py-8 px-10 w-1/3">
              <>
                <div
                  onClick={(evt) => {
                    evt.stopPropagation();
                    hideModal(false);
                  }}
                  className="absolute w-8 h-8 flex justify-center items-center bg-white text-gray-500 rounded-full -top-10 -right-8 hover:cursor-pointer"
                >
                  <i className="nucleoinvest-close" />X
                </div>

                {typeof children === "function"
                  ? children({ closeModal: () => hideModal(false) })
                  : children}
              </>
            </div>
          </div>
        </Animated>
      </div>
    </ModalContainer>
  );
};

export default SimpleInfoModal;
