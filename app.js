const url = "https://rickandmortyapi.com/api/character/";
const container = document.querySelector(".container");
const details = document.querySelector(".details");

const createCard = (character) => {
    const div = document.createElement('div')
    div.className = 'card'
    const html = `
    <img src="${character.image}" alt="${character.name}">
    <button class="btn" data-id="${character.id}">Ver mas </button>
    <h2>${character.name}</h2>
    `
    div.innerHTML = html
    return div
}
const switchDiv = () => {
    container.classList.toggle('invisible')
    details.classList.toggle('invisible')
}

const buscador = () => {
    const input = document.querySelector('input')
    const value = input.value
    fetch(url + '?name=' + value)
        .then((response) => response.json())
        .then(data => {
            container.innerHTML = ''
            data.results.forEach(character => {
                container.appendChild(createCard(character))
            })
        })
}

const getId = (e) => {
    if (e.target.classList.contains('btn')) {
        const id = e.target.getAttribute('data-id')
        fetch(url + '/' + id)
            .then((response) => response.json())
            .then(character => {
                console.log(character)
                const html = `<h2>${character.name}</h2>
                <img src="${character.image}" alt="${character.name}">
                <p>${character.species}</p>
                <p>${character.gender}</p>
                <p>${character.status}</p>
                <p>${character.location.name}</p>
                <p>${character.origin.name}</p>`
                details.querySelector('div').innerHTML = html
                switchDiv()
            })
    }
}





const page = (Math.ceil(Math.random() * 42))
fetch(url + '?page=' + page)
    .then((response) => response.json())
    .then(data => {
        data.results.forEach(character => {
            container.appendChild(createCard(character))

        })
    })

container.addEventListener('click', getId)