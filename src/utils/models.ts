import { ColumnType, Tag  } from "./enums";

export interface CardModel{
    id: string;
    title: string;
    description: string;
    tag: Tag,
    assignee: string;
    due_date: Date;
    column: ColumnType;
    color: string;
}