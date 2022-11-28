/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import AppModal from './AppModal';

type Props = {
    isOpen: boolean;
    onRequestClose: () => void;
    handleConfirmation: () => void
}

const cssStyle = {
    form: css({
        maxWidth: '500px',
        font: '13px',
        padding: '20px 12px 10px 20px'
    }),
    div: css({
        padding: 0,
        display: 'block',
        margin: '10px 0 0 0'
    }),
    confirmBtn: css({
        margin: '20px 10px 10px 20px',
        justifyItems: 'center',
        cursor: 'pointer',
        fontWeight: 600,
        padding: '13px 25px',
        borderRadius: '15px',
        fontSize: '0.9rem',
        border: 'none',
        color: 'white',
        background: '#9a0007',
        transition: `all 0.25s ease`,
        '&:hover': {
            transform: `translateY(-5px)`,
            boxShadow: `0 10px 20px -10px rgba(24, 90, 219, 0.6)`
        }
    }),
    cancelBtn: css({
        margin: '20px 10px 10px 20px',
        justifyItems: 'center',
        cursor: 'pointer',
        fontWeight: 600,
        padding: '13px 25px',
        borderRadius: '15px',
        fontSize: '0.9rem',
        border: 'none',
        color: '#000',
        background: '#fff',
        transition: `all 0.25s ease`,
        '&:hover': {
            transform: `translateY(-5px)`,
            boxShadow: `0 10px 20px -10px rgba(24, 90, 219, 0.6)`
        }
    })
}

export default function ConfirmationModal({ isOpen, onRequestClose, handleConfirmation }: Props) {

    return (<div>{isOpen && <AppModal isOpen={isOpen} title='Delete Confirmation' onRequestClose={onRequestClose}>
        <div>
            <h5>Are you sure you want to delete this task?</h5>
        </div>
        <div>
            <button css={cssStyle.confirmBtn} type='button' onClick={() => { handleConfirmation(); onRequestClose() }}>Delete</button>
            <button css={cssStyle.cancelBtn} type='button' onClick={onRequestClose}>Cancel</button>
        </div>
    </AppModal>}</div>)
}

