jQuery(document).ready(function($) {

    // AFFICHAGE DE LA LIGHTBOX :

    // Récupére les élément de la lightbox.
    const lightbox = document.getElementById('lightbox');
    const screenLinks = document.querySelectorAll('.screen-link');
    const lightboxContainer = document.querySelector('.lightbox_container.full-image');
    // Récupére les éléments de navigation de la lightbox.
    const spanClose = document.querySelector(".lightbox_close");
    const prevButton = document.querySelector('.lightbox_prev');
    const nextButton = document.querySelector('.lightbox_next');

    // Variables pour stocker les URLs des images
    let imageUrls = [];
    let currentImageIndex = 0;

    // _______________________________________________________________
    // FONCTION POUR CHARGER L'IMAGE :
        
    // Fonction pour charger une image dans la lightbox.
    function loadFullImage(imageUrl) {
        lightboxContainer.innerHTML = '<img src="' + imageUrl + '" alt="Image à afficher">';
    }
        
    // Fonction pour charger toutes les images de la publication "photos".
    function loadAllImages() {
        $.ajax({
            url: photos_ajax_js.ajax_url,
            type: 'POST',
            data: {
                action: 'full_image_lightbox',
            },
            success: function(response) {
                if (response && response.length > 0) { // Vérification que la réponse contient des données
                    imageUrls = response; // Stocke les URLs des images
                    // Charge la première image si la lightbox est affichée
                    if (lightbox.style.display === "block") {
                        loadFullImage(imageUrls[currentImageIndex]);
                    }
                }
            }
        });
    }

    // Chargement initial de toutes les images
    loadAllImages();

    // _______________________________________________________________
    // NAVIGATION DANS LA LIGHTBOX :

    // Lorsque l'utilisateur clique sur un lien "screen-link", la lightbox s'affiche et charge l'image correspondante.
    screenLinks.forEach(link => {
        link.onclick = function() {
            lightbox.style.display = "block";
            const imageUrl = this.getAttribute('data-image'); // URL de l'image à charger
            if (imageUrl) {
                loadFullImage(imageUrl);
            }
        };
    });
    
    // Chargement de l'image précédente
    if (prevButton) {
        prevButton.onclick = function() {
            if (currentImageIndex > 0) {
                currentImageIndex--; // Décrémente l'indice
                loadFullImage(currentImageIndex); // Charge l'image précédente.
            }
        };
    }
    // Chargement de l'image suivante
    if (nextButton) {
        nextButton.onclick = function() {
            if (currentImageIndex < imageUrls.length - 1) {
                currentImageIndex++; // Incrémente l'indice
                loadFullImage(currentImageIndex); // Charge l'image suivante.
            }
        };
    }

    // Lorsque l'utilisateur clique sur (x), la lightbox disparait.
    spanClose.onclick = function() {
        lightbox.style.display = "none";
    }
    // Lorsque l'utilisateur clique n'importe où en dehors de la lightbox, elle se ferme.
    document.onclick = function(event) {
        if (event.target == lightbox) {
            lightbox.style.display = "none";
        }
    }



});