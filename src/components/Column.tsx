/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { useState } from "react";
import { RiAddFill } from "react-icons/ri";
import { ColumnType } from "../utils/enums";
import { CardModel } from "../utils/models";
import Card from "./Card";
import FormModal from "./FormModal";
import { Droppable } from 'react-beautiful-dnd';
import ConfirmationModal from "./ConfirmationModal";

const cssStyle = {
    header: css({
        backgroundColor: '#1976d2',
        margin: '5px',
        padding: '10px',
        borderRadius: '10px',
        color: 'white',
        fontWeight: '500'
    }),
    buttonAdd: css({
        margin: '5px 10px 10px 10px',
        justifyItems: 'center',
        width: '25vw',
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
    }),
    divDrop: css({
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
    })
};

type Props = {
    cards: CardModel[];
    column: ColumnType;
    handleSubmit?: (card: CardModel) => void;
    handleDelete?: (card: CardModel) => void;
}

function Column({ cards, column, handleSubmit, handleDelete }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState<CardModel>()

    const handleEdit = (card: CardModel) => {
        setSelectedCard(card);
        setIsModalOpen(true)
    }

    const handleCreate = () => {
        setSelectedCard(undefined);
        setIsModalOpen(true);
    }

    const onDelete = (card: CardModel) => {
        setSelectedCard(card);
        setIsConfirmationOpen(true);
    }

    return (
        <div>
            <FormModal isOpen={isModalOpen} data={selectedCard} onRequestClose={() => setIsModalOpen(false)} handleSubmit={card => { if (handleSubmit) handleSubmit(card); setSelectedCard(undefined) }} />
            <ConfirmationModal isOpen={isConfirmationOpen} onRequestClose={() => { setIsConfirmationOpen(false); setSelectedCard(undefined) }} handleConfirmation={() => { if (handleDelete) handleDelete(selectedCard!) }} />

            <header css={cssStyle.header}>{column}</header>
            {column == ColumnType.TODO && <button css={cssStyle.buttonAdd} onClick={handleCreate}>Add Task <RiAddFill style={{ marginBottom: "-3px" }} /></button>}
            <Droppable droppableId={column}>
                {(provided: any) => (
                    <div css={cssStyle.divDrop} {...provided.droppableProps} ref={provided.innerRef} >
                        <div>
                            {cards.filter(card => card.column === column).map((card) =>
                                <Card key={card.id} index={cards.indexOf(card)} card={card} onEdit={handleEdit} onDelete={onDelete} />)
                            }
                        </div>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

        </div>
    );
}

export default Column;