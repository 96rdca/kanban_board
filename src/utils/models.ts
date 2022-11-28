import { ColumnType  } from "./enums";

export interface CardModel{
    id: string;
    title: string;
    description: string;
    assignee: string;
    due_date: string;
    column: ColumnType;
    color: string;
}