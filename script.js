document.addEventListener('DOMContentLoaded', function() {
  const playlistSongs = document.getElementById("playlist-songs");
  const playButton = document.getElementById("play");
  const pauseButton = document.getElementById("pause");
  const nextButton = document.getElementById("next");
  const previousButton = document.getElementById("previous");
  const shuffleButton = document.getElementById("shuffle");

  const allSongs = [
    {
      id: 0,
      title: "AC/DC - BACK IN BLACK",
      artist: "AC/DC ",
      duration: "X",
      src: "https://drive.google.com/file/d/1F82Rg20IDjAnexfmFIW_dMYE5nsfvmNZ/view?usp=drive_link",
    },
    // Agrega más canciones según sea necesario
  ];

  const audio = new Audio();
  let userData = {
    songs: [...allSongs],
    currentSong: null,
    songCurrentTime: 0,
  };

  const playSong = (id) => {
    if (!userData || !userData.songs || userData.songs.length === 0) {
      console.error('No se ha proporcionado userData o songs no está definido o está vacío.');
      return;
    }

    const song = userData.songs.find((song) => song.id === id);
    if (!song) {
      console.error('No se encontró una canción con el ID proporcionado.');
      return;
    }

    if (!audio || !(audio instanceof HTMLAudioElement)) {
      console.error('El elemento audio no está definido o no es un elemento de audio válido.');
      return;
    }

    audio.src = song.src;
    audio.title = song.title;
  };

  playButton.addEventListener("click", () => {
    if (userData?.currentSong === null) {
      playSong(userData?.songs[0].id);
    } else {
      playSong(userData?.currentSong.id);
    }
  });

  pauseButton.addEventListener("click", () => {
    userData.songCurrentTime = audio.currentTime;
    playButton.classList.remove("playing");
    audio.pause();
  });

  // Resto de los eventos de los botones de reproducción

  // Función para renderizar las canciones en la lista de reproducción
  const renderSongs = (array) => {
    const songsHTML = array
      .map((song) => {
        return `
          <li id="song-${song.id}" class="playlist-song">
            <button class="playlist-song-info" onclick="playSong(${song.id})">
              <span class="playlist-song-title">${song.title}</span>
              <span class="playlist-song-artist">${song.artist}</span>
              <span class="playlist-song-duration">${song.duration}</span>
            </button>
            <button onclick="deleteSong(${song.id})" class="playlist-song-delete" aria-label="Delete ${song.title}">
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
            </button>
          </li>
        `;
      })
      .join("");

    playlistSongs.innerHTML = songsHTML;
  };

  renderSongs(userData?.songs);
});
