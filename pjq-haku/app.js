// Album object with constructor and each json field as defined
class Albums {
    constructor(albumId, albumName, artistName, albumImage) {
        this.albumId = albumId;
        this.albumName = albumName;
        this.artistName = artistName;
        this.albumImage = albumImage;
        this.albumTracks = [];
    }
}

// Track object with constructor and each field as defined in json + favorites field
class Track {
    constructor(trackId, albumRef, trackName, trackIndex, trackLabels, trackDuration, trackFav) {
        this.trackId = trackId;
        this.albumRef = albumRef;
        this.trackName = trackName;
        this.trackIndex = trackIndex
        this.trackLabels = trackLabels;
        this.trackDuration = trackDuration;
        this.trackFav = trackFav;
    }
}

function compare(a, b) {
    const numA = a.trackIndex;
    const numB = b.trackIndex;
  
    if (numA > numB) {
      return 1;
    } else if (numA < numB) {
        return -1;
    }
    return 0;
}

const params = {
    method: 'GET',
    headers: {
        'accept': 'application/json'
    }
};


// Array to store all album objects
let jukeboxAlbums = [];
let albumSlider = document.getElementsByClassName("cards-container")[0];

function initData() {

    let album_res = fetch('https://cors-anywhere.herokuapp.com/https://stg-resque.hakuapp.com/albums.json').then((res)=>{
        return res.json();
    });

    album_res.then((albumData)=>{
        for (let index = 0; index < albumData.length; index++) {
            const element = albumData[index];
            let newAlbum = new Albums(element.id, element.name, element.artist_name, element.cover_photo_url);
            
            let track_res = fetch('https://cors-anywhere.herokuapp.com/https://stg-resque.hakuapp.com/songs.json?album_id=' + String(element.id)).then((res)=>{
                return res.json();
            });
            
            track_res.then((songData)=>{
                for (let i = 0; i < songData.length; i++) {
                    const song = songData[i];
                    let trackFav = 0;
                    let newTrack = new Track(song.id, song.album_id, song.song_name, song.song_order, song.song_label, song.song_duration, trackFav);
                    newAlbum.albumTracks.push(newTrack);      
                }
                newAlbum.albumTracks.sort((a,b) => a.trackIndex - b.trackIndex);
            });

            jukeboxAlbums.push(newAlbum);    
            console.log(jukeboxAlbums);


            console.log(newAlbum);
            console.log(element.name);
        }

        jukeboxAlbums.forEach((album)=>{
            if(album.albumId < 6) {
                albumCard = document.createElement('li');
                albumCard.setAttribute("class", "box");
                albumCard.innerHTML = `
                    <img src="${album.albumImage}" alt="${album.albumName}" >
                    <div class="card-title" id="${album.albumId}">
                        <h2><b>${album.albumName.toUpperCase()}</b></h2>
                        <p>${album.artistName.toUpperCase()}</p>
                    </div>
                `
                albumSlider.appendChild(albumCard);
            }
            else {
                albumCard = document.createElement('li');
                albumCard.setAttribute("class", "box box--hide");
                albumCard.innerHTML = `
                    <img src="${album.albumImage}" alt="${album.albumName}" >
                    <div class="card-title" id="${album.albumId}">
                        <h2><b>${album.albumName.toUpperCase()}</b></h2>
                        <p>${album.artistName.toUpperCase()}</p>
                    </div>
                `
                albumSlider.appendChild(albumCard);
            }
        });
        getTracks();
    });
};

window.onload = initData();

