import React from "react";
import { animated, useTransition } from "react-spring";

type AnimatedProps = {
  show: boolean;
  onDestroy?: () => void;
  height?: string;
  children?: React.ReactNode;
};

const Animated: React.FC<AnimatedProps> = ({
  show,
  children,
  onDestroy,
  height = "100%",
}) => {
  const transitions = useTransition(show, {
    enter: { transform: "translate3d(0,0px,0)" },
    from: { transform: "translate3d(0,-100%,0)" },
    leave: { transform: "translate3d(0,-1000%,0)", opacity: 0.5 },
    onDestroyed: () => onDestroy && onDestroy(),
  });

  const transitioned = transitions((props, item, t) => (
    <>
      {item && (
        <animated.div key={t.key} style={{ ...props, height }}>
          {children}
        </animated.div>
      )}
    </>
  ));

  return <>{transitioned}</>;
};

export default Animated;
