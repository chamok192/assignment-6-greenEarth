
function escapeHtml(text) {
    if (typeof text !== "string") return text;
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
// load category 
const loadCategory = () => {
    const url = `https://openapi.programming-hero.com/api/categories`;
    fetch(url)
        .then(res => res.json())
        .then(json => displayCategory(json.categories));
}


// display category 
const displayCategory = (allCategories) => {
    const categoryContainer = document.getElementById('category-container');
    categoryContainer.innerHTML = "";
    for (let category of allCategories) {
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
         <button onclick="loadCards('${category.category_name}', this)" 
                class="category-btn w-full flex py-2 px-2 rounded-md bg-white text-black mb-2">
            ${category.category_name}
        </button>`;

        categoryContainer.append(categoryDiv);
    }

};

// display cards 
const loadCards = (category_name = "All Tree", button = null) => {
    console.log(category_name);
    const url = `https://openapi.programming-hero.com/api/plants/`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            let filteredCards = data.plants;
            if (category_name !== "All Tree") {
                filteredCards = data.plants.filter(card => card.category === category_name);
            }
            displayCards(filteredCards);
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('bg-[#157C3D]', 'text-white');
                btn.classList.add('bg-white', 'text-black');
            });

            // Reset All Trees button
            const allBtn = document.getElementById('all-trees-btn');
            allBtn.classList.remove('bg-[#157C3D]', 'text-white');
            allBtn.classList.add('bg-white', 'text-black');

            // Highlight selected button
            if (category_name === "All Tree") {
                allBtn.classList.add('bg-[#157C3D]', 'text-white');
                allBtn.classList.remove('bg-white', 'text-black');
            } else if (button) {
                button.classList.add('bg-[#157C3D]', 'text-white');
                button.classList.remove('bg-white', 'text-black');
            }
        }
        //displayCards(data.plants)
        );
}

const displayCards = (cards) => {
    console.log(cards);
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";
    cards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `<div class="bg-white p-5 rounded-xl shadow-md  flex flex-col justify-between mb-5 md:mb-0">
                        <img class="rounded-xl " src="${card.image}" alt="">
                        <h3 class="text-xl font-bold my-5">${escapeHtml(card.name || '')}</h3>
                        <p>${card.description ? escapeHtml(card.description.slice(0, 100)) + "..." : "No description available."}</p>
                        <div class="flex justify-between items-center mt-3">
                            <button class="bg-[#DCFCE7] py-1 px-4 rounded-3xl font-semibold text-[#15803D] cursor-pointer">${escapeHtml(card.category || "")}</button>
                            <p class="font-bold text-lg"><i class="fa-solid fa-bangladeshi-taka-sign "></i>${card.price}</p>
                        </div>
                        <button class="bg-[#15803D] text-white py-2 rounded-3xl font-semibold mt-8 cursor-pointer">Add to cart</button>
                    </div>`;

        cardContainer.appendChild(cardDiv);
    });
}


loadCategory();
// load category end

loadCards();