// function to get tracks for selected album
function getTracks() {
    // gets all album cards in html
    const boxes = document.querySelectorAll(".box"); 
    // gets id of selected album card from html
    let idOfAlbum = boxes[2].getElementsByClassName("card-title")[0].getAttribute('id');

    // gets html where album tracks will display
    let songsinAlbum = document.getElementsByClassName("album-tracks")[0];
    // finds the index of the album in the array
    let albumIndex = jukeboxAlbums.findIndex(obj => obj.albumId == idOfAlbum);
    let songs = jukeboxAlbums[albumIndex];

    // let albumTrackList = fetch("https://stg-resque.hakuapp.com/songs.json?album_id=" + idOfAlbum);
    // console.log(albumTrackList);

    // if the album has songs it will display them in the html
    if(songs.albumTracks.length > 0) {  
        songsinAlbum.innerHTML = "";
        let song = document.createElement('div');
        song.setAttribute("class", "grid-tracks");
        songs.albumTracks.forEach((track)=>{
            songsinAlbum.appendChild(song);
            // if song is selected as favorite star will appear as yellow
            if(track.trackFav == 1) {
                song.innerHTML += `
                    <div class="track">
                        <div class="track-number">
                            <h2>${track.trackIndex}</h2>
                        </div>
                        <div class="track-fav">
                            <input type="checkbox" name="fav" id="fav${track.trackIndex}" onclick="addFav('${track.trackIndex}')" checked>
                            <label for="fav${track.trackIndex}" class="fas fa-star"></label>
                        </div>
                        <div class="track-title">
                            <h3>${track.trackName.toUpperCase()}</h3>
                            ${track.trackLabels != null && track.trackLabels.length > 0 ? 
                                track.trackLabels.map((label)=>{
                                    return `
                                        <div class="track-label">${label.toUpperCase()}</div>
                                    `
                                }).join('') : ''
                            }
                        </div>
                        <div class="track-time">
                            <h2 style="font-size:18px;" >${track.trackDuration}</h2>
                        </div>
                    </div>
                `
            }
            else {
                song.innerHTML += `
                <div class="track">
                    <div class="track-number">
                        <h2>${track.trackIndex}</h2>
                    </div>
                    <div class="track-fav">
                        <input type="checkbox" name="fav" id="fav${track.trackIndex}" onclick="addFav('${track.trackIndex}')">
                        <label for="fav${track.trackIndex}" class="fas fa-star"></label>
                    </div>
                    <div class="track-title">
                        <h3 style="padding-top:4px;" >${track.trackName.toUpperCase()}</h3>
                        ${track.trackLabels != null && track.trackLabels.length > 0 ? 
                            track.trackLabels.map((label)=>{
                                return `
                                    <div class="track-label">${label.toUpperCase()}</div>
                                `
                            }).join('') : ''
                        }
                    </div>
                    <div class="track-time">
                        <h2 style="font-size:18px;" >${track.trackDuration}</h2>
                    </div>
                </div>
            `
            }
        });
    }
    // if not it show that the album has no songs
    else {
        songsinAlbum.innerHTML = "";    
        songsinAlbum.innerHTML = `
            <div class="grid-tracks">
                <div class="no-tracks">
                    <h3>No Tracks for ${songs.albumName}</h3>
                </div>
            </div>
        `
    }
}

// function to shift carousel left
function shiftLeft() {
    const boxes = document.querySelectorAll(".box");
    // grabs first album card displayed
    const tmpNode = boxes[0];
    boxes[0].className = "box move-out-from-left";

    // set timeout gives function 0.2 sec buffer
    setTimeout(function() {
        if (boxes.length > 5) {
            // if list is greater than 5 it hides the album card
            tmpNode.classList.add("box--hide");
            boxes[5].className = "box move-to-position5-from-left";
        }
        // moves next 5 elements over
        boxes[1].className = "box move-to-position1-from-left";
        boxes[2].className = "box move-to-position2-from-left";
        boxes[3].className = "box move-to-position3-from-left";
        boxes[4].className = "box move-to-position4-from-left";
        // removes first element
        boxes[0].remove();

        // adds first album card to the end
        document.querySelector(".cards-container").appendChild(tmpNode);
        // gets tracks for new selected album
        getTracks();

    }, 200);

}

// function to shift carousel
function shiftRight() {
    const boxes = document.querySelectorAll(".box");
    // takes last album card displayed
    boxes[4].className = "box move-out-from-right";
    // sets 0.2 sec buffer
    setTimeout(function() {
        const noOfCards = boxes.length;
        if (noOfCards > 4) {
            // if list of album cards is greater than 5 it hides the 5th card
            boxes[4].className = "box box--hide";
        }

        // remove last album card in stack and add it as the first item
        const tmpNode = boxes[noOfCards - 1];
        tmpNode.classList.remove("box--hide");
        boxes[noOfCards - 1].remove();
        let parentObj = document.querySelector(".cards-container");
        parentObj.insertBefore(tmpNode, parentObj.firstChild);
        tmpNode.className = "box move-to-position1-from-right";
        boxes[0].className = "box move-to-position2-from-right";
        boxes[1].className = "box move-to-position3-from-right";
        boxes[2].className = "box move-to-position4-from-right";
        boxes[3].className = "box move-to-position5-from-right";

        // get tracks for new selected album
        getTracks();

    }, 200);

}

// function to set/unset favorite button on track
function addFav(id) {
    // gets id of selected box
    const boxes = document.querySelectorAll(".box");
    let idOfAlbum = boxes[2].getElementsByClassName("card-title")[0].getAttribute('id');
    // finding index of album and checking tracks in album
    let albumIndex = jukeboxAlbums.findIndex(obj => obj.albumId == idOfAlbum);
    let songs = jukeboxAlbums[albumIndex];
    let favChecked = document.getElementById("fav" + id.toString()).checked;
    // if track at id is favorited, then unfavorite it and change favorite value etc.
    if (favChecked) {
        document.getElementById("fav" + id.toString()).checked = true;
        let trackIndex = songs.albumTracks.findIndex(obj => obj.trackIndex == id);
        let track = songs.albumTracks[trackIndex];
        track.trackFav = 1;
    } 
    else {
        document.getElementById("fav" + id.toString()).checked = false;
        let trackIndex = songs.albumTracks.findIndex(obj => obj.trackIndex == id);
        let track = songs.albumTracks[trackIndex];
        songs.albumTracks[trackIndex].trackFav = 0;
        track.trackFav = 0;
    }

}