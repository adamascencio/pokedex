// Constants
const API_URL = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/';

// Cached Elements
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonNameEl = document.getElementById('pokemon-name');
const pokemonIdEl = document.getElementById('pokemon-id');
const pokemonWeightEl = document.getElementById('weight');
const pokemonHeightEl = document.getElementById('height');
const pokemonImageEl = document.getElementById('pokemon-image');
const pokemonTypesEl = document.getElementById('types');
const pokemonHealthEl = document.getElementById('hp');
const pokemonAttackEl = document.getElementById('attack');
const pokemonDefenseEl = document.getElementById('defense');
const pokemonSpAttackEl = document.getElementById('special-attack');
const pokemonSpDefenseEl = document.getElementById('special-defense');
const pokemonSpeedEl = document.getElementById('speed');

// Functions
const fetchPokemon = async () => {
  const pokemon = searchInput.value.toLowerCase();
  
  try {
    const res = await fetch(API_URL + pokemon);
    const data = await res.json();
    
    if (pokemonTypesEl.children) {
      while (pokemonTypesEl.firstChild) {
        pokemonTypesEl.removeChild(pokemonTypesEl.firstChild);
      }
    }

    renderPokedexScreen(data);
    renderPokemonStats(data.stats);
    searchInput.value = '';
  } catch(err) {
    console.error(err);
    alert('Pokémon not found')
  }
};

const renderPokedexScreen = data => {
  const typesArr = getPokemonTypes(data.types);

  pokemonNameEl.innerText = data.name;
  pokemonIdEl.innerText = data.id;
  pokemonWeightEl.innerText = data.weight;
  pokemonHeightEl.innerText = data.height;
  pokemonImageEl.setAttribute('src', data.sprites.front_default);
  pokemonImageEl.setAttribute('alt', `${data.name} image`);

  typesArr.forEach(type => {
    pokemonTypesEl.innerHTML += `
      <span class="type">${type}</span>
    `;
  });

}

const getPokemonTypes = types => {
  const result = [];
  types.forEach(obj => {
    result.push(obj.type.name);
  });
  return result;
}

const renderPokemonStats = statsArr => {
  statsArr.forEach(stats => {
    const statDiv = document.getElementById(stats.stat.name);
    statDiv.innerText = stats.base_stat;
  });
}

// Event Listeners
searchButton.addEventListener('click', fetchPokemon);

window.addEventListener('keydown', evt => {
  if (evt.key === 'Enter' && searchInput.value) fetchPokemon();
});

