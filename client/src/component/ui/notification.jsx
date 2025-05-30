import React from 'react';
import styled from 'styled-components';

const Notification = ({count}) => {
  return (
    <StyledWrapper count={count}>
      <div className="notification">
        <div className="bell-container">
          <div className="bell" />
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /*making bell shape with one div */
  .bell {
    border: 2.17px solid white;
    border-radius: 10px 10px 0 0;
    width: 15px;
    height: 17px;
    background: transparent;
    display: block;
    position: relative;
    top: -3px;
  }
  .bell::before,
  .bell::after {
    content: "";
    background: white;
    display: block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 2.17px;
  }
  .bell::before {
    top: 100%;
    width: 20px;
  }
  .bell::after {
    top: calc(100% + 4px);
    width: 7px;
  }
  /*container main styling*/
  .notification {
    background: transparent;
    border: none;
    padding: 15px 15px;
    border-radius: 50px;
    cursor: pointer;
    transition: 300ms;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /*notifications number with before*/
  .notification::before {
    content: "${(props) => props.count}";
    color: white;
    font-size: 10px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    right: 8px;
    top: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }
  /*container background hover effect*/
  .notification:hover {
    background: rgba(170, 170, 170, 0.062);
  }
  /*container animations*/
  .notification:hover > .bell-container {
    animation: bell-animation 650ms ease-out 0s 1 normal both;
  }
  /*bell ring and scale animation*/
  @keyframes bell-animation {
    20% {
      transform: rotate(15deg);
    }

    40% {
      transform: rotate(-15deg);
      scale: 1.1;
    }
    60% {
      transform: rotate(10deg);
      scale: 1.1;
    }
    80% {
      transform: rotate(-10deg);
    }
    0%,
    100% {
      transform: rotate(0deg);
    }
  }`;

export default Notification;
