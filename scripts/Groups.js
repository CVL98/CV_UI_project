'use strict';

import { GetMusicGroups } from "./HTTPClient.js";
let url = new URL(window.location);
let params = url.searchParams;

const groupList = document.querySelector("#music-groups");
const btnPrev = document.querySelector("#btnPrev");
const btnNext = document.querySelector("#btnNext");
const currentPageNumber = document.querySelector("#currentPageNumber");
const ItemsCount = document.querySelector("#itemsCount");
const searchBar = document.querySelector("#searchBar");
const searchButton = document.querySelector("#searchButton");

let _currentPage = 0;
let _maxNrpages = 10;
let _searchTerm = "";
let _itemsCount = 0;

if (params.get("currentPage")) {
    _currentPage = params.get("currentPage");
}
if (params.get("searchTerm")) {
    _searchTerm = params.get("searchTerm");
}

console.log("Current Page:", _currentPage);
console.log("Search Term:", _searchTerm);

// Add event listeners
btnPrev.addEventListener("click", clickPrev);
btnNext.addEventListener("click", clickNext);
searchButton.addEventListener("click", performSearch);
searchBar.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        performSearch(e);
    }
});

// Declare event handlers
async function clickPrev(e) {
    if (_currentPage > 0) {
        _currentPage--;
        await renderGroups(_currentPage, _searchTerm);
        updatePageNumber(_currentPage);
    }
}

async function clickNext(e) {
    if (_currentPage < _maxNrpages - 1) {
        _currentPage++;
        await renderGroups(_currentPage, _searchTerm);
        updatePageNumber(_currentPage);
    }
}

async function performSearch(e) {
    _searchTerm = searchBar.value.trim();
    _currentPage = 0;
    await renderGroups(_currentPage, _searchTerm);
    updatePageNumber(_currentPage);
}

async function renderGroups(currentPage, searchTerm) {
    // Clear the list
    while (groupList.firstElementChild !== null) {
        groupList.removeChild(groupList.firstElementChild);
    }

    // Fetch the data from API
    let data = await GetMusicGroups(currentPage, searchTerm);
    console.log(data);

    // Update the results count
    const itemsCount = document.querySelector("#itemsCount");
    itemsCount.textContent = `Results: ${data.dbItemsCount}`;


    // Populate list
    data.pageItems.forEach(item => {
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.innerText = item.name;

        const button = document.createElement("button");
        button.innerText = "Details";
        button.onclick = () => {
            window.location.href = `./GroupDetail.html?id=${item.musicGroupId}&currentPage=${currentPage}&searchTerm=${searchTerm}`;
        };

        li.appendChild(span);
        li.appendChild(button);
        groupList.appendChild(li);
    });
}


function updatePageNumber(currentPage) {
    currentPageNumber.textContent = parseInt(currentPage) + 1; // Adding 1 to make it 1-indexed
}
function updateResultsCount(ItemsCount) {
    ItemsCount.textContent = parseInt(ItemsCount);
}

// Init
await renderGroups(_currentPage, _searchTerm);
updatePageNumber(_currentPage);
updateResultsCount(_itemsCount);