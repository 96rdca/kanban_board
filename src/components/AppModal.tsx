/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { ReactNode } from 'react';
import { RiCloseLine } from "react-icons/ri";

type PropModal = {
  children: ReactNode;
  isFullScreen?: boolean
  isOpen: boolean;
  onRequestClose?: () => void;
  title?: string;
}

const cssStyle = {
  darkBg: css({
      backgroundColor: `rgba(0, 0, 0, 0.2)`,
      width: '100vw',
      height: '100vh',
      zIndex: 0,
      top: '50%',
      left: '50%',
      transform: `translate(-50%, -50%)`,
      position: 'absolute'
  }),
  centered:css({
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`
  }),
  modal: css({
    width: '500px',
    height: '400px',
    background: 'white',
    color: 'white',
    zIndex: 11,
    borderRadius: '16px',
    boxShadow: '0 5px 20px 0 rgba(0, 0, 0, 0.04)'
  }),
  modalHeader: css({
    height: '50px',
  background: 'white',
  overflow: 'hidden',
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px'
  }),
  heading: css({
    margin: 0,
  padding: '10px',
  color: '#2c3e50',
  fontWeight: 500,
  fontSize: '18px',
  textAlign: 'center'
  }),
  closeBtn: css({
    cursor: 'pointer',
    fontWeight: 500,
    padding: `4px 8px`,
    borderRadius: '8px',
    border: 'none',
    fontSize: '18px',
    color: '#2c3e50',
    background: 'white',
    transition: 'all 0.25s ease',
    boxShadow: `0 5px 20px 0 rgba(0, 0, 0, 0.06)`,
    position: 'absolute',
    right: 0,
    top: 0,
    alignSelf: 'flex-end',
    marginTop: '-7px',
    marginRight: '-7px',
    '&:hover':{
      boxshadow: `0 5px 20px 0 rgba(0, 0, 0, 0.04)`,
      transform: `translate(-4px, 4px)`
    }
  }),
  modalContent: css({
    margin: '10px',
    maxWidth: '500px',
    color: '#2c3e50',
    textAlign: 'start'
  })
};

const AppModal = ({ children, isFullScreen = false, isOpen, onRequestClose, title }: PropModal) => {
  return (
    <>
    <div css={cssStyle.darkBg} onClick={onRequestClose} />
      <div css={cssStyle.centered}  >
      <div css={cssStyle.modal}  >
        <div css={cssStyle.modalHeader}>
          <h1 css={cssStyle.heading}>{title}</h1>
          <button css={cssStyle.closeBtn} onClick={onRequestClose}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
        </div>
        <div css={cssStyle.modalContent}>
          {children}
        </div>
      </div>
      </div>
    </>
  )
}

export default AppModal;
