const pokemonTemplate = document.getElementById('pokemon-template');
const container = document.querySelector('[data-container]');

const fetchPokemons = async () => {
  for (let i = 1; i <= 200; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  renderPokemon(pokemon);
};

fetchPokemons();

function renderPokemon(pokemon) {
  const type = pokemon.types[0].type.name;

  const pokemonElement = document.importNode(pokemonTemplate.content, true);
  const pokemonDiv = pokemonElement.querySelector('.pokemon');
  const img = pokemonElement.querySelector('img');
  const span = pokemonElement.querySelector('span');
  const h4 = pokemonElement.querySelector('h4');
  const p = pokemonElement.querySelector('p');

  pokemonDiv.classList += ` ${type}`;
  img.src = `${pokemon.sprites.front_default}`;
  img.alt = `${pokemon.name}`;
  span.innerHTML = `#${pokemon.id.toString().padStart(3, '0')}`;
  h4.innerHTML = `${pokemon.name}`;
  p.innerHTML = type.toUpperCase();
  container.appendChild(pokemonElement);
}
