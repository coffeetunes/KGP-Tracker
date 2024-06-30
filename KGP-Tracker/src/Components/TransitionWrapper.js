import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useLocation } from 'react-router-dom';
import '../styles/TransitionWrapper.scss'

const TransitionWrapper = ({ children }) => {
    const location = useLocation();

    return (
        <TransitionGroup>
            <CSSTransition
                key={location.key}
                classNames="blur"
                timeout={300}
            >
                {children}
            </CSSTransition>
        </TransitionGroup>
    );
};

export default TransitionWrapper;
