import React from 'react';
import styled from 'styled-components';

const NotificationContent = ({id,type}) => {
  return (
    <StyledWrapper>
      <div className="notifications-container">
        <div className="success">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="succes-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            {type === "success" && (
                <div className="success-prompt-wrap">
              <p className="success-prompt-heading">Request Approved 
              </p><div className="success-prompt-prompt">
                <p>Congratulations! Your Leave (ID : {id}) has been approved!</p>
              </div>
              <div className="success-button-container">
                <button type="button" className="success-button-main">Download GatePass</button>
                <button type="button" className="success-button-secondary">Dismiss</button>
              </div>
            </div>
                
              )
}
            {type === "warning" && (
               <div className="error-prompt-wrap">
              <p className="error-prompt-heading">Request Declined
              </p><div className="error-prompt-prompt">
                <p>Your HOD has declined the request for leave form {id}</p>
              </div>
              <div className="error-button-container">
                <button type="button" className="error-button-secondary">Dismiss</button>
              </div>
            </div>
            )}

          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .notifications-container {
    width: 320px;
    height: auto;
    font-size: 0.875rem;
    line-height: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .flex {
    display: flex;
  }

  .flex-shrink-0 {
    flex-shrink: 0;
  }

  .success {
    padding: 1rem;
    border-radius: 0.375rem;
    background-color: rgb(240 253 244);
  }

  .error {
    padding: 1rem;
    border-radius: 0.375rem;
    background-color: rgb(254 202 202);
  }

  .error-svg {
    color: rgb(239 68 68);
    width: 1.25rem;
    height: 1.25rem;
  }

  .error-prompt-wrap {
    margin-left: 0.75rem;
  }

  .error-prompt-heading {
    font-weight: bold;
    color: rgb(185 28 28);
  }

  .error-prompt-prompt {
    margin-top: 0.5rem;
    color: rgb(185 28 28);
  }

  .error-button-container {
    display: flex;
    margin-top: 0.875rem;
    margin-bottom: -0.375rem;
    margin-left: -0.5rem;
    margin-right: -0.5rem;
  }

  .error-button-main {

    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    background-color: #FEF2F2;
    color: rgb(185 28 28);
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: bold;
    border-radius: 0.375rem;
    border: none;
  }

  .error-button-main:hover {
    background-color: #FEE2E2;
  }

  .error-button-secondary {
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin-left: 0.75rem;
    background-color: #FEF2F2;
    color: #991B1B;
    font-size: 0.875rem;
    line-height: 1.25rem;
    border-radius: 0.375rem;
    border: none;
  }



  .succes-svg {
    color: rgb(74 222 128);
    width: 1.25rem;
    height: 1.25rem;
  }

  .success-prompt-wrap {
    margin-left: 0.75rem;
  }

  .success-prompt-heading {
    font-weight: bold;
    color: rgb(22 101 52);
  }

  .success-prompt-prompt {
    margin-top: 0.5rem;
    color: rgb(21 128 61);
  }

  .success-button-container {
    display: flex;
    margin-top: 0.875rem;
    margin-bottom: -0.375rem;
    margin-left: -0.5rem;
    margin-right: -0.5rem;
  }

  .success-button-main {
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    background-color: #ECFDF5;
    color: rgb(22 101 52);
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: bold;
    border-radius: 0.375rem;
    border: none
  }

  .success-button-main:hover {
    background-color: #D1FAE5;
  }

  .success-button-secondary {
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin-left: 0.75rem;
    background-color: #ECFDF5;
    color: #065F46;
    font-size: 0.875rem;
    line-height: 1.25rem;
    border-radius: 0.375rem;
    border: none;
  }`;

export default NotificationContent;
