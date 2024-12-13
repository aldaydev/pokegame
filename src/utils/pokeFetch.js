function getPokemons(type){
    let finalPokeList = [];
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=151`)
        .then((response) => response.json())
        .then((res) => {
            const pokelist = res.results;
            pokelist.forEach(pokemon => {
                // console.log(pokemon.url);
                fetch(pokemon.url)
                    .then(response=> response.json())
                    .then(pokeData=> {
                        // console.log(pokeData)
                        
                        const pokemonData = {
                            name: pokeData.name,
                            img: pokeData.sprites.other.dream_world.front_default
                        }
                        finalPokeList.push(pokemonData);
                        // console.log(pokemonData);
                    })
            });
        })

    return finalPokeList.sort();
}


export { getPokemons };