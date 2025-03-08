// Mengubah background setiap beberapa detik
let backgrounds = ["background-1.jpg", "background-2.jpg", "background-3.jpg"];
let index = 0;

function changeBackground() {
    document.body.style.backgroundImage = `url(${backgrounds[index]})`;
    index = (index + 1) % backgrounds.length;
}

setInterval(changeBackground, 5000); // Ganti setiap 5 detik
changeBackground();

// Menampilkan dan menyimpan link Google Drive
const uploadBtn = document.getElementById("uploadBtn");
const uploadModal = document.getElementById("uploadModal");
const saveBtn = document.getElementById("saveBtn");
const driveLinkInput = document.getElementById("driveLink");
const galleryContainer = document.getElementById("gallery-container");

// Buka modal upload
uploadBtn.addEventListener("click", () => {
    uploadModal.style.display = "block";
});

// Simpan link dan tambahkan ke gallery
saveBtn.addEventListener("click", () => {
    let driveLink = driveLinkInput.value.trim();
    if (driveLink) {
        let embedLink = driveLink.replace("/view?usp=drivesdk", "/preview");

        let imgElement = document.createElement("iframe");
        imgElement.src = embedLink;
        imgElement.width = "200";
        imgElement.height = "200";
        imgElement.style.borderRadius = "5px";

        galleryContainer.appendChild(imgElement);
        saveToLocalStorage(embedLink);

        driveLinkInput.value = "";
        uploadModal.style.display = "none";
    }
});

// Simpan ke localStorage agar tidak hilang saat refresh
function saveToLocalStorage(link) {
    let savedLinks = JSON.parse(localStorage.getItem("galleryLinks")) || [];
    savedLinks.push(link);
    localStorage.setItem("galleryLinks", JSON.stringify(savedLinks));
}

// Ambil dari localStorage saat halaman dimuat
function loadGallery() {
    let savedLinks = JSON.parse(localStorage.getItem("galleryLinks")) || [];
    savedLinks.forEach(link => {
        let imgElement = document.createElement("iframe");
        imgElement.src = link;
        imgElement.width = "200";
        imgElement.height = "200";
        imgElement.style.borderRadius = "5px";
        galleryContainer.appendChild(imgElement);
    });
}

window.onload = loadGallery;
