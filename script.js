//base url for the api calls
const apiUrl = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
    // Fetch random joke on page load
    fetchRandomJoke();

    // Fetch joke categories and display them
    fetchJokeCategories();

    // Handle form submission for adding a new joke
    const form = document.getElementById('add-joke-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        addNewJoke();
    });
});

async function fetchRandomJoke() {
    try {
        fetch(`${apiUrl}/jokebook/categories`)
            .then(response => response.json())
            .then(categories => {
                //select a random category
                const randomCategory = categories[Math.floor(Math.random() * categories.length)]

                //now that we have the random category, choose a random joke in that category with limit of 1
                fetch(`${apiUrl}/jokebook/joke/${randomCategory}`)
                .then(response => {return response.json()})
                .then(jokes => {
                    //get the random joke to display
                    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
                    const randomJokeContainer = document.getElementById('random-joke-text')
                    randomJokeContainer.textContent = `${randomJoke.joke} - ${randomJoke.response}`
                })
            })
    } catch (error) {
        console.error('Error fetching random joke:', error);
    }
}

async function fetchJokeCategories() {
    try {
        const response = await fetch(`${apiUrl}/jokebook/categories`);
        const categories = await response.json();

        const categoryList = document.getElementById('category-list');
        categories.forEach(category => {
            const listItem = document.createElement('li');
            listItem.textContent = category;
            categoryList.appendChild(listItem);

            //adding event listener for clicking on a joke category
            listItem.addEventListener('click', () => {
                let jokesContainer = document.getElementById('jokes-container');
                jokesContainer = document.createElement('div');
                jokesContainer.id = 'jokes-container';
                document.body.appendChild(jokesContainer);

                fetchJokes(category);
            })
        });
    } catch (error) {
        console.error('Error fetching joke categories:', error);
    }
}

function fetchJokes(category) {
    fetch(`${apiUrl}/jokebook/joke/${category}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch jokes')
            }
            return response.json();
        })
        .then(jokes => {
            const jokesContainer = document.getElementById('jokes-container');
            jokesContainer.innerHTML = '';

            // Create and append a new list for the jokes
            const jokesList = document.createElement('ul');
            jokesList.classList.add('jokes-list');
            jokesContainer.appendChild(jokesList);

            // Add each joke to the list
            jokes.forEach(joke => {
                const listItem = document.createElement('li');
                listItem.textContent = `${joke.joke} - ${joke.response}`;
                jokesList.appendChild(listItem);
            })
        })
}

async function addNewJoke() {
    const form = document.getElementById('add-joke-form');
    const formData = new FormData(form);
    const jsonData = {};
    formData.forEach((value, key) => jsonData[key] = value);

    try {
        const response = await fetch(`${apiUrl}/jokebook/joke/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });
        const data = await response.json();
        console.log('New joke added:', data);
    } catch (error) {
        console.error('Error adding new joke:', error);
    }
}