const apiUrl = 'https://swapi.dev/api/planets/?format=json';
const planetsList = document.getElementById('planets-list');
const paginationContainer = document.getElementById('pagination');

let currentPageUrl = apiUrl;

function fetchPlanets(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            currentPageUrl = url;
            displayPlanets(data);
            displayPagination(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayPlanets(data) {
    planetsList.innerHTML = '';
    data.results.forEach(planet => {
        const planetCard = document.createElement('div');
        planetCard.classList.add('planet-card');

        const planetName = document.createElement('h2');
        planetName.textContent = planet.name;

        const climate = document.createElement('p');
        climate.textContent = `Climate: ${planet.climate}`;

        const population = document.createElement('p');
        population.textContent = `Population: ${planet.population}`;

        const terrain = document.createElement('p');
        terrain.textContent = `Terrain: ${planet.terrain}`;

        const residentsList = document.createElement('ul');
        residentsList.textContent = 'Residents:';
        planet.residents.forEach(residentUrl => {
            fetch(residentUrl)
                .then(response => response.json())
                .then(resident => {
                    const residentItem = document.createElement('li');
                    residentItem.textContent = `Name: ${resident.name}, Height: ${resident.height}, Mass: ${resident.mass}, Gender: ${resident.gender}`;
                    residentsList.appendChild(residentItem);
                });
        });

        planetCard.appendChild(planetName);
        planetCard.appendChild(climate);
        planetCard.appendChild(population);
        planetCard.appendChild(terrain);
        planetCard.appendChild(residentsList);

        planetsList.appendChild(planetCard);
    });
}

function displayPagination(data) {
    paginationContainer.innerHTML = '';
    const previousPageUrl = data.previous;
    const nextPageUrl = data.next;

    if (previousPageUrl) {
        const previousButton = document.createElement('button');
        previousButton.textContent = 'Previous';
        previousButton.addEventListener('click', () => fetchPlanets(previousPageUrl));
        paginationContainer.appendChild(previousButton);
    }

    if (nextPageUrl) {
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', () => fetchPlanets(nextPageUrl));
        paginationContainer.appendChild(nextButton);
    }
}

fetchPlanets(apiUrl);
