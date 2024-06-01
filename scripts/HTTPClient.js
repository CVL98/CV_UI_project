'use strict';

export async function GetMusicGroups(currentPage) {
    let url = `https://appmusicwebapinet8.azurewebsites.net/api/csMusicGroups/Read?flat=true&pageNr=${currentPage}&pageSize=10`;
    let data = await myFetch(url);
    return data;
}

async function myFetch(url) {
    try {
  
      let res = await fetch(url);
      if (res.ok) {
  
        console.log("Request successful");
  
        //get the data from server
        let data = await res.json();
        return data;
      }
      else {
  
        //typcially you would log an error instead
        console.log(`Failed to recieved data from server: ${res.status}`);
        alert(`Failed to recieved data from server: ${res.status}`);
      }
    }
    catch (err) {
  
      //typcially you would log an error instead
      console.log(`Failed to recieved data from server: ${err.message}`);
      alert(`Failed to recieved data from server: ${err.message}`);
    }
  }