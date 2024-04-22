jQuery(document).ready(function($) {

    // FONCTION POUR CHARGER PLUS DE PHOTOS :

    let pull_page = 2;

    // Fonction pour effectuer la requête AJAX pour charger plus de photos et filtrer les photos
    function getPhotosAndFilter(categoryValue, formatValue, dateValue) {
        $.ajax({
            url: photos_ajax_js.ajax_url,
            type: 'POST',
            data: {
                action: 'custom_api_get_photos', // Action à exécuter côté serveur
                page: pull_page, // Numéro de la page à récupérer
                category: categoryValue, // Valeur de la catégorie à filtrer
                format: formatValue, // Valeur du format à filtrer
                date: dateValue // Valeur de la date à filtrer
            },
            success: function(response) {
                console.log(response);
                
                // Si la réponse est vide, afficher un message
                if (!response || response.length === 0) {
                    $('#photos-list').html('<h3 class="success-message">Aucune photo trouvée !</h3>');
                    $('#photos-loader').hide();
                    return; // Sortir de la fonction si la réponse est vide
                }

                // Si la réponse est vide, cacher le bouton de chargement
                if (response.length <= 8) {
                    $('#photos-loader').hide();
                }

                // Boucle à travers chaque photo dans la réponse
                if (Array.isArray(response)) {
                    response.forEach(function(photo) {
                        // Créer un élément HTML pour la photo
                        var photoElement = '<article class="center-container"><div class="portfolio-container"><div class="portfolio-item"><div class="post-content post-category"><img src="' + photo.featured_img_src + '" alt="' + photo.title + '"><div id="full-screen"><img class="screen-link" src="' + photos_ajax_js.permalink + '/wp-content/themes/motaphoto/assets/images/screen.png"></div><a href="' + getPostUrl(photo.id) + '"><div id="info-single"><h3>' + photo.title + '</h3><h3>' + photo.categories + '</h3></div></a></div></div></div></article>';

                        // Ajouter l'élément HTML pour la photo au conteneur
                        $('#photos-list').append(photoElement);
                    });

                    // Fonction pour récupérer l'URL de la publication en fonction de son identifiant
                    function getPostUrl(postId) {
                        // Construire l'URL de la publication en utilisant l'identifiant de la publication
                        return photos_ajax_js.permalink + '/?p=' + postId;
                    }

                    // Lien vers la lighbox des photos en +
                    var screenLink = $('.screen-link');
                    var lightbox = $('#lightbox');
                    var currentIndex = 0;

                    screenLink.on('click', function(event) {
                        event.preventDefault();
                        lightbox.show();
                        currentIndex = $(this).index('.screen-link');
                        displayImageInLightbox(currentIndex);
                    });

                    // affichage de la ref et de la catégorie au survol des photos en +
                    const thumbnails = document.querySelectorAll('.post-content');

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
            },
            error: function(xhr, textStatus, errorThrown) {
                console.error('Error:', errorThrown); // Gérer les erreurs éventuelles
            }
        });
    }

    // Fonction pour charger les images filtrées.
    function loadFilterImage() {
        // Attend le changement dans les sélecteurs du formulaire
        $('#category, #format, #date').on('change', function(e) {
            e.preventDefault();

            // Réinitialise pull_page à 1 lorsqu'un filtre est appliqué
            pull_page = 1;

            // Vider le conteneur des photos existantes avant de charger de nouvelles photos
            $('#photos-list').empty();

            // Récupère les valeurs des sélecteurs
            var categoryValue = $('#category option:selected').val();
            var formatValue = $('#format option:selected').val();
            var dateValue = $('#date').val();

            // Appelle la fonction pour charger les images filtrées
            getPhotosAndFilter(categoryValue, formatValue, dateValue);
        });
    }

    // Écouteur d'événements pour le clic sur le bouton "Charger plus"
    $('#photos-loader').on('click', function(event) {
        event.preventDefault();
        // Appelle la fonction pour charger plus de photos
        getPhotosAndFilter(null, null, null);
        pull_page++; // Incrémenter le numéro de la page pour la prochaine requête
    });

    // Appelle la fonction pour charger les images filtrées lors du chargement de la page
    loadFilterImage();
});
