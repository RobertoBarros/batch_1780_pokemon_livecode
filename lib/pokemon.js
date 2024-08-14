import Mustache from "mustachejs";

const cardTemplate = document.getElementById('cardTemplate').innerHTML
const cardContainer = document.getElementById('cardsContainer')

const infoTemplate = document.getElementById('infoTemplate').innerHTML
const infoContainer = document.getElementById('infoContainer')

fetch('https://pokeapi.co/api/v2/pokemon')
  .then(response => response.json())
  .then((data) => {
    data.results.forEach((result) => {
      fetch(result.url)
        .then(response => response.json())
        .then((data) => {

          const pokemon = {
            image: data.sprites.front_default,
            name: data.name,
            types: data.types.map((aType) => { return aType.type.name }).join(', ')
          }

          const output = Mustache.render(cardTemplate, pokemon)
          cardContainer.insertAdjacentHTML('beforeend', output)

          const link = document.getElementById(data.name)
          link.addEventListener('click', (event) => {
            const info = {
              name: data.name,
              image: data.sprites.front_shiny,
              abilities: data.abilities.map((anAbility) => { return anAbility.ability.name }).join(', ')
            }
            const infoOutput = Mustache.render(infoTemplate, info)
            infoContainer.innerHTML = infoOutput


          })
        })

    })
  })
