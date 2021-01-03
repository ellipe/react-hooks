import React, {
  useState,
  useEffect,
  useReducer,
  useMemo,
  useRef,
  useCallback,
} from 'react'
import Search from './Search'

const initialState = {
  favorites: [],
}

const favoritesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITES':
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      }
    case 'REMOVE_FROM_FAVORITES':
      const filteredCharacters = state.favorites.filter(
        (child) => child.id !== action.payload.id
      )
      return {
        ...state,
        favorites: filteredCharacters,
      }
    default:
      return state
  }
}

const Characters = () => {
  const [characters, setCharacters] = useState([])
  const [search, setSearch] = useState('')

  // ref
  const searchInput = useRef(null)

  // reducers
  const [state, dispatch] = useReducer(favoritesReducer, initialState)

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.results)
      })
  }, [])

  const toggleFavorite = (character) => {
    const ACTION = state.favorites.find((child) => child.id === character.id)
      ? 'REMOVE_FROM_FAVORITES'
      : 'ADD_TO_FAVORITES'
    dispatch({ type: ACTION, payload: character })
  }

  // const handleSearch = () => {
  //   setSearch(searchInput.current.value)
  // }

  // using useCallback, memoization for functions calls... avoids re rendering.
  const handleSearch = useCallback(
    () => setSearch(searchInput.current.value),
    []
  )

  // Without Memoization... filtered characters changes every time search changes (rerendered)
  // const filteredCharacters = characters.filter((character) => {
  //   return character.name.toLowerCase().includes(search.toLowerCase())
  // })

  // With Memoization.
  const filteredCharacters = useMemo(
    () =>
      characters.filter((character) => {
        return character.name.toLowerCase().includes(search.toLowerCase())
      }),
    [characters, search]
  )

  return (
    <div>
      <div className='favorites'>
        {state.favorites.map((character) => (
          <li key={character.id}>{character.name}</li>
        ))}
      </div>

      <Search
        search={search}
        searchInput={searchInput}
        handleSearch={handleSearch}
      />

      <div className='characters'>
        {filteredCharacters.map((character) => (
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
              <button type='button' onClick={() => toggleFavorite(character)}>
                {state.favorites.find((child) => child.id === character.id)
                  ? 'Remove from Favorites'
                  : 'Add to Favorites'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Characters
