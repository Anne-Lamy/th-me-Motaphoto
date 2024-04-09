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

        // Obtient l'index de l'image actuelle
        var current_index = $(this).data('image');

        // Effectue une requête Ajax POST vers admin-ajax.php pour charger l'image actuelle
        $.ajax({
            url: photos_ajax_js.ajax_url,
            type: 'POST',
            data: {
                action: 'full_image_lightbox', // Action à exécuter côté serveur
                current_index: current_index
            },
            success: function(response) {
                console.log(response);
                // Met à jour le contenu de la div .lightbox_container avec la réponse (l'image chargée).
                $('.lightbox_container').html('<img src="' + response + '">');
            }
        });
    });

// _______________________________________________________________
// NAVIGATION DANS LA LIGHTBOX :

    // Sélectionne les boutons "lightbox_next" et "lightbox_prev"
    var nextButton = $('.lightbox_next');
    var prevButton = $('.lightbox_prev');
    var currentIndex = 0; // Index de l'image actuelle

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
                console.log(data);
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
                console.log(data);
                // Mettez à jour la lightbox avec l'image précédente
                updateLightbox(data.url);
            }
        });
    }

    // Fonction pour mettre à jour la lightbox avec une nouvelle image
    function updateLightbox(imageUrl) {
        // Mettre à jour l'élément de la lightbox avec la nouvelle image
        var lightboxImage = $('.lightbox_container img');
        lightboxImage.attr('src', imageUrl);
    }

    nextButton.on('click', function(event) {
        event.preventDefault();
        currentIndex++; // Image suivante
        fetchNextImage();
    });

    prevButton.on('click', function(event) {
        event.preventDefault();
        currentIndex--; // Image précédente
        fetchPrevImage();
    });

// _______________________________________________________________
// FERMETURE DE LA LIGHTBOX :

    // Fermeture de la lightbox lorsque l'utilisateur clique sur (x) ou en dehors de la lightbox
    var closeButton = $('.lightbox_close');

    closeButton.on('click', function(event) {
        event.preventDefault();
        lightbox.hide();
    });

    document.onclick = function(event) {
        if (event.target == lightbox[0]) {
            lightbox.hide();
        }
    };

});
