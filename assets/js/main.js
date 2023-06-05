const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;
    
function loadPokemonItens(offset, limit) {
    
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => 
            `<li id="${pokemon.id}" class="pokemon ${pokemon.type}" >
                <span class="number">#${pokemon.id}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types ">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" 
                        alt=${pokemon.name}>
                </div>

            </li>`)
            .join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNextPage = offset + limit
    
    // Aqui é uma logica usada para limitar a pokedex aos pokemons da 1° geração

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

