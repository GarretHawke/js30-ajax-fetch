const searchInput = document.getElementById('input');
const suggestionsList = document.getElementById('list');

const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];

const prom = fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data));

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map(item => {
    const hlRegex = new RegExp(this.value, 'gi');
    const cityName = item.city.replace(hlRegex, `<span class="hl">${this.value}</span>`);
    const citySate = item.state.replace(hlRegex, `<span class="hl">${this.value}</span>`);
    const populationComma = numberWithCommas(item.population);
    return `
    <li>
      <span class="name">${cityName}, ${citySate}</span>
      <span class="population">${populationComma}</span>
    </li>
    `;
  }).join('');
  suggestionsList.innerHTML = html;
}

searchInput.addEventListener('input', displayMatches);