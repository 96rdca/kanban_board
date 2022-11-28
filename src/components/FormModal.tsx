/** @jsxImportSource @emotion/react */

import uuid from 'react-uuid';
import React, { useEffect, useState } from 'react'
import { ColumnType } from '../utils/enums';
import { CardModel } from '../utils/models';
import AppModal from './AppModal'
import { css } from '@emotion/react';

type Props = {
    data?: CardModel;
    handleSubmit?: (data: CardModel) => void;
    isOpen: boolean;
    onRequestClose?: () => void;
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
    label: css({
        margin: '0px 0px 10px 0px',
        display: 'block',
        fontWeight: 'bold',
        width: '100px',
        float: 'left',
        paddingTop: '8px',
        paddingRight: '5px'
    }),
    input: css({
        width: '48%',
        height: '35px',
        boxSizing: 'border-box',
        border: '1px solid #C2C2C2',
        boxShadow: '1px 1px 4px #EBEBEB',
        borderRadius: '3px',
        padding: '7px',
        outline: 'none'
    }),
    inputColor: css({
        width: '48%',
        height: '38px',
        boxSizing: 'border-box',
        border: '1px solid #C2C2C2',
        boxShadow: '1px 1px 4px #EBEBEB',
        borderRadius: '3px',
        padding: '7px',
        outline: 'none'
    }),
    saveBtn: css({
        margin: '20px 10px 10px 20px',
        justifyItems: 'center',
        cursor: 'pointer',
        fontWeight: 600,
        padding: '13px 25px',
        borderRadius: '15px',
        fontSize: '0.9rem',
        border: 'none',
        color: 'white',
        background: '#326b9b',
        transition: `all 0.25s ease`,
        '&:hover': {
            transform: `translateY(-5px)`,
            boxShadow: `0 10px 20px -10px rgba(24, 90, 219, 0.6)`
        }
    })
}

export default function FormModal({ data, handleSubmit, isOpen, onRequestClose }: Props) {
    const defaultData: CardModel = { id: uuid(), title: '', description: '', assignee: '', due_date: new Date().toDateString(), color: '#000000', column: ColumnType.TODO };
    const [formValue, setFormValue] = useState(defaultData)

    useEffect(() => {
        if (data) return setFormValue(data);
        setFormValue(defaultData);
    }, [data])

    return (
        <div>
            {isOpen && <AppModal isOpen={isOpen} onRequestClose={onRequestClose} title={`${data ? 'Edit' : 'Create'} Task`}>
                <form>
                    <div css={cssStyle.div}>
                        <label css={cssStyle.label} htmlFor='title'>Title</label>
                        <input css={cssStyle.input} type="text" name="title" id="title" placeholder='a placeholder' value={formValue.title} onChange={
                            (event) => setFormValue(value => ({ ...value, title: event.target.value }))} />
                    </div>
                    <div css={cssStyle.div}>
                        <label css={cssStyle.label} htmlFor='description'>Description</label>
                        <input css={cssStyle.input} type="textarea" name="description" id="description" placeholder='a placeholder' value={formValue.description} onChange={
                            (event) => setFormValue(value => ({ ...value, description: event.target.value }))} />
                    </div>
                    <div css={cssStyle.div}>
                        <label css={cssStyle.label} htmlFor='asignee'>Asignee</label>
                        <input css={cssStyle.input} type="text" name="asignee" id="asignee" placeholder='a placeholder' value={formValue.assignee} onChange={
                            (event) => setFormValue(value => ({ ...value, assignee: event.target.value }))} />
                    </div>
                    <div css={cssStyle.div}>
                        <label css={cssStyle.label} htmlFor='dueDate'>Due Date</label>
                        <input css={cssStyle.input} type="date" name="dueDate" id="dueDate" value={formValue.due_date.toString()} onChange={
                            (event) => setFormValue(value => ({ ...value, due_date: event.target.value.toString() }))} />
                    </div>
                    <div css={cssStyle.div}>
                        <label css={cssStyle.label} htmlFor='color'>Color</label>
                        <input css={cssStyle.inputColor} type="color" name="color" id="color" value={formValue.color} onChange={
                            (event) => setFormValue(value => ({ ...value, color: event.target.value }))} />
                    </div>
                    <div css={cssStyle.div}>
                        <label css={cssStyle.label} htmlFor='column'>Type</label>
                        <select css={cssStyle.input} name="column" id="column" value={formValue.column} onChange={
                            (event) => setFormValue(value => ({ ...value, column: event.target.value as ColumnType }))}>
                            {Object.keys(ColumnType).map((_, key) => <option key={key} value={Object.values(ColumnType)[key]}>{Object.values(ColumnType)[key]}</option>)}
                        </select>
                    </div>
                    <button css={cssStyle.saveBtn} type='button' onClick={() => { if (handleSubmit) handleSubmit(formValue); setFormValue(defaultData); if (onRequestClose) onRequestClose(); }}>Save</button>
                </form>
            </AppModal>}
        </div>
    )
}
