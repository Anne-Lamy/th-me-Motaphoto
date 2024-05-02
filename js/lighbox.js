jQuery(document).ready(function($) {
    // Détecter le clic sur le lien screen-link
    $('.screen-link').on('click', function(event) {
        event.preventDefault(); // Empêcher le comportement par défaut du lien

        // Récupérer l'URL de la photo associée
        var imageUrl = $(this).closest('.portfolio-item').find('.single-thumbnail').attr('src');
        
        // Récupérer la référence de la photo
        var reference = $(this).closest('.portfolio-item').find('#info-single h3:first-of-type').text();
        
        // Récupérer les catégories de la photo
        var categories = $(this).closest('.portfolio-item').find('#info-single h3:last-of-type').text();
        
        // Afficher l'image dans la lightbox
        $('#lightbox .lightbox_container').html('<img src="' + imageUrl + '">');
        
        // Afficher la référence dans la lightbox
        $('#info-lightbox h3:first-of-type').text(reference);
        
        // Afficher les catégories dans la lightbox
        $('#info-lightbox h3:last-of-type').text(categories);
        
        // Afficher la lightbox
        $('#lightbox').fadeIn();
    });

    // Fermer la lightbox en cliquant sur le bouton de fermeture
    $('.lightbox_close').on('click', function() {
        $('#lightbox').fadeOut();
    });
});
