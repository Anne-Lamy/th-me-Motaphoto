jQuery(document).ready(function($) {

// FILTRES DU FORMULAIRE DE LA PAGE D'ACCUEIL:

    console.log('Le script JS a bien été chargé');

    // Lorsque l'élément avec l'ID "ajax_call" change (dans option) ...
    $('#ajax_call').on('change', function() {

        console.log('Le filtre du formulaire a été soumis');

        var filter = $(this).serialize(); // Encode les données dans une chaîne de requête URL.

        console.log(filter); // Affiche les données envoyées dans la console

        // Effectue une requête AJAX.
        $.ajax({
            // Utilise l'URL définie par WordPress pour les requêtes AJAX.
            url: photo_filter_js.ajax_url,
            // Utilise la méthode POST pour envoyer les données.
            type: 'POST',
            // Les données à envoyer, y compris l'action à exécuter dans le fichier PHP.
            data: 'action=motaphoto_request_photos&' + filter, // Concaténation de l'action et des données.
            // Fonction exécutée en cas de succès de la requête AJAX.
            success: function(response) {
                // Met à jour le contenu de l'élément avec l'ID "ajax_return" avec la réponse reçue du serveur PHP.
                $('#ajax_return').html(response);
            }
        });

        // Empêche le formulaire de se soumettre normalement.
        return false;
    });




// AFFICHAGE DE LA REF ET DE LA CATEGORIE AU SURVOLE D'UNE PHOTO :

// Sélection de tous les éléments .post-content.
const thumbnails = document.querySelectorAll('.post-content');

// Sélectionne tous les .info-single de la boucle .post-content.
thumbnails.forEach(thumbnail => {
    const info = thumbnail.querySelector('#info-single');

    thumbnail.addEventListener('mouseover', function() {
        info.classList.add('fadeInTop');
    });

    thumbnail.addEventListener('mouseout', function() {
        info.classList.remove('fadeInTop');
    });
});



});
