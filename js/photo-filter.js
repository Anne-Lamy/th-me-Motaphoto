jQuery(document).ready(function($) {

    // Tableau pour stocker les données des images
        var imagesData = [];
        var currentIndex = 0;

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

    // _______________________________________________________________
    // AFFICHAGE DE LA LIGHTBOX :

function initializeLightbox() {

    var screenLink = $('.screen-link');
    var lightbox = $('#lightbox');
    var lightboxContainer = lightbox.find('.lightbox_container');
    var infoLightbox = lightbox.find('#info-lightbox');

    // Au clic sur l'image :
    screenLink.on('click', function(event) {
        event.preventDefault();
        
        // Récupération des données de l'image cliquée
        var dataId = $(this).data('id');
        
        // Affiche la lightbox
        lightbox.show();
        
        // Recherche de l'index correspondant dans imagesData
        var currentIndex = imagesData.findIndex(function(image) {
            return image.id === dataId;
        });
                
        // Afficher les informations dans la lightbox
        showImageAtIndex(currentIndex);

            // Navigation dans la lightbox :
            var nextButton = $('.lightbox_next');
            var prevButton = $('.lightbox_prev');
            
            nextButton.on('click', function(event) {
                event.preventDefault();
                currentIndex++;
                    // Vérifie si nous avons atteint la fin du tableau.
                    if (currentIndex >= imagesData.length) {
                        currentIndex = 0; // Retour au début.
                    }
                showImageAtIndex(currentIndex);
                console.log("Valeur aprés :", currentIndex);
            });

            prevButton.on('click', function(event) {
                event.preventDefault();
                currentIndex--;
                    // Vérifie si nous sommes au début du tableau
                    if (currentIndex < 0) {
                        currentIndex = imagesData.length - 1; // Va à la fin
                    }
                showImageAtIndex(currentIndex);
                console.log("Valeur avant :", currentIndex);
            });
    });

    function showImageAtIndex(currentIndex) {
    
        // Mettre en œuvre le code pour afficher l'image correspondant à l'index donné
        var imageData = imagesData[currentIndex];
        lightboxContainer.html('<img src="' + imageData.url + '">');
        infoLightbox.html('<h3>' + imageData.reference + '</h3>' + '<h3>' + imageData.category + '</h3>');
    }


    // Fermeture de la lightbox lorsque l'utilisateur clique sur (x) ou en dehors de la lightbox
    var closeButton = $('.lightbox_close');

    closeButton.on('click', function(event) {
        event.preventDefault();
        lightbox.hide();
    });

    $(document).on('click', function(event) {
        if ($(event.target).closest(lightbox).length === 0 && !$(event.target).hasClass('screen-link')) {
            lightbox.hide();
        }
    });

    // Chargement des images via Ajax dans la lightbox :
    $.ajax({
        url: photos_ajax_js.ajax_url,
        type: 'post',
        dataType: 'json',
        data: {
            action: 'full_image_lightbox'
        },
        success: function(response) {
            imagesData = response.images;
            totalImages = imagesData.length;
            // Afficher la première image lors du chargement initial
            showImageAtIndex(currentIndex);
        }
    });
}

    // _______________________________________________________________
    // FONCTION POUR CHARGER PLUS DE PHOTOS FILTREES :

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

                if (Array.isArray(response)) {
                response.forEach(function(photo, index) {
                    // Créer un élément HTML pour la photo
                    var photoElement = '<article class="center-container"><div class="portfolio-container"><div class="portfolio-item"><div class="post-content post-category"><img src="' + photo.featured_img_src + '" alt="' + photo.title + '"><div id="full-screen"><img data-id="' + photo.id + '" data-reference="' + photo.reference + '" data-category="' + photo.categories + '" class="screen-link" src="' + photos_ajax_js.permalink + '/wp-content/themes/motaphoto/assets/images/screen.png" data-index="' + index + '"></div><a href="' + getPostUrl(photo.id) + '"><div id="info-single"><h3>' + photo.title + '</h3><h3>' + photo.categories + '</h3></div></a></div></div></div></article>';
                    
                    // Ajouter l'élément HTML pour la photo au conteneur
                    $('#photos-list').append(photoElement);
                });



                    // Fonction pour récupérer l'URL de la publication en fonction de son identifiant
                    function getPostUrl(postId) {
                        // Construire l'URL de la publication en utilisant l'identifiant de la publication
                        return photos_ajax_js.permalink + '/?p=' + postId;
                    }

                    // Appelle la fonction d'affichage de la lighbox des photos en +
                    initializeLightbox();

                    // Appelle la fonction des infos au survol des photos en +
                    classMouseover();
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                console.error('Error:', errorThrown); // Gérer les erreurs éventuelles
            }
        });
    }

    // Fonction pour charger les images filtrées.
    function loadFilterImage() {
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

    // Bouton "Charger plus"
    $('#photos-loader').on('click', function(event) {
        event.preventDefault();
        // Appelle la fonction pour charger plus de photos
        getPhotosAndFilter(null, null, null);
        pull_page++; // Incrémenter le numéro de la page pour la prochaine requête
    });


    // _______________________________________________________________

// Fonction pour charger les images filtrées lors du chargement de la page
$(document).ready(function($) {

    // Initialisation de Chosen
    $('.chosen-select').chosen();
    
    // Appelle la fonction pour charger une image aléatoire.
    loadRandomImage();

    // Appelle la fonction des infos au survol
    classMouseover();

    // Appelle la fonction pour charger les images filtrées lors du chargement de la page
    loadFilterImage();

    // Appelle la fonction pour initialiser la lightbox
    initializeLightbox();
});

    
});