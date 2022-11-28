/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import uuid from 'react-uuid';
import Column from './components/Column';
import { Spinner } from './components/Spinner';
import { ColumnType } from './utils/enums';
import { CardModel } from './utils/models';

const MOCK_CARDS: CardModel[] = [
  {
    id: uuid(),
    title: 'First task',
    assignee: 'Dalinton',
    description: 'Lorem ipsum',
    due_date: '2022-11-03',
    color: '#ffa500',
    column: ColumnType.TODO,
  }, {
    id: uuid(),
    title: 'Fix Task Modal',
    assignee: 'Brito',
    description: 'saving the second time',
    due_date: '2022-11-03',
    color: '#008000',
    column: ColumnType.IN_PROGRESS,
  }, {
    id: uuid(),
    title: 'Completed Task',
    assignee: 'Richard',
    description: 'Lorem ipsum',
    due_date: '2022-11-03',
    color: '#1e90ff',
    column: ColumnType.COMPLETED,
  }
];

const FETCHING_DELAY_MILISECONDS = 5000;

const mainCSS = {
  app: css({
    textAlign: 'center',
    backgroundColor: '#6699CC',
    minHeight: '100vh',
    minWidth: '100vw'
  }),
  header: css({
    backgroundColor: '#6699CC',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 1vmin)',
    color: 'white',
  }),
  divColumns: css({
    display: 'flex',
    columns: 3,
    padding: '1rem',
    flex: 1,
    // backgroundColor: '#c1d5e0'
  }),
  divColum: css({ flex: 1 })
}

function App() {
  const [cards, setCards] = useState<CardModel[]>([])
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchCards = () => {
      if (!localStorage.getItem('cards'))
        localStorage.setItem('cards', JSON.stringify(MOCK_CARDS));

      const jsonCards = JSON.parse(localStorage.getItem('cards')!);
      setCards(jsonCards as CardModel[]);
    }

    setTimeout(() => {
      setIsFetching(false);
      fetchCards()
    }, FETCHING_DELAY_MILISECONDS);
  }, [])

  useEffect(() => {
    if (!isFetching)
      localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards])

  const handleSubmit = (card: CardModel) => {
    const currentCard = cards.find(_card => _card.id === card.id);
    const _cards = [...cards];

    if (currentCard) {
      const currentCardIndex = cards.indexOf(currentCard);
      _cards.splice(currentCardIndex, 1, card);
    } else {
      _cards.push(card);
    }

    setCards(_cards);
  }

  const handleDelete = (card: CardModel) => {
    console.log('deleting', card)
    const _cards = [...cards];
    const currentCardIndex = _cards.indexOf(card);

    _cards.splice(currentCardIndex, 1);
    setCards(_cards);
  }

  const [columns] = useState<any>(Object.keys(ColumnType))

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination || (source.droppableId === destination.droppableId && destination.index === source.index))
      return null;

    const start = source.droppableId;
    const end = destination.droppableId;

    const _cards = [...cards];
    const newList = _cards.filter((_: any, idx: number) => idx !== source.index)

    if (start !== end) {
      const newcard = _cards[source.index];
      newcard.column = end as ColumnType;
      newList.push(newcard);
    } else {
      newList.splice(destination.index, 0, _cards[source.index])
    }
    setCards(newList);
  };

  if (isFetching)
    return (<Spinner />);

  return (
    <div css={mainCSS.app}>
      <header css={mainCSS.header}>
        <h1>Kanban Board</h1>
      </header>
      <div css={mainCSS.divColumns}>
        <DragDropContext onDragEnd={onDragEnd}>
          {columns.map((_: any, key: any) =>
            <div css={mainCSS.divColum}>
              <Column cards={cards} column={Object.values(ColumnType)[key]} handleSubmit={handleSubmit} handleDelete={handleDelete} />
            </div>)}
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
