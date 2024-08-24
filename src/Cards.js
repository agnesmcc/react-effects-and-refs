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
        if (response.data.error === "Not enough cards remaining to draw 1 additional") {
            alert("Error: no cards remaining!");
            return;
        }
        const card = response.data.cards[0];
        setCards([...cards, card]);
    }

    return (
        <div>
        <h1>Cards</h1>
        <button onClick={drawCard}>Draw Card</button>
        <div>
            {cards.map(card => <img key={card.code} src={card.image} alt={card.code} style={{height: 100}}/>)}
        </div>
        </div>
    );
}; 

export default Cards;
