import React, { useState, useEffect } from 'react'

const Characters = () => {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results)
        setCharacters(data.results)
      })
  }, [])

  return (
    <div className='characters'>
      {characters.map((character) => (
        <div key={character.id} className='character'>
          <div className='character__image'>
            <img src={character.image} alt={character.name} />
          </div>
          <div className='character__details'>
            <h2 className='character__name'>{character.name}</h2>
            <div className='character__species'>
              Species: <em>{character.species}</em>
            </div>
            <div className='character__status'>
              Status: <em>{character.status}</em>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Characters
