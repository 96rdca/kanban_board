/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { ColumnType, Tag } from "../utils/enums";
import { CardModel } from "../utils/models";
// import React from "react";
import Card from "./Card";

const mockCards: CardModel[] =[
    {
        assignee: 'ASsignee',
        column: ColumnType.TODO,
        description: 'Description',
        due_date: new Date(),
        color: '',
        id: '1',
        tag: Tag.LONG_FORM,
        title: 'title'
    }, {
        assignee: 'ASsignee',
        column: ColumnType.TODO,
        description: 'Description',
        due_date: new Date(),
        color: '',
        id: '2',
        tag: Tag.SEO,
        title: 'title'
    }, {
        assignee: 'ASsignee',
        column: ColumnType.TODO,
        description: 'Description',
        due_date: new Date(),
        color: '',
        id: '3',
        tag: Tag.BLOG_POST,
        title: 'title'
    }
];


const columnCss = {
    column: css({
        backgroundColor: ''
    })
};

function Column({column} : {column: ColumnType}){
    const ColumnTasks = mockCards.map(( card ,index ) => 
         <Card key={card.id} card={card} index={index} />
    );

    return (
        <div>
            <header>{column}</header>
            {column == ColumnType.TODO && <button>Add (+)</button>}
            <div css={columnCss.column}>
                {ColumnTasks}
            </div>
        </div>
    );
}

export default Column;