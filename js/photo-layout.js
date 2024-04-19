jQuery(document).ready(function($) {

// _______________________________________________________________
// FONCTION POUR CHARGER UNE IMAGE ALEATOIRE :
    
function loadRandomImage() {
    // Effectue une requête Ajax POST vers admin-ajax.php
    $.ajax({
        url: photos_ajax_js.ajax_url,
        type: 'POST',
        data: {
            action: 'load_random_image' // Action à exécuter côté serveur
        },
        success: function(response) {
            // Met à jour le contenu de la div .first-img avec la réponse (l'image chargée).
            $('.first-img').html(response);
        }
    });
}

// Appelle la fonction pour charger une image aléatoire.
loadRandomImage();

// Charge image aléatoire lorsque celle-ci est cliquée.
$('.load-more-images').on('click', function() {
    loadRandomImage();
});


// _______________________________________________________________
// FONCTION POUR CHARGER UNE IMAGE PAR CATEGORIE :
    
/* function loadCategoryImages(category) {
    $.ajax({
        url: photos_ajax_js.ajax_url,
        type: 'POST',
        data: {
            action: 'load_category_image',
            category: category
        },
        success: function(response) {
            console.log(response);
            var images = response.images;
            var container = $('.post-content');
            // Efface le contenu précédent
            container.empty();
            // Ajoute les nouvelles images
            $.each(images, function(index, image) {
                // Ajoute la classe single-thumbnail à l'image
                var imgHtml = '<img src="' + image.url + '" alt="' + image.title + '" class="single-thumbnail">';
                container.append(imgHtml);
            });
        }
    });
}

// Charger les images lorsque la page est prête
var category = $('.post-content').data('category');
loadCategoryImages(category); */


// _______________________________________________________________
// AFFICHAGE DE LA REF ET DE LA CATEGORIE AU SURVOL D'UNE PHOTO :

function classMouseover() {
// Sélection de tous les éléments .post-content.
const thumbnails = document.querySelectorAll('.post-content');

// Sélectionne tous les elements de la boucle .post-content.
thumbnails.forEach(thumbnail => {
    const info = thumbnail.querySelector('#info-single');
    const screen = thumbnail.querySelector('#full-screen');

    thumbnail.addEventListener('mouseover', function() {
        info.classList.add('fadeInTop');
        screen.classList.add('fadeInTop');
    });

    thumbnail.addEventListener('mouseout', function() {
        info.classList.remove('fadeInTop');
        screen.classList.remove('fadeInTop');
    });
});

}
classMouseover()

});