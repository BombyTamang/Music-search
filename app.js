
const input = document.querySelector("#searchInput");
const btn = document.querySelector("#searchBtn");
const song_card = document.querySelector(".song-card");

const search_Result = document.querySelector("#results");

/* const songTitle = song_card.querySelector("h3");
const songArtist = song_card.querySelector("p");
const coverImg = song_card.querySelector("img"); */



const base_URL= "https://api.audius.co/v1/tracks/search";

const getDetails = async ()=>{

    const song = input.value;
    const new_URL = `https://api.audius.co/v1/tracks/search?query=${encodeURIComponent(song)}&limit=10`;

    const response = await fetch(new_URL);
    const result = await response.json();


 //   const title = result.data[0].title;
 //   const artist = result.data[0].user.name;
   // const cover = result.data[0].artwork["480x480"];

 //   songTitle.innerText = title;
 //   songArtist.innerText = artist;
 //   coverImg.src=cover;

    result.data.forEach((track)=>{
        console.log(track.title);
    });


/*     search_Result.innerHTML = 
        `<div class="song-card" alt="Album cover">
            <img src="${result.data[0].artwork["480x480"]}">
                <div class="song-info">
                    <h3>${result.data[0].title}</h3>
                    <p>${result.data[0].user.name}</p>
                    <button>▶ Play</button>
                </div>
        </div>`; */
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


 // <button>▶ Play</button>




}


btn.addEventListener("click", getDetails);
input.addEventListener("keydown", (event)=>{
    if(event.key==="Enter"){
        getDetails();
    }
});
