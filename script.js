const API_KEY = "AIzaSyA8VACtdCiBmDDv1W3gFM8WJqz-A_y5ZoM";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

document.addEventListener("DOMContentLoaded", () => {
    fetchAnimeVideos();
});

function fetchAnimeVideos() {
    const url = `${BASE_URL}/search?part=snippet&q=anime&type=video&maxResults=5&key=${API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const animeList = document.getElementById("anime-list");
            animeList.innerHTML = ""; 

            data.items.forEach(video => {
                const animeItem = document.createElement("div");
                animeItem.classList.add("anime-item");

                animeItem.innerHTML = `
                    <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}">
                    <h3>${video.snippet.title}</h3>
                    <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">Watch</a>
                `;
                
                animeList.appendChild(animeItem);
            });
        })
        .catch(error => console.error("Error fetching anime videos:", error));
}
