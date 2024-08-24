import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Cards = () => {
    const deckId = useRef();
    const [cards, setCards] = useState([]);

    useEffect(() => {
        async function shuffleDeck() {
            const response = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
            console.log(response.data);
            deckId.current = response.data.deck_id;
            console.log(deckId.current);
        }
        shuffleDeck();
    }, []);

    async function drawCard() {
        const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId.current}/draw/?count=1`);
        console.log(response.data);
        setCards([...cards, response.data.cards[0].image]);
    }

    return (
        <div>
        <h1>Cards</h1>

        <button onClick={drawCard}>Draw Card</button>
        </div>
    );
}; 

export default Cards;
