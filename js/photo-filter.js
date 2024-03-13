jQuery(document).ready(function($) {
    // Lorsque l'élément avec l'ID "ajax_call" change (dans option) ...
    $('#ajax_call').on('change', function() {

        var data = $(this).serialize(); // encode dans une chaîne de requête URL.

        console.log(data); // Affiche les données envoyées dans la console

        // Effectue une requête AJAX.
        $.ajax({
            // Utilise l'URL définie par WordPress pour les requêtes AJAX.
            url: ajaxurl,
            // Utilise la méthode POST pour envoyer les données.
            type: 'POST',
            // Les données à envoyer, y compris l'action à exécuter dans le fichier PHP.
            data: data + '&action=motaphoto_request_photos',
            // Fonction exécutée en cas de succès de la requête AJAX.
            
            success: function(response) {
                // Met à jour le contenu de l'élément avec l'ID "ajax_return" avec la réponse reçue du serveur PHP.
                $('#ajax_return').html(response);
                }
        });


        // Empêche le formulaire de se soumettre normalement.
        return false;
    });
});
