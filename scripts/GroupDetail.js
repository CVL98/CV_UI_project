// GroupDetail.js

'use strict';

let url = new URL(window.location);
let params = url.searchParams;
let id = params.get("id");
let currentPage = params.get("currentPage");

console.log(id);
console.log(currentPage); // Check if currentPage is retrieved successfully

async function fetchAdditionalInfo(id) {
    try {
        let response = await fetch(`https://appmusicwebapinet8.azurewebsites.net/api/csMusicGroups/ReadItem?id=${id}&flat=false`);
        if (response.ok) {
            let data = await response.json();
            console.log(data); // Additional information based on the ID
            renderAdditionalInfo(data);
        } else {
            console.error('Failed to fetch additional information:', response.status);
        }
    } catch (error) {
        console.error('Error fetching additional information:', error);
    }
}

async function renderAdditionalInfo(data) {
    const secondCard = document.querySelector(".container.card:nth-child(2)"); // Select the second card

    // Clear any existing content in the second card
    secondCard.innerHTML = "";

    // Create elements to display the music group information
    const groupName = document.createElement("h2");
    groupName.textContent = data.name;
    const establishedYear = document.createElement("p");
    establishedYear.textContent = "Established Year: " + data.establishedYear;
    const genre = document.createElement("p");
    genre.textContent = "Genre: " + data.strGenre;

    // Create elements to display the albums
    const albumsHeader = document.createElement("h3");
    albumsHeader.textContent = "Albums:";
    const albumsList = document.createElement("ul");
    data.albums.forEach(album => {
        const albumItem = document.createElement("li");
        albumItem.textContent = `${album.name} (${album.releaseYear}) - Copies Sold: ${album.copiesSold}`;
        albumsList.appendChild(albumItem);
    });

    // Create elements to display the artists
    const artistsHeader = document.createElement("h3");
    artistsHeader.textContent = "Artists:";
    const artistsList = document.createElement("ul");
    data.artists.forEach(artist => {
        const artistItem = document.createElement("li");
        artistItem.textContent = `${artist.firstName} ${artist.lastName}`;
        artistsList.appendChild(artistItem);
    });

    // Append all elements to the second card
    secondCard.appendChild(groupName);
    secondCard.appendChild(establishedYear);
    secondCard.appendChild(genre);
    secondCard.appendChild(albumsHeader);
    secondCard.appendChild(albumsList);
    secondCard.appendChild(artistsHeader);
    secondCard.appendChild(artistsList);
}

fetchAdditionalInfo(id);

