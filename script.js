document.getElementById('fileInput').addEventListener('change', function() {
    let file = this.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function(event) {
            let img = document.createElement('img');
            img.src = event.target.result;
            img.className = 'gallery-item';
            document.getElementById('gallery-grid').appendChild(img);
        };
        reader.readAsDataURL(file);
    }
});
