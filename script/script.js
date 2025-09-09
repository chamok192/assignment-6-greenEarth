

let cart = [];


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
    const spinner = document.getElementById('spinner');
    const cardContainer = document.getElementById('card-container');

    spinner.classList.remove('hidden');
    console.log(category_name);
    const url = `https://openapi.programming-hero.com/api/plants`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            let filteredCards = data.plants;
            if (category_name !== "All Tree") {
                filteredCards = data.plants.filter(card => card.category === category_name);
            }
            spinner.classList.add('hidden');
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

// const displayCards = (cards) => {
//     console.log(cards);
//     const cardContainer = document.getElementById('card-container');
//     cardContainer.innerHTML = "";
//     cards.forEach(card => {
//         const cardDiv = document.createElement('div');
//         cardDiv.innerHTML = `<div class="bg-white p-5 rounded-xl shadow-md  flex flex-col justify-between mb-5 md:mb-0">
//                         <img class="rounded-xl h-[12rem] object-cover " src="${card.image}" alt="">
//                         <h3 class="text-xl font-bold my-5">${escapeHtml(card.name || '')}</h3>
//                         <p class="h-[3remrem]">${card.description ? escapeHtml(card.description.slice(0, 50)) + "..." : "No description available."}</p>
//                         <div class="flex justify-between items-center mt-3">
//                             <button class="bg-[#DCFCE7] py-1 px-4 rounded-3xl font-semibold text-[#15803D] cursor-pointer">${escapeHtml(card.category || "")}</button>
//                             <p class="font-bold text-lg"><i class="fa-solid fa-bangladeshi-taka-sign "></i>${card.price}</p>
//                         </div>
//                         <button class="bg-[#15803D] text-white py-2 rounded-3xl font-semibold mt-8 cursor-pointer">Add to cart</button>
//                     </div>`;

//         cardContainer.appendChild(cardDiv);
//     });
// }
const displayCards = (cards) => {

    console.log(cards);
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";

    cards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
            <div class="bg-white p-5 rounded-xl shadow-md flex flex-col justify-between mb-5 md:mb-0">
                <img class="rounded-xl h-[12rem] object-cover cursor-pointer card-image" src="${card.image}" alt="">
                <h3 class="text-xl font-bold my-5 cursor-pointer card-title">${escapeHtml(card.name || '')}</h3>
                <p class="h-[3rem]">${card.description ? escapeHtml(card.description.slice(0, 50)) + "..." : "No description available."}</p>
                <div class="flex justify-between items-center mt-3">
                    <button class="bg-[#DCFCE7] py-1 px-4 rounded-3xl font-semibold text-[#15803D] cursor-pointer">${escapeHtml(card.category || "")}</button>
                    <p class="font-bold text-lg"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${card.price}</p>
                </div>
                <button class="add-to-cart bg-[#15803D] text-white py-2 rounded-3xl font-semibold mt-8 cursor-pointer">Add to cart</button>
        `;

         // Get elements
        const img = cardDiv.querySelector(".card-image");
        const title = cardDiv.querySelector(".card-title");

        // Add event listener for modal open
        [img, title].forEach(el => {
            el.addEventListener("click", () => {
                document.getElementById("modalImage").src = card.image;
                document.getElementById("modalTitle").textContent = card.name;
                document.getElementById("modalDesc").textContent = card.description || "No description available.";
                document.getElementById("modalPrice").textContent = card.price;
                document.getElementById("cardModal").classList.remove("hidden");
            });
        });

        const addToCartBtn = cardDiv.querySelector(".add-to-cart");
        addToCartBtn.addEventListener("click", () => {
            const itemId = card.id || card.name; // fallback if id missing
            const existingItem = cart.find(item => item.id === itemId);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    id: itemId,
                    name: card.name,
                    price: card.price,
                    quantity: 1
                });
            }
            renderCart();
        });

        cardContainer.appendChild(cardDiv);
    });
};
document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("cardModal").classList.add("hidden");
});

// Close if clicking outside modal box
document.getElementById("cardModal").addEventListener("click", (e) => {
    if (e.target.id === "cardModal") {
        document.getElementById("cardModal").classList.add("hidden");
    }
});


const renderCart = () => {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = "";

    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = "flex justify-between items-center bg-gray-100 p-2 rounded";

        itemDiv.innerHTML = `
    <div class="flex-1 text-sm"> <!-- smaller text -->
        <p class="font-semibold">${item.name}</p>
    </div>
    <div class="flex items-center gap-1 text-sm"> <!-- smaller text -->
        <button class="text-red-600 font-bold px-1 py-1 rounded" data-index="${index}" data-action="decrease">-</button>
        <span>${item.quantity}</span>
        <button class="text-green-600 font-bold px-1 py-1 rounded" data-index="${index}" data-action="increase">+</button>
    </div>
    <div class="font-bold text-sm flex items-center gap-2">
        <i class="fa-solid fa-bangladeshi-taka-sign"></i> <span>${item.price * item.quantity}</span>
        <button class="text-red-500 font-bold px-2 py-1 rounded bg-gray-200 hover:bg-gray-300" data-index="${index}" data-action="delete">X</button>
    </div>
`;

        cartItemsContainer.appendChild(itemDiv);
    });

    updateTotal();

    // Add event listeners for + and -
    cartItemsContainer.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.index);
            const action = btn.dataset.action;
            if (action === "increase") {
                cart[idx].quantity++;
            } else if (action === "decrease") {
                cart[idx].quantity--;
                if (cart[idx].quantity <= 0) cart.splice(idx, 1);
            } else if (action === "delete") {
                cart.splice(idx, 1);
            }
            renderCart();
        });
    });
}

// Update total
const updateTotal = () => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('cart-total').textContent = total;
}




loadCategory();
// load category end

loadCards();