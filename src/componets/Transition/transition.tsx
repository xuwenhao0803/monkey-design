import React from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName =
  | "zoom-in-top"
  | "zoom-in-left"
  | "zoom-in-buttom"
  | "zoom-in-right";

interface TransitionProps   {
  animationName?: AnimationName;
  wapper?:boolean;
  classNames?:any
}



const Transition: React.FC<TransitionProps | CSSTransitionProps> = (props) => {
  const { animationName, children, classNames,wapper, ...restProps } = props;
  const addEndListener=()=>{

  }
  return (
    <CSSTransition
      classNames={classNames ? classNames : animationName}
      {...restProps}
      addEndListener={addEndListener}
    >
      {wapper?(<div>{children}</div>):children}
    </CSSTransition>
  );
};
Transition.defaultProps={
    
}
Transition.defaultProps={
  unmountOnExit :true,
  appear:true
}

export default Transition;