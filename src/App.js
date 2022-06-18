import React, { useState, useEffect } from 'react'

const url = 'https://api.opendota.com/api/heroStats'

function App() {
    const [heroes, setHeroes] = useState([])

    const getHeroes = async () => {
        const response = await fetch(url)
        const heroes = await response.json()
        setHeroes(heroes)
    }

    useEffect(() => {
        getHeroes()
    }, [])

    const [filteredHeroes, setFilteredHeroes] = useState(heroes)

    const getAttackType = (type) => {
        let heroesByType = heroes.filter((hero) => hero.attack_type === type)
        !type ? setFilteredHeroes(heroes) : setFilteredHeroes(heroesByType)
    }

    return (
        <>
            <h3 className='title'>dota2 heroes</h3>
            <button className='btn' onClick={() => getAttackType()}>
                All
            </button>
            <button className='btn' onClick={() => getAttackType('Melee')}>
                Melee
            </button>
            <button className='btn' onClick={() => getAttackType('Ranged')}>
                Ranged
            </button>
            <p className='totalNumber'>Total: {filteredHeroes.length}</p>
            <ul className='heroes'>
                {filteredHeroes.map((hero) => {
                    const { id, localized_name, img, attack_type } = hero
                    const url = 'https://api.opendota.com' + img
                    return (
                        <li key={id}>
                            <img src={url} alt={localized_name} />
                            <div>
                                <h4>{localized_name}</h4>
                                <span>{attack_type}</span>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default App
