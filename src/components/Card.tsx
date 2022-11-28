/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { Draggable } from 'react-beautiful-dnd';
import { RiDeleteBin2Fill, RiEditBoxFill } from "react-icons/ri";
import { CardModel } from "../utils/models";

type CardProps = {
    index: number,
    card: CardModel;
    onEdit?: (card: CardModel) => void;
    onDelete?: (card: CardModel) => void;
};

const cssStyle = {
    header: css({
        display: 'flex',
        justifyContent: 'space-around',
        justifyItems: 'stretch',
        flex: 1,
        paddingBottom: '10px'
    }),
    description: css({
        display: 'block',
        textAlign: 'justify',
        justifyItems: 'stretch',
        marginBottom: '2rem',
    }),
    card: css({
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.3)',
        transition: '0.3s',
        borderRadius: '1rem',
        marginTop: '5px',
        padding: '2px 16px',
        margin: '5px',
        '&:hover': {
            boxShadow: '0 10px 20px 0 rgba(0,0,0,0.5)'
        }
    }),
    rowAction: css({
        display: 'flex',
        justifyContent: 'end',
        flex: 1
    }),
    actions: css({
        cursor: 'pointer',
        fontWeight: 500,
        padding: `4px 8px`,
        marginRight: '3px',
        marginBottom: '10px',
        borderRadius: '8px',
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: '18px',
        color: '#2c3e50',
        transition: 'all 0.25s ease',
        boxShadow: `0 5px 20px 0 rgba(0, 0, 0, 0.06)`,
        top: 0,
        alignSelf: 'flex-end',
        '&:hover': {
            boxshadow: `0 5px 20px 0 rgba(0, 0, 0, 0.04)`,
            transform: `translate(-4px, 4px)`
        }
    })
}

function Card({ index, card, onEdit, onDelete }: CardProps) {
    return (
        <Draggable draggableId={card.id} index={index}>
            {provided => (
                <div ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <div css={cssStyle.card} style={{ backgroundColor: card.color }}>
                        <div css={cssStyle.header}>
                            <h4>{card.title}</h4>
                            <div css={cssStyle.rowAction}>
                                <button css={cssStyle.actions} onClick={() => onEdit && onEdit(card)}><RiEditBoxFill color="white" size='25' /></button>
                                <button css={cssStyle.actions} onClick={() => onDelete && onDelete(card)}><RiDeleteBin2Fill color='white' size='25' /></button>
                            </div>
                        </div>
                        <div css={cssStyle.description}>
                            {card.description}
                        </div>
                        <div css={cssStyle.header}>
                            <span>{card.assignee}</span>
                            <span>{card.due_date}</span>
                        </div>
                    </div>
                </div>)}
        </Draggable>
    );
}

export default Card;