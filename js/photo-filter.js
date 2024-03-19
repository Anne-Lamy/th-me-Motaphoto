jQuery(document).ready(function($) {

// _______________________________________________________________
// FILTRES DU FORMULAIRE DE LA PAGE D'ACCUEIL:

// Lorsque l'élément avec l'ID "ajax_call" change (dans option) ...
$('#ajax_call').on('change', function(e) {
    e.preventDefault();

    var filter = $(this).serialize(); // Encode les données dans une chaîne de requête URL.

    // Ajout du nonce à la requête AJAX
    filter += '&nonce=' + photo_filter_js.nonce;

    console.log('Filter data:', filter); // Voir les données filtrées.

    // Effectue une requête AJAX.
    $.ajax({
        // Utilise l'URL définie par WordPress pour les requêtes AJAX.
        url: photo_filter_js.ajax_url,
        // Utilise la méthode POST pour envoyer les données.
        type: 'POST',
        // Les données à envoyer, y compris l'action à exécuter dans le fichier PHP.
        data: filter, // Les données.
        // Fonction exécutée en cas de succès de la requête AJAX.
        success: function(response) {
            console.log('Response from server:', response); // Voir la réponse du serveur.
            
            // Met à jour le contenu de l'élément contenant l'ID "ajax_return" avec la réponse reçue du serveur PHP.
            $('#ajax_return').html(response);
        }
    });
});

// _______________________________________________________________
// AFFICHAGE DE LA REF ET DE LA CATEGORIE AU SURVOL D'UNE PHOTO :

// Sélection de tous les éléments .post-content.
const thumbnails = document.querySelectorAll('.post-content');

// Sélectionne tous les .info-single de la boucle .post-content.
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

});
