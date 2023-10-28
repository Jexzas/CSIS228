"use strict";

window.addEventListener("load", () => {
    window.setInterval(reload, 5000)
})

const reload = () => {
    let home = pages.findIndex((x) => x = "Home")
    if (pages[home].content) {
        pages[home].content = ""
    }
    pages[home].content = createArchive();
    let currentContent = document.createElement("div");
    currentContent = pages[activePage].content;
    content.removeChild(content.firstChild);
    content.appendChild(currentContent)
}


// Declare important variables
let activePage = 0;
const recipesLink = document.getElementById("recipesLink");
const addRecipeLink = document.getElementById("addRecipeLink");
let pages = [];
const content = document.getElementById("display");
// Self explanatory

// Create the static pages
const createArchive = () => {
    let archive = document.createElement("div");
    archive.classList = "container-fluid";
    let listArch = document.createElement("ul");
    listArch.classList = "list-unstyled";
    for (let page of pages) {
        if (page.type == "blog") {
            let post = document.createElement("li");
            post.innerHTML = `${page.title}`;
            post.id = `post${pages.indexOf(page)}`;
            post.addEventListener("click", () => {
                activePage = pages.indexOf(page);
            })
            archive.appendChild(post);
        }
    }
    archive.appendChild(listArch);
    return archive;
}


let form = "";

// Build the website dynamically
const init = () => {
    !localStorage.main ? localStorage.setItem("main", "") : "";
    let archive = createArchive();
    let mainPage = {
        "title": "Home",
        "content": archive,
        "rank": null,
        "type": "static"
    }
    let addPage = {
        "title": "Add Post",
        "content": form,
        "rank": null,
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
    currentContent = pages[activePage].content;
    content.appendChild(currentContent);
    if (localStorage.main != "") {
        pages = (JSON.parse(localStorage.main));
    } else {
        localStorage.setItem("main", JSON.stringify(pages));
    }
}

init();

// Add..post...

const addPost = (title, content, rank) => {
    let thisPost = {
        "title": title,
        "content": content,
        "rank": rank,
        "type": "blog"
    }
    // Adds post to dynamic storage
    pages.push(thisPost);
    // Syncs local storage with dynamic
    localStorage.setItem("main", JSON.stringify(pages));
}


