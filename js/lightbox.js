jQuery(document).ready(function($) {

    // _______________________________________________________________
    // AFFICHAGE DE LA LIGHTBOX :

    var screenLink = $('.screen-link');
    var lightbox = $('#lightbox');

    // Ajoute un écouteur d'événement pour le clic sur l'image
    screenLink.on('click', function(event) {
        event.preventDefault();
        // Affiche la lightbox
        lightbox.show();
    });

    // _______________________________________________________________
    // NAVIGATION DANS LA LIGHTBOX :

    // Sélectionne les boutons "lightbox_next" et "lightbox_prev"
    var nextButton = $('.lightbox_next');
    var prevButton = $('.lightbox_prev');
    var currentIndex = 0; // Index de l'image actuelle

    nextButton.on('click', function(event) {
        event.preventDefault();
        currentIndex++;
        // Envoie une requête AJAX pour obtenir l'image suivante
        fetchNextImage();
    });

    prevButton.on('click', function(event) {
        event.preventDefault();
        currentIndex--;
        // Envoie une requête AJAX pour obtenir l'image précédente
        fetchPrevImage();
    });

    // Fonction pour envoyer une requête AJAX pour obtenir l'image suivante
    function fetchNextImage() {
        $.ajax({
            url: photos_ajax_js.ajax_url,
            method: 'POST',
            data: {
                action: 'full_image_lightbox',
                current_index: currentIndex
            },
            dataType: 'json',
            success: function(data) {
                // Mettez à jour la lightbox avec l'image suivante
                updateLightbox(data.url);
            }
        });
    }

    // Fonction pour envoyer une requête AJAX pour obtenir l'image précédente
    function fetchPrevImage() {
        $.ajax({
            url: photos_ajax_js.ajax_url,
            method: 'POST',
            data: {
                action: 'full_image_lightbox',
                current_index: currentIndex
            },
            dataType: 'json',
            success: function(data) {
                // Mettez à jour la lightbox avec l'image précédente
                updateLightbox(data.url);
            }
        });
    }

    // Fonction pour mettre à jour la lightbox avec une nouvelle image
    function updateLightbox(imageUrl) {
        // Mettez à jour l'élément de la lightbox avec la nouvelle image
        var lightboxImage = $('.lightbox_container img');
        lightboxImage.attr('src', imageUrl);
    }

    // _______________________________________________________________
    // FERMETURE DE LA LIGHTBOX :

    // Lorsque l'utilisateur clique sur (x), la lightbox disparait.
    var closeButton = $('.lightbox_close');

    closeButton.on('click', function(event) {
        event.preventDefault();
        lightbox.style.display = "none";
    });

    // Lorsque l'utilisateur clique n'importe où en dehors de la lightbox, elle se ferme.
    document.onclick = function(event) {
        if (event.target == lightbox) {
            lightbox.style.display = "none";
        }
    }

});
