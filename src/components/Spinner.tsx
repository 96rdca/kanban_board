/** @jsxImportSource @emotion/react */

import { css, keyframes } from '@emotion/react'
import React from 'react'

const rotate = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }`;
const cssStyle = {
    divCenter: css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        minHeight: '100vh',
        backgroundColor: '#b0bec5'
    }),
    loader: css({
        border: '10px solid #f3f3f3',
        borderTop: '10px solid #3498db',
        borderRadius: '50%',
        width: '80px',
        height: '80px',
        animation: `${rotate} 1s linear infinite`,
    }),
};

export const Spinner = () => {
  return (
    <div css={cssStyle.divCenter}>
        <div css={cssStyle.loader}></div>
    </div>
    
  )
}
