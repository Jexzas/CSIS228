let form =  `
    <form onsubmit="handleForm()">
        <div class="text-center"><h2>Add a new recipe</h2></div>
        <div class="form-group">
            <label for="post-title">Recipe Title</label>
            <input type="text" class="form-control" id="post-title">
        </div>
        <div class="form-group">
            <label for="post-content">Recipe Content</label>
            <input type="textarea" class="form-control" id="post-content">
        </div>
        <div class="form-group">
            <label for="post-ingredients">List of Ingredients with Amounts (separated by comma)</label>
            <input type="textarea" class="form-control" id="post-ingredients">
        </div>
        <div class="form-group">
            <label for="post-rank">Difficulty Rating</label>
            <select class="form-control" id="post-rank">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
        <button class="btn btn-success">Submit</button>
    </form>
`

class Recipe {
    title;
    content;
    rank;
    ingredients = [];
    type = "blog";
};

const reload = () => {
    let home = pages.findIndex((x) => x = "Home")
    if (pages[home].content) {
        pages[home].content = ""
    }
    pages[home].content = createArchive();
    pages[1].content = createForm();
    let currentContent = document.createElement("div");
    if (activePage == 0 || activePage == 1) {
        currentContent.innerHTML = pages[activePage].content.outerHTML;
    } else if (pages[activePage].type == "blog") {
        let title = document.createElement("h1");
        title.innerHTML = pages[activePage].title;
        currentContent.appendChild(title);
        let rank = document.createElement("span");
        rank.id = "stars";
        rank.innerHTML = "<h3>Difficulty: </h3>";
        for (let i = 0; i < pages[activePage].rank; i++) {
            let star = document.createElement("i");
            star.classList = "fa-solid fa-star";
            rank.appendChild(star);
        }
        currentContent.appendChild(rank);
        let ingredientsList = document.createElement("ul");
        ingredientsList.classList = "list-unstyled";
        ingredientsList.innerHTML += "<h3><strong>Ingredients:</strong></h3>";
        for(ingredient of pages[activePage].ingredients) {
            let currentIng = document.createElement("li");
            currentIng.innerHTML = ingredient;
            ingredientsList.appendChild(currentIng);
        }
        currentContent.appendChild(ingredientsList);
        let description = document.createElement("article");
        let descHeading = document.createElement("h3");
        descHeading.textContent = "Directions:";
        description.appendChild(descHeading);
        description.innerHTML += pages[activePage].content;
        currentContent.appendChild(description);
    }
    if (content.hasChildNodes()) {
        content.removeChild(content.firstChild);
    }
    content.appendChild(currentContent);
}

// Declare important variables
let activePage = 0;
const recipesLink = document.getElementById("recipesLink");
const addRecipeLink = document.getElementById("addRecipeLink");
let pages = [];
const content = document.getElementById("display");

// Add event listeners for the menu items
recipesLink.addEventListener("click", () => {
    activePage = 0;
    reload();
})
addRecipeLink.addEventListener("click", () => {
    activePage = 1;
    reload();
})

// Create the static pages
const createArchive = () => {
    let archive = document.createElement("div");
    archive.classList = "container-fluid text-center";
    let heading = document.createElement("h1");
    heading.innerHTML = "Home Page";
    let subheading = document.createElement("h3");
    subheading.textContent = "(click to view recipe)";
    heading.classList = ("text-center");
    archive.appendChild(heading);
    archive.appendChild(subheading);
    let listArch = document.createElement("ul");
    listArch.classList = "list-unstyled row g-0 col-12";
    for (let page of pages) {
        if (page.type == "blog") {
            let post = document.createElement("li");
            post.innerHTML = `${page.title}`;
            post.id = `post${pages.indexOf(page)}`;
            document.addEventListener("click", (e) => {
                if (e.target.id == post.id) {
                    activePage = pages.indexOf(page);
                    reload();
                }
            })
            listArch.appendChild(post);
        }
    }
    archive.appendChild(listArch);
    return archive;
}

const createForm = () => {
    let formPage = document.createElement("div");
    formPage.innerHTML = form;
    return formPage;
}

// Build the website dynamically
const init = () => {
    content.innerHTML = "";
    !localStorage.main ? localStorage.setItem("main", "") : "";
    let archive = createArchive();
    let formPage = createForm();
    let mainPage = {
        "title": "Home",
        "content": archive.innerHTML,
        "rank": null,
        "ingredients": [],
        "type": "static"
    }
    let addPage = {
        "title": "Add Post",
        "content": formPage.innerHTML,
        "rank": null,
        "ingredients": [],
        "type": "static"
    }
    if (pages.length == 0) {
        pages.push(mainPage, addPage);
    }
    recipesLink.addEventListener("click", () => {
        activePage = 0;
    })
    addRecipeLink.addEventListener("click", () => {
        activePage = 1;
    })
    let currentContent = document.createElement("div");
    currentContent.innerHTML = pages[activePage].content;
    content.appendChild(currentContent);
    if (localStorage.main != "") {
        pages = (JSON.parse(localStorage.main));
    } else {
        localStorage.setItem("main", JSON.stringify(pages));
    }
    reload();
}

window.addEventListener("load", init);

// Add..post...

const addPost = (title, content, rank, ingredients) => {
    let thisPost = new Recipe;
    thisPost.title = title;
    thisPost.content = content;
    thisPost.rank = rank;
    thisPost.ingredients = ingredients;
    // Adds post to dynamic storage
    pages.push(thisPost);
    // Syncs local storage with dynamic
    localStorage.clear();
    localStorage.setItem("main", JSON.stringify(pages));
    activePage = 0;
    reload();
}

// Get all the values from the form

function handleForm() {
    try {
        let title = document.getElementById("post-title").value;
        let content = document.getElementById("post-content").value;
        let rank = parseInt(document.getElementById("post-rank").value);
        let unhandledIngredients = document.getElementById("post-ingredients").value;
        let arrayIngredients = unhandledIngredients.split(",");
        arrayIngredients.forEach((el) => {
            el = el.trim();
        })
    
        addPost(title, content, rank, arrayIngredients);
    } catch (e) {
        console.log(e);
    }

}