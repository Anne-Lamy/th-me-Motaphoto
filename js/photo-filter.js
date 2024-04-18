jQuery(document).ready(function($) {

// _______________________________________________________________
// FONCTION POUR CHARGER PLUS DE PHOTOS :

let pull_page = 2;

// Fonction pour effectuer la requête AJAX
function getMorePhotos() {
    
    $.ajax({
        url: photos_ajax_js.ajax_url,
        type: 'POST',
        data: {
            action: 'custom_api_get_photos', // Action à exécuter côté serveur
            page: pull_page // Numéro de la page à récupérer
        },
        success: function(response) {
            console.log(response);
            pull_page++; // Incrémenter le numéro de la page pour la prochaine requête

            // Si la réponse est vide, cacher le bouton de chargement
            if (response.length === 0) {
                $('#photos-loader').hide();
            }

            // Boucle à travers chaque photo dans la réponse
            response.forEach(function(photo) {
                // Créer un élément HTML pour la photo
                var photoElement = '<article class="center-container"><div class="portfolio-container"><div class="portfolio-item"><div class="post-content post-category"><img src="' + photo.featured_img_src + '" alt="' + photo.title + '"><div id="full-screen"><img class="screen-link" src="' + photos_ajax_js.ajax_url + '/wp-content/themes/motaphoto/assets/images/screen.png"></div><a href="' + photos_ajax_js.permalink + '"><div id="info-single"><h3>' + photo.title + '</h3><h3>' + photo.categories + '</h3></div></a></div></div></div></article>';
                
                console.log(photoElement);

                // Ajouter la photo au conteneur
                $('#photos-list').append(photoElement);
            });

        },
        error: function(xhr, textStatus, errorThrown) {
            console.error('Error:', errorThrown); // Gérer les erreurs éventuelles
        }
    });
}

    // Écouteur d'événements pour le clic sur le bouton "Charger plus"
    $('#photos-loader').on('click', function(event) {
        // Appeler la fonction pour charger plus de photos
        getMorePhotos();
    });


// _______________________________________________________________
// FONCTION DE TRIE DES PHOTOS :
    
function loadFilterImage() {

    // Attend le changement dans les sélecteurs du formulaire
    $('#category, #format, #date').on('change', function(e) {
        e.preventDefault();

        console.log("Événement CHANGE détecté...");

        // Récupère les valeurs des sélecteurs
        var categoryValue = $('#category option:selected').data('slug');
        var formatValue = $('#format option:selected').data('slug');
        var dateValue = $('#date').val();

        console.log(categoryValue);
        console.log(formatValue);
        console.log(dateValue);

        // Récupère le nonce depuis les données localisées
        var nonce = photos_ajax_js.nonce;

        // Effectue une requête AJAX
        $.ajax({
            type: 'POST',
            url: photos_ajax_js.ajax_url,
            dataType: 'html', // Type de données attendu en retour
            data: {
                action: 'filter_photos', // Action à appeler dans functions.php
                category: categoryValue,
                format: formatValue,
                date: dateValue,
                nonce: nonce // Ajout du nonce dans les données de la requête
            },
            success: function(response) {
                console.log(response);
                $('.post-content').html(response); // Met à jour la première classe .post-content
            },
            error: function(xhr, status, error) {
                console.log(xhr.responseText); // Affiche l'erreur en cas de problème
            }
        });
    });
}

// Appelle la fonction pour charger les images filtrées.
loadFilterImage();



});