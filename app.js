
const input = document.querySelector("#searchInput");
const btn = document.querySelector("#searchBtn");
const song_card = document.querySelector(".song-card");
const search_Result = document.querySelector("#results");
const search_result_count = document.querySelector("h2");


const base_URL= "https://api.audius.co/v1/tracks/search";

const getDetails = async ()=>{

    const song = input.value;
    const new_URL = `https://api.audius.co/v1/tracks/search?query=${encodeURIComponent(song)}&limit=20`;

    const response = await fetch(new_URL);
    const result = await response.json();

    result.data.forEach((track)=>{
        console.log(track.title);
    });

    search_Result.innerHTML = "";
     for(let i=0 ; i<result.data.length ;i++){
        search_Result.innerHTML += 
            `<div class="song-card" alt="Album cover">
                <img src="${result.data[i].artwork["480x480"]}">
                    <div class="song-info">
                        <h3>${result.data[i].title}</h3>
                        <p>${result.data[i].user.name}</p>
                        <audio controls src="${result.data[i].stream.url}"></audio>
                        
                    </div>
            </div>`;  
             
     }

     const players = document.querySelectorAll("audio");
     search_result_count.innerText=`Search Results ${result.data.length}`;

     players.forEach((player)=>{
        player.addEventListener("play", ()=>{
            players.forEach((otherPlayer)=>{
                if(otherPlayer!==player){
                    otherPlayer.pause();
                }
            })
        })

        player.addEventListener("error", ()=>{
            console.log("This song could not be played", player.src);
        })
     })
}


btn.addEventListener("click", getDetails);
input.addEventListener("keydown", (event)=>{
    if(event.key==="Enter"){
        getDetails();
    }
});
