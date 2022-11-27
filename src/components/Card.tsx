import React from "react";
import { CardModel } from "../utils/models";

type CardProps = {
    index: number;
    card: CardModel;
};

function Card({index , card }: CardProps){
    return (
        <div>
            <h4>{card.title}</h4>
            <p>
            {card.description}
            </p>
            <p>
                {card.assignee}
            </p>
        </div>
    );
}

export default Card;