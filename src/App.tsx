import { useState } from 'react'
import './App.css'
import { createApp } from 'veloxi'
import { DemoPlugin } from './DemoPlugin.ts'
import { useOnMountUnsafe } from './useOnMountUnsafe.ts'

const app = createApp()
app.run()

function idGenerator() {
  let id = 3
  return function () {
    return id++
  }
}

const getNewId = idGenerator()

interface Card {
  id: string
  content: string
}

function App() {
  useOnMountUnsafe(() => {
    app.addPlugin(DemoPlugin)
  })

  const [cards, setCards] = useState<Card[]>([
    { id: '0', content: '1' },
    { id: '1', content: '2' },
    { id: '2', content: '3' }
  ])

  function addCard() {
    const newCard = {
      id: `${getNewId()}`,
      content: `${Math.round(Math.random() * 100)}`
    }
    setCards([...cards, newCard])
  }

  function removeCard(cardId: string) {
    setCards(cards.filter(card => card.id !== cardId))
  }

  return (
    <>
      <div id="app">
        <button className="add-card" onClick={addCard}>+ New Card</button>
        <div className="cards">
          {cards.map((card) => (
            <div
              className="card"
              key={card.id}
              data-vel-plugin="DemoPlugin"
              data-vel-view="card"
              onClick={() => removeCard(card.id)}
            >
              {card.content}
            </div>
          ))}
        </div>
      </div >
    </>
  )
}

export default App
