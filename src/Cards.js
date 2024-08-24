import React, { useEffect, useRef } from "react";
import axios from "axios";

const Cards = () => {
    const deckId = useRef();

    useEffect(() => {
        async function shuffleDeck() {
            const response = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
            console.log(response.data);
            deckId.current = response.data.deck_id;
            console.log(deckId.current);
        }
        shuffleDeck();
    }, []);

    return <div>Cards</div>;
}; 

export default Cards;
