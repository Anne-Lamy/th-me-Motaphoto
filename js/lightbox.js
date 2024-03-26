jQuery(document).ready(function($) {

    // AFFICHAGE DE LA LIGHTBOX :

    // Récupérer la lightbox.
    const lightbox = document.getElementById('lightbox');
    // Récupérer le lien "screen-link" qui ouvre la lightbox.
    const screenLinks = document.querySelectorAll('.screen-link');
    // Récupérer (x) qui ferme la lightbox.
    const spanClose = document.querySelector(".lightbox_close");

    // Lorsque l'utilisateur clique sur un lien "screen-link", la lightbox s'affiche.
    screenLinks.forEach(link => {
        link.onclick = function() {
            lightbox.style.display = "block";
        }
    });
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


// _______________________________________________________________
// FONCTION POUR CHARGER L'IMAGE :
    
function fullImage() {
    var postContentHtml = $('.post-content').html();
    // Effectue une requête Ajax POST vers admin-ajax.php
    $.ajax({
        url: photos_ajax_js.ajax_url,
        type: 'POST',
        data: {
            action: 'full_image_lightbox', // Action à exécuter côté serveur
            html: postContentHtml, // Passer le HTML de la div "post-content"
        },
        success: function(response) {
            // Met à jour le contenu de la div ".lightbox_container" avec l'image récupérée
            $('.lightbox_container').html(response);
        }
    });
}

// Appelle la fonction pour charger l'image.
fullImage();



});

