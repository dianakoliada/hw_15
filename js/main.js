'use strict'

const divWrapper = document.getElementById('wrapper');
let inputText = document.getElementById('typeText');
let radiobuttons = document.getElementsByName('status');
const btn = document.getElementById('button');
const btnClose = document.getElementById('btn_close');
const imgWrap = document.getElementById('img_wrap');
const body = document.getElementById('body');
console.log(body);

async function getCharData () {
    let selectedRadio;
    try {
        let arrRadio = document.getElementsByName('status');
        for (let i = 0; i < arrRadio.length; i++) {
            if (arrRadio[i].checked) {
                selectedRadio = arrRadio[i].value;
                break;
            }
        };

        const resp = await fetch(`https://rickandmortyapi.com/api/character/?name=${inputText.value}&status=${selectedRadio}`);
        const data = await resp.json();

        data.results.forEach(element => {
            // (element.name == inputText.value)
            if (element.name !== null && selectedRadio !== null) {

                divWrapper.insertAdjacentHTML('beforeend', `<div class="wrap"><p class ="hero_id">${element.id}</p><p class ="hero_name">${element.name}</p><p class ="hero_status">${element.status}</p></div>`)
                // divWrapper.innerHTML = `<div class="wrap"> <p class="hero_id"> id: ${element.id} </p> <p class="hero_name"> name: ${element.name} </p> <p class="hero_status"> status: ${element.status} </p> </div>`;

                imgWrap.insertAdjacentHTML('afterbegin', `<p class="hero_name"> name: ${element.name} </p> <img src="${element.image}" alt="character" id="img">`);
            }
        })
    } catch (err) {
        divWrapper.innerHTML = `<p class="error"> Error happened, character does not exist </p>`;
    }
};

btn.addEventListener('click', () => {
    getCharData();
});

divWrapper.addEventListener('click', (event) => {
    imgWrap.style.display = 'block';
    event.stopPropagation();
});

btnClose.addEventListener('click', (event) => {
    imgWrap.style.display = 'none';
    event.stopPropagation();
});

body.addEventListener('click', () => {
    imgWrap.style.display = 'none';
});





