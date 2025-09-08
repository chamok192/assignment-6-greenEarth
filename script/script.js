// load category 
const loadCategory = () => {
    const url = `https://openapi.programming-hero.com/api/categories`;
    fetch(url)
        .then(res => res.json())
        .then(json => displayCategory(json.categories));
}
const displayCategory = (allCategories) => {
    const categoryContainer = document.getElementById('category-container');
    categoryContainer.innerHTML = "";
    for (let category of allCategories) {
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML=`
        <a class="flex py-2 px-2 rounded-md" href="">${category.category_name}</a>`

        categoryContainer.append(categoryDiv);
    }
    
};
loadCategory();