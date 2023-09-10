
        const pokemonList = document.getElementById('pokemonList')
        const loadMoreButton = document.getElementById('loadMoreButton') 

        const maxRecords = 151
        const limit = 10
        let offset = 0;

        //1,2,3,4,5         0 - 5 (first page)
        //6,7,8,9,10        5 - 5 (second page)
        //11                10 - 5 (third page) - (remove o botão de loadMore)


        function convertPokemonToLi(pokemon) {
            return `
                <li class="pokemon ${pokemon.type}">
                    <div class="titulos">                       
                        <span class="name">${pokemon.name}</span>
                        <span class="number">${pokemon.number}</span>
                        <a href="pokemon-details.html?number=${pokemon.number}">
                    </div>
                        <div class="detail">
                            <ol class="types">
                                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                            </ol>
                            <img src="${pokemon.photo}" alt="${pokemon.name}">
                        </div>
                    </a>
                </li>
            `;a
        }


        function loadPokemonItens (offset, limit) {
            pokeApi.getPokemons(offset, limit).then((pokemons = []) => { 
                const newHtml = pokemons.map(convertPokemonToLi).join('')
                pokemonList.innerHTML += newHtml
            })
        }

        loadPokemonItens(offset, limit)

        loadMoreButton.addEventListener('click', () => {
            offset += limit
            const qtdRecordsWithNextPage = offset + limit 

            if (qtdRecordsWithNextPage >= maxRecords) {
                const newLimit = maxRecords - offset
                loadPokemonItens(offset, newLimit) 

                loadMoreButton.parentElement.removeChild(loadMoreButton )
            } else {
                loadPokemonItens(offset, limit)
            }
        })


