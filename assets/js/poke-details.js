    const pokemonList2 = document.getElementById('pokemonList2')

    const maxRecords = 151
    const limit = 10
    let offset = 0;

// variavel para buscar as cores de fundo automaticamente

    const typeColors = {
        normal: '#a6a877',
        grass: '#77c850',
        fire: '#ee7f30',
        water: '#678fee',
        electric: '#f7c72e',
        ice: '#98d5d7',
        ground: '#dfbf69',
        flying: '#a98ff0',
        poison: '#a040a0',
        fighting: '#bf3029',
        psychic: '#f65687',
        dark: '#725847',
        rock: '#b8a137',
        bug: '#a8b720',
        ghost: '#6e5896',
        steel: '#b9b7c7',
        dragon: '#6f38f6',
        fairy: '#f9aec7',
        
    };
    
// Função para o botão voltar 

    const botaoVoltar = document.getElementById('voltarPaginaPrincipal');
    function voltarPaginaPrincipal() {
        console.log('Back Button')
        window.location.href = 'index.html';
    }
    botaoVoltar.addEventListener('click', voltarPaginaPrincipal);

// Função para buscar os detalhes do Pokémon com base no nº

    function fetchPokemonDetails(number) {
        const url = `https://pokeapi.co/api/v2/pokemon/${number}/`;

        return fetch(url)
            .then((response) => response.json())
            .then((pokeDetail) => {
                console.log('Detalhes do Pokémon:', pokeDetail);
                updatePokemonDetails(pokeDetail);
            })
            .catch((error) => {
                console.error('Erro ao buscar detalhes do Pokémon:', error);
            });
    }

// Função para atualizar o conteúdo da página com os detalhes do Pokémon
    function updatePokemonDetails(pokeDetail) {

        const pokemonNameElement = document.getElementById('pokemonName');
        const pokemonNumberElement = document.getElementById('pokemonNumber');
        const pokemonType1Element = document.getElementById('pokemonType1');
        const pokemonType2Element = document.getElementById('pokemonType2');
        const pokemonBlockElement = document.querySelector('.pokemon'); 

        pokemonType1Element.textContent = pokeDetail.types[0].type.name;
        pokemonNameElement.textContent = pokeDetail.name;
        pokemonNumberElement.textContent = pokeDetail.id;
        pokemonBlockElement.style.backgroundColor = typeColors[pokeDetail.types[0].type.name];

        if (pokeDetail.types.length > 1) {
            pokemonType2Element.textContent = pokeDetail.types[1].type.name;
        } else {
            pokemonType2Element.style.display = 'none'; 
        }

        const pokemonPhotoElement = document.getElementById('pokemonPhoto');
        pokemonPhotoElement.src = pokeDetail.sprites.other.dream_world.front_default;

        const speciesElement = document.getElementById('species');
        speciesElement.textContent = pokeDetail.species.name;

        const heightElement = document.getElementById('height');
        heightElement.textContent = (pokeDetail.height / 10) + ' m';

        const weightElement = document.getElementById('weight');
        weightElement.textContent = (pokeDetail.weight / 10) + ' kg';

        const abilitiesElement = document.getElementById('abilities');
        const abilities = pokeDetail.abilities.map((ability) => ability.ability.name);
        abilitiesElement.textContent =  abilities.join(', ');

    }


    // Obtendo o nº do Pokémon da URL para buscar os detalhes
    const pokemonNumber = getPokemonNumberFromURL();
    if (pokemonNumber) {
        fetchPokemonDetails(pokemonNumber);
    }
