'use strict';

const api = 'https://swapi.co/api/';
const apiSearch = '/?search=';
const searchCats = document.querySelector('.search__cats');
const searchField = document.querySelector('.search__field');
const searchBTN = document.querySelector('.search__btn');
const results = document.querySelector('.results');

function writeTitleResults(res) {
  let items = '';
  for (const r of res) {
    items += `
      <li class="results__item">
        <small>Título de la película</small>
        <h2>${r.title}</h2>
      </li>
    `;
  }
  results.innerHTML = items;
}

function writeNameResults(res, category) {
  let items = '';
  for (const r of res) {
    items += `
      <li class="results__item">
        <small>Nombre</small>
        <h2>${r.name}</h2>
    `;
    if (category === 'people') {
      items += `<small>Películas en las que aparece: ${r.films.length}</small>`;
    }
    items += `</li>`;
  }
  results.innerHTML = items;
}

function searchMe() {
  const q = searchField.value;
  const cat = searchCats.value

  fetch(api+cat+apiSearch+q)
    .then(r=>r.json())
    .then(data=>{
      const apiResults = data.results;
      console.log(apiResults);
      if (cat === 'films') {
        writeTitleResults(apiResults);
      } else {
        writeNameResults(apiResults, cat);
      }
    });
}

searchBTN.addEventListener('click', searchMe);