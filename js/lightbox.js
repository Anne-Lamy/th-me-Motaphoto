jQuery(document).ready(function($) {

    // _______________________________________________________________
    // AFFICHAGE DE LA LIGHTBOX :

    var screenLink = $('.screen-link');
    var lightbox = $('#lightbox');
    var lightboxContainer = lightbox.find('.lightbox_container');

    // Tableau pour stocker les URL des images
    var images = [];
    var currentIndex = 0;

    // Ajoute un écouteur d'événement pour le clic sur l'image
    screenLink.on('click', function(event) {
        event.preventDefault();
        // Affiche la lightbox
        lightbox.show();

        // Obtient l'index de l'image actuelle
        currentIndex = $(this).index('.screen-link');

        // Affiche l'image actuelle dans la lightbox
        lightboxContainer.html('<img src="' + images[currentIndex] + '">');
    });

    // _______________________________________________________________
    // NAVIGATION DANS LA LIGHTBOX :

    // Sélectionne les boutons "lightbox_next" et "lightbox_prev"
    var nextButton = $('.lightbox_next');
    var prevButton = $('.lightbox_prev');

    nextButton.on('click', function(event) {
        event.preventDefault();
        // Incrémente l'index
        currentIndex++;
        // Vérifie si nous avons atteint la fin du tableau
        if (currentIndex >= images.length) {
            currentIndex = 0; // Retour au début
        }
        // Affiche l'image suivante dans la lightbox
        lightboxContainer.html('<img src="' + images[currentIndex] + '">');
    });

    prevButton.on('click', function(event) {
        event.preventDefault();
        // Décrémente l'index
        currentIndex--;
        // Vérifie si nous sommes au début du tableau
        if (currentIndex < 0) {
            currentIndex = images.length - 1; // Va à la fin
        }
        // Affiche l'image précédente dans la lightbox
        lightboxContainer.html('<img src="' + images[currentIndex] + '">');
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


    // _______________________________________________________________
    // CHARGEMENT DES IMAGES VIA AJAX DANS LA LIGHTBOX :

    $.ajax({
        url: photos_ajax_js.ajax_url,
        type: 'post',
        dataType: 'json',
        data: {
            action: 'full_image_lightbox'
        },
        success: function(response) {
            images = response.images;
        }
    });

});
