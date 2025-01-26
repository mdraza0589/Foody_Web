let container = document.querySelector('.container')
let fetchContainer = document.querySelector('.fetch-data');
let details = document.querySelector('.details');

async function dataFetch(selectItem) {
    try {
        fetchContainer.innerHTML = "Fetching ...."
        let fetchData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${selectItem}`)
        let data = await fetchData.json();
        if (data.meals) {
            container.innerHTML = data.meals.map(item => `
            <div class="foodItem">
            <img src="${item.strMealThumb}" alt="">
            <p class="name">${item.strMeal}</p>
            <p class="para">${item.strInstructions.slice(0, 80)}...</p>
            <div class="area">${item.strArea} Dish</div>
            <button onclick='showDetails(${JSON.stringify(item)})'>Viw Details</button>
            </div>
            `
            ).join('')
            fetchContainer.innerHTML = ''
        } else {
            fetchContainer.innerHTML = 'Sorry!... Not available now'
            setInterval(() => {
                fetchContainer.innerHTML = 'Try Other Recipy'
            }, 3000);
        }
    } catch (error) {
        displayErrorMessage('An error occurred while fetching data. Please try again.');
        console.error(error);
    }
}

function showDetails(meal) {
    console.log(meal);
    if (typeof meal === 'string') {
        meal = JSON.parse(meal);
    }
    details.style.display = "block"
    let detailsTextContainer = document.querySelector('.details-text')
    let ingredientContainer = document.querySelector('.ingredien')
    detailsTextContainer.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <p><strong>Area:</strong> ${meal.strArea}</p>
        <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
    `;

    ingredientContainer.innerHTML = '<h3>Ingredients:</h3>';
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '') {
            ingredientContainer.innerHTML += `<p>${ingredient} - ${measure}</p>`;
        }
    }
}



function buttonClicked() {
    console.log('clicked');
    let inputbox = document.getElementById('inputbox')
    inputValue = inputbox.value.trim();
    dataFetch(inputValue);
}

function clickedItem(item) {
    dataFetch(item)
}
function closeAboutBox() {
    details.style.display = 'none'
}


let navContainer = document.querySelector('.click-item')
function closeNav(){

    navContainer.style.visibility = 'hidden'
    navContainer.style.width = '0'
}

function openMenu(){
    navContainer.style.visibility = 'visible'
    navContainer.style.width = '200px'
}