'use strict';

const api = 'https://swapi.co/api/people/?search=';
const searchField = document.querySelector('.search__field');
const searchBTN = document.querySelector('.search__btn');
const results = document.querySelector('.results');

function createPromise(url) {
  return fetch(url).then(r=>r.json());
}

function writeResults(name, films) {
  let items = `
    <li class="results__item">
        <h2>${name}</h2>
        <ul>
  `;
  for (const r of films) {
    items += `
      <li class="films">${r}</li>`;
  }
  items += `
      </ul>
    </li>
  `;
  results.innerHTML += items;
}

function searchMe() {
  const q = searchField.value;
  results.innerHTML = '';
  fetch(api+q)
    .then(r=>r.json())
    .then(data=>{
      const apiResults = data.results;
      for (const a of apiResults) {
        const name = a.name;
        const promises = [];
        for (const f of a.films) {
          promises.push(createPromise(f));
        }
        Promise.all(promises)
          .then(res=>{
            let films = [];
            for (const r of res) {
              films.push(r.title);
            }
            writeResults(name, films);
          });
      }
    });
}

searchBTN.addEventListener('click', searchMe);