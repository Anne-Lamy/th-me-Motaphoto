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

    // _______________________________________________________________
    // FONCTION POUR CHARGER L'IMAGE :
        
function fullImage() {
    // Récupère l'URL de l'image avec la classe "lightbox-image"
    var imageUrl = $('.post-content .lightbox-image').attr('src');

    console.log(imageUrl); // Affiche l'URL de l'image dans la console.

    if (imageUrl) {
        $.ajax({
            url: photos_ajax_js.ajax_url,
            type: 'POST',
            data: {
                action: 'full_image_lightbox',
                image_url: imageUrl, // Passer l'URL de l'image.
            },
            success: function(response) {
                $('.lightbox_container').html(response);
            }
        });
    } else {
        console.log('Aucune image trouvée dans la div "post-content"');
    }
}

fullImage();

    // _______________________________________________________________
    // NAVIGATION DANS LA LIGHTBOX :

    // Lorsque l'utilisateur clique sur un lien "screen-link", la lightbox s'affiche.
    screenLinks.forEach(link => {
        link.onclick = function() {
            lightbox.style.display = "block";
        }
    });
    // Chargement de l'image précédente.
    if (prevButton) {
        prevButton.onclick = function() {
            // Récupère la valeur de l'attribut data-image de prevButton (URL de l'image précédente)
            const imageUrl = this.getAttribute('data-image');
            if (imageUrl) { // Si l'URL de l'image est définie (non vide ou non nulle)
                // Met à jour le contenu de lightboxContainer avec une balise img contenant l'URL de l'image précédente.
                lightboxContainer.innerHTML = '<img src="' + imageUrl + '" alt="Image à afficher">';
            }
        };
    }
    // Chargement de l'image suivante.
    if (nextButton) {
        nextButton.onclick = function() {
            const imageUrl = this.getAttribute('data-image');
            if (imageUrl) {
                lightboxContainer.innerHTML = '<img src="' + imageUrl + '" alt="Image à afficher">';
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

