'use strict';

import {GetMusicGroups} from "./HTTPClient.js";
let url = new URL(window.location);
let params = url.searchParams;

const groupList = document.querySelector("#music-groups");
const btnPrev = document.querySelector("#btnPrev");
const btnNext = document.querySelector("#btnNext");
const currentPageNumber = document.querySelector("#currentPageNumber");

let _currentPage = 0;
let _maxNrpages = 10;
if (params.get("currentPage")) {_currentPage = params.get("currentPage");}
console.log("", _currentPage);

// Add event listeners
btnPrev.addEventListener("click", clickPrev);
btnNext.addEventListener("click", clickNext);

// Declare event handlers
async function clickPrev(e) {
    if (_currentPage > 0) {
        _currentPage--;
        await renderGroups(_currentPage);
        updatePageNumber(_currentPage);
    }
}

async function clickNext(e) {
    if (_currentPage < _maxNrpages - 1) {
        _currentPage++;
        await renderGroups(_currentPage);
        updatePageNumber(_currentPage);
    }
}

async function renderGroups(_currentPage) {
    // Clear the list
    while (groupList.firstElementChild !== null) {
        groupList.removeChild(groupList.firstElementChild);
    }

    // Fetch the data from API
    let data = await GetMusicGroups(_currentPage);
    console.log(data);

    // Populate list
    data.pageItems.forEach(item => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.innerText = item.name;
        a.href = `./GroupDetail.html?id=${item.musicGroupId}&currentPage=${_currentPage}`;


        li.appendChild(a);
        groupList.appendChild(li);
    });
}

function updatePageNumber(currentPage) {
    currentPageNumber.textContent = parseInt(currentPage) + 1; // Adding 1 to make it 1-indexed
}

// Init
await renderGroups(_currentPage);
updatePageNumber(_currentPage);
