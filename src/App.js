import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/singleCard'


const cardImages = [
  {"src": "./img/helmet.png", matched: false},
  {"src": "./img/potion.png", matched: false},
  {"src": "./img/ring.png", matched: false},
  {"src": "./img/scroll.png", matched: false},
  {"src": "./img/shield.png", matched: false},
  {"src": "./img/sword.png", matched: false}
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  
  //suffle cards
  const suffleCards = () => {
    const suffledCards = [...cardImages, ...cardImages]
      .sort (() => Math.random() -  0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(suffledCards)
    setTurns(0) 
  }
  // handle choice 
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //compoare 2 choices
  useEffect(() => {

    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) { 
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src) {
              return {...card, matched:true}
            } else {
              return card
            }
          })
        }

        )
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1400)
      }
    }
  }, [choiceOne, choiceTwo])


  // reset choises and increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }
  
  // start new game automatically
  useEffect(() => {
    suffleCards()
  },[])
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick ={suffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id}  
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled ={disabled}
          />
        ))}
      </div>
     
     <p className="turns">Number of Tunrs : {turns}</p>
    </div>
  );
}

export default App