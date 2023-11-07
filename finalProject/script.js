/**
 * Author: Jesse Roberts
 * Date completed: 11/5/23
 */

// I don't want this to live on the page until it's needed
// Add recipes form
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
            <label for="post-steps">List the Steps (separated by comma)</label>
            <input type="textarea" class="form-control" id="post-steps">
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

// Establish a class for quickly building new recipes

class Recipe {
    title;
    content;
    rank;
    ingredients = [];
    steps = [];
    type = "blog";
};

// Resets the page without actually refreshing so that everything can exist on one page

const reload = () => {
    // establish my two static pages as first two in pages array
    let home = 0
    let inputPage = 1;

    // Empty the homepage if there's something in that content block
    if (pages[home].content) {
        pages[home].content = ""
    }

    // Functions to build the static pages when clicked
    pages[home].content = createArchive();
    pages[inputPage].content = createForm();

    // Create the main content div
    let currentContent = document.createElement("div");

    // Decide what kind of page to create
    if (activePage == 0 || activePage == 1) {
        currentContent.innerHTML = pages[activePage].content.outerHTML;
    } else if (pages[activePage].type == "blog") {
        // Build recipe pages dynamically, so they don't exist in the DOM until they're needed
        let title = document.createElement("h1");
        title.innerHTML = pages[activePage].title;
        currentContent.appendChild(title);

        let rank = document.createElement("span");
        rank.id = "stars";
        rank.innerHTML = "<h3>Difficulty: </h3>";

        // Use the rating to add some fontawesome icons
        for (let i = 0; i < pages[activePage].rank; i++) {
            let star = document.createElement("i");
            star.classList = "fa-solid fa-star";
            rank.appendChild(star);
        }

        currentContent.appendChild(rank);

        // The blog section
        let description = document.createElement("article");
        description.innerHTML += pages[activePage].content;
        currentContent.appendChild(description);

        // self explanatory building of the ingredients section
        let ingredientsList = document.createElement("ul");
        ingredientsList.classList = "list-unstyled";
        ingredientsList.innerHTML += "<h3><strong>Ingredients:</strong></h3>";

        for(ingredient of pages[activePage].ingredients) {
            let currentIng = document.createElement("li");
            currentIng.innerHTML = ingredient;
            ingredientsList.appendChild(currentIng);
        }

        currentContent.appendChild(ingredientsList);

        // building the steps section
        let stepsHeading = document.createElement("h4");
        stepsHeading.textContent = "Directions:";
        let stepsList = document.createElement("ol");

        for (step of pages[activePage].steps) {
            let currentStep = document.createElement("li");
            currentStep.innerHTML = step;
            stepsList.appendChild(currentStep);
        }

        currentContent.appendChild(stepsList);

    }
    // empty the display before adding current display
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

    // List all recipes on the homepage        
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

// Build the initial website dynamically
const init = () => {
    // establish my two static pages as first two in pages array
    let home = 0
    let inputPage = 1;

    // Add event listeners for the menu items
    recipesLink.addEventListener("click", () => {
        activePage = 0;
        reload();
    })

    addRecipeLink.addEventListener("click", () => {
        activePage = 1;
        reload();
    })

    content.innerHTML = "";
    // Check if localstorage has the main object
    !localStorage.main ? localStorage.setItem("main", "") : "";
    let archive = createArchive();
    let formPage = createForm();

    // Building the static pages as object literals because they need to not be of type "blog"
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

    // Empty page array? Create new statics
    if (pages.length == 0) {
        pages.push(mainPage, addPage);
    }

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

const addPost = (title, content, rank, ingredients, steps) => {
    let thisPost = new Recipe;
    thisPost.title = title;
    thisPost.content = content;
    thisPost.rank = rank;
    thisPost.ingredients = ingredients;
    thisPost.steps = steps;

    // Adds post to dynamic storage
    pages.push(thisPost);

    // Syncs local storage with dynamic
    localStorage.clear();
    localStorage.setItem("main", JSON.stringify(pages));
    activePage = 1;

    reload();
}

// Get all the values from the form

function handleForm() {
    try {
        let title = document.getElementById("post-title").value;
        let content = document.getElementById("post-content").value;
        let rank = parseInt(document.getElementById("post-rank").value);
        
        // Need to parse the text block given by user into usable array
        let unhandledIngredients = document.getElementById("post-ingredients").value;
        let arrayIngredients = unhandledIngredients.split(",");
        arrayIngredients.forEach((el) => {
            el = el.trim();
        })

        // Same thing but with steps
        let unhandledSteps = document.getElementById("post-steps").value;
        let arraySteps = unhandledSteps.split(",");
        arraySteps.forEach((el) => {
            el = el.trim;
        })
    
        addPost(title, content, rank, arrayIngredients, arraySteps);
    } catch (e) {
        console.log(e);
    }

}