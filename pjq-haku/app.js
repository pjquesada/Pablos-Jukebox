// Album Data from API + two extra albums I added
let data = [
    {
        "id":1,
        "name":"If Your'e Reading This It's Too Late",
        "artist_name":"DRAKE",
        "cover_photo_url":"https://s3.amazonaws.com/hakuapps/prod/album-1.png"
    },
        
    {
        "id":2,
        "name":"Hotter Than July",
        "artist_name":"Stevie Wonder",
        "cover_photo_url":"https://s3.amazonaws.com/hakuapps/prod/album-2.png"
    },
    
    {
        "id": 3,
        "name":"Overexposed",
        "artist_name":"Maroon 5",
        "cover_photo_url":"https://s3.amazonaws.com/hakuapps/prod/album-3.png"
    },
    
    {
        "id":4,
        "name":"Hit n Run Phase One",
        "artist_name":"PRINCE",
        "cover_photo_url":"https://s3.amazonaws.com/hakuapps/prod/album-4.png"
    },
    
    {
        "id":5,
        "name":"Brothers",
        "artist_name":"The Black Keys",
        "cover_photo_url":"https://s3.amazonaws.com/hakuapps/prod/album-5.png"
    },

    {
        "id":6,
        "name":"Heavier Things",
        "artist_name":"John Mayer",
        "cover_photo_url":"https://1.bp.blogspot.com/-s49oe2AMRyo/TsJWSFbc26I/AAAAAAAAC9A/Vjcr3WEh5q4/s1600/Front%2BCover.jpg"
    },

    {
        "id":7,
        "name":"Bad",
        "artist_name":"Michael Jackson",
        "cover_photo_url":"https://4.bp.blogspot.com/-fMueiD0i4-c/Waj52-tTG6I/AAAAAAAAS7s/PH4ElumXmP8XtonNKYEAHCrGAtifguWtACLcBGAs/s1600/Sdrergrt.png"
    }
];

// Tracks for two of the albums + 
let tracks = [
    {
        "id": 1,
        "album_id": 1,
        "song_name":"Legend",
        "song_order": 1,
        "song_label": ["explicit","upbeat"],
        "song_duration":"4:01"
    },

    {
        "id": 2,
        "album_id": 1,
        "song_name":"Energy",
        "song_order": 2,
        "song_label":null,
        "song_duration":"3:01"
    },

    {
        "id":3,
        "album_id":1,
        "song_name":"10 Bands",
        "song_order":3,
        "song_label":["explicit","upbeat"],
        "song_duration":"2:57"
    },

    {
        "id":4,
        "album_id":1,
        "song_name":"Know Yourself",
        "song_order": 4,
        "song_label":null,
        "song_duration":"4:35"
    },

    {
        "id":5,
        "album_id":1,
        "song_name":"No Tellin’",
        "song_order":5,
        "song_label":["explicit","upbeat"],
        "song_duration":"5:10"
    },

    {
        "id":6,
        "album_id":1,
        "song_name":"Madonna",
        "song_order":6,
        "song_label":["explicit","upbeat"],
        "song_duration":"2:57"
    },

    {
        "id":7,
        "album_id":1,
        "song_name":"6 God",
        "song_order":7,
        "song_label":["explicit","upbeat"],
        "song_duration":"3:00"
    },

    {
        "id":8,
        "album_id":1,
        "song_name":"Star67",
        "song_order":8,
        "song_label":["explicit","upbeat"],
        "song_duration":"4:54"
    },

    {
        "id":11,
        "album_id":3,
        "song_name":"One More Night",
        "song_order":4,
        "song_label":["explicit","upbeat"],
        "song_duration":"3:39"
    },
    
    {
        "id":12,
        "album_id":3,
        "song_name":"Payphone",
        "song_order":3,
        "song_label":[],
        "song_duration":"3:51"
    },

    {
        "id":13,
        "album_id":3,
        "song_name":"Daylight",
        "song_order":1,
        "song_label":["explicit","upbeat"],
        "song_duration":"3:45"
    },
    
    {
        "id":14,
        "album_id":3,
        "song_name":"Lucky Strike",
        "song_order":5,
        "song_label":null,
        "song_duration":"3:05"
    },
    
    {
        "id":15,
        "album_id":3,
        "song_name":"The Man Who Never Lied",
        "song_order":2,
        "song_label":["explicit","upbeat"],
        "song_duration":"3:25"
    },

    {
        "id": 1,
        "album_id": 6,
        "song_name":"Clarity",
        "song_order": 1,
        "song_label": ["upbeat"],
        "song_duration":"4:28"
    },

    {
        "id": 2,
        "album_id": 6,
        "song_name":"Bigger Than My Body",
        "song_order": 2,
        "song_label":null,
        "song_duration":"4:26"
    },

    {
        "id":3,
        "album_id":6,
        "song_name":"Something's Missing",
        "song_order":3,
        "song_label":["upbeat"],
        "song_duration":"5:04"
    },

    {
        "id":4,
        "album_id":6,
        "song_name":"Daughters",
        "song_order": 4,
        "song_label":null,
        "song_duration":"3:58"
    },    
];

// const params = {
//     method: 'GET',
//     headers: {
//         'accept': 'application/json'
//     }
// };


// Array to store all album objects
let jukeboxAlbums = [];
// let data = fetch('https://stg-resque.hakuapp.com/albums.json', params).then((res)=>{return res.json()});

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

// loads items to window
window.onload = function initJukebox() {
    // let albumsURL = "https://stg-resque.hakuapp.com/songs.json?album_id=";

    // processes albums json objects and creates album objects to store in array of albums
    data.map(function(album) {
        let newAlbum = new Albums(album.id, album.name, album.artist_name, album.cover_photo_url);
        console.log(newAlbum);
        jukeboxAlbums.push(newAlbum);
    })

    // processes tracks json objects and creates tracks to store in each corresponding album
    tracks.map(function(track) {
        let trackFav = Boolean(false);
        let newTrack = new Track(track.id, track.album_id, track.song_name, track.song_order, track.song_label, track.song_duration, trackFav);
        console.log(newTrack);
        if (jukeboxAlbums.findIndex(obj => obj.id == newTrack.albumRef)) {
            let albumIndex = jukeboxAlbums.findIndex(obj => obj.albumId == newTrack.albumRef);
            let album = jukeboxAlbums[albumIndex];
            album.albumTracks.push(newTrack);
        }
    })

    // location in html where album cards will go
    let albumSlider = document.getElementsByClassName("cards-container")[0];

    // for each album in array of albums it will contstruct the html for the album card
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
    })

    // function to get tracks for selected album
    getTracks();

}

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
            if(track.trackFav) {
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
                            <h2>${track.trackDuration}</h2>
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
                        <h2>${track.trackDuration}</h2>
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
    let favChecked = document.getElementById(id).checked;
    // if track at id is favorited, then unfavorite it and change favorite value etc.
    if (favChecked) {
        document.getElementById(id).checked = true;
        let trackIndex = songs.albumTracks.findIndex(obj => obj.trackId == id);
        let fav = songs.albumTracks[trackIndex].trackFav;
        songs.albumTracks[trackIndex].trackFav = !fav;
    } 
    else {
        document.getElementById(id).checked = false;
        let trackIndex = songs.albumTracks.findIndex(obj => obj.trackId == id);
        let unFav = songs.albumTracks[trackIndex].trackFav;
        songs.albumTracks[trackIndex].trackFav = !unFav;
    }

}