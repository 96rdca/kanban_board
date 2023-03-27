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
import SkeletonCard from "./SkeletonCard";

const cssStyle = {
    header: css({
        marginBottom: '10px',
        fontSize: '18px',
        // borderRadius: '10px',
        // color: 'white',
        fontWeight: 'bold'
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
        backgroundColor: '#f5f5f5',
        border: '2px dashed #999',
        borderRadius: '4px',
        minHeight: '100px',
        padding: '10px'
        // flex: 1,
        // height: '50vh'
        // display: 'flex',
        // flexDirection: 'column',
        // height: '100vh',
    }),
    draggingOver: css({
        backgroundColor: '#e5e5e5',
        boxShadow: '0px 0px 4px 4px rgba(0, 0, 0, 0.1)'
    }),
    footer: css({
        marginTop: '10px',
        textAlign: 'center',
        padding: '8px',
        fontSize: '14px',
        color: '#666',
        borderBottomLeftRadius: '4px',
        borderBottomRightRadius: '4px',
        borderTop: '2px dashed #999'
    })
};

type Props = {
    cards: CardModel[];
    column: ColumnType;
    isLoading: boolean;
    handleSubmit?: (card: CardModel) => void;
    handleDelete?: (card: CardModel) => void;
}

function Column({ isLoading, cards, column, handleSubmit, handleDelete }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState<CardModel>()

    const handleEdit = (card: CardModel) => {
        setSelectedCard(card);
        setIsModalOpen(true)
    }

    const handledSubmit = (card: CardModel) => {
        if (handleSubmit)
            handleSubmit(card);

        setSelectedCard(undefined);
    }

    const handleOnRequestCloseModal = () => {
        setIsConfirmationOpen(false);
        setSelectedCard(undefined);
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
            <FormModal isOpen={isModalOpen} data={selectedCard} onRequestClose={() => setIsModalOpen(false)} handleSubmit={handledSubmit} />
            <ConfirmationModal isOpen={isConfirmationOpen} onRequestClose={handleOnRequestCloseModal} handleConfirmation={() => { if (handleDelete) handleDelete(selectedCard!) }} />

            <header css={cssStyle.header}>{column}</header>

            {column == ColumnType.TODO &&
                <button css={cssStyle.buttonAdd} onClick={handleCreate}>Add Task <RiAddFill style={{ marginBottom: "-3px" }} /></button>
            }

            <Droppable droppableId={column}>
                {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} >
                        <div>
                            {isLoading ? <SkeletonCard />
                                : cards.filter(card => card.column === column).map((card) =>
                                    <Card key={card.id} index={cards.indexOf(card)} card={card} onEdit={handleEdit} onDelete={onDelete} />)
                            }
                        </div>
                        {
                          !snapshot.draggingFromThisWith && !snapshot.isDraggingOver ?  
                          <div css={!snapshot.draggingFromThisWith && cssStyle.footer}>{!snapshot.draggingFromThisWith && 'Drop Here!'}</div> :

                          <div css={[snapshot.isDraggingOver && cssStyle.divDrop, snapshot.isDraggingOver && cssStyle.draggingOver]}>
                          {provided.placeholder}
                      </div>
                        }
                    </div>

                )}
            </Droppable>

        </div>
    );
}

export default Column;