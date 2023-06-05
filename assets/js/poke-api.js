const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name;
    pokemon.id = pokeDetail.id
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`

    return pokemon
}
pokeApi.getPokemonDetail = (pokemon) => {
    //Um fetch para a url do pokemon que quero acessar e convertendo sua response para json
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    //Busca dentro da URL
    return fetch(url)
        //Recebo um HTTP response e converto ele para Json
        .then((response) => response.json())
        //O json vem com a lista de pokemons, que são os resultados
        .then((jsonBody) => jsonBody.results)
        //A lista de pokemons é mapeada em uma lista de detalhes dos pokemons
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        //O Promisse espera que todas as requisições terminem
        .then((detailRequests) => Promise.all(detailRequests))
        //A lista de detalhes retorna ela mesma
        .then((pokemonDetails) => pokemonDetails)
        .catch((error) => console.error(error))

}
