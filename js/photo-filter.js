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
// AFFICHAGE DE LA REF ET DE LA CATEGORIE AU SURVOL D'UNE PHOTO :

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


// _______________________________________________________________
// FONCTION DE CHARGEMENT DES PHOTOS POUR photo_filter.php :
    
function loadFilterImage() {

        // Vérifie si les sélecteurs existent
        if ($('#category').length && $('#format').length && $('#date').length) {
            // Attend le changement dans les sélecteurs du formulaire
            $('#category, #format, #date').on('change', function(e) {
                e.preventDefault(); // Empêche le formulaire de se soumettre normalement

                // Récupère les valeurs des sélecteurs individuellement
                var categoryValue = $('#category').val();
                var formatValue = $('#format').val();
                var dateValue = $('#date').val();

                console.log(categoryValue);
                console.log(formatValue);
                console.log(dateValue);

                console.log("La fonction de rappel est déclenchée !");

                // Récupère le nonce depuis les données localisées
                var nonce = photos_ajax_js.nonce;

                // Effectue une requête AJAX
                $.ajax({
                    type: 'POST',
                    url: photos_ajax_js.ajax_url,
                    data: {
                        action: 'request_photos', // Action à appeler dans functions.php
                        category: categoryValue, // Valeur de la catégorie
                        format: formatValue, // Valeur du format
                        date: dateValue, // Valeur de la date
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
        } else {
            console.log('Les sélecteurs ne sont pas trouvés.');
        };
}

// Appelle la fonction pour charger les images filtrées.
loadFilterImage();


// _______________________________________________________________
// ANIMATION DES FILTRES :

var x, i, j, l, ll, selElmnt, a, b, c;

/* Recherchez tous les éléments avec la classe « custom-select » :*/
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;

    /* Pour chaque élément, créez une nouvelle DIV qui fera office d'élément sélectionné : */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);

    /* Pour chaque élément, créez une nouvelle DIV qui contiendra la liste d'options :*/
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
    /* Pour chaque option de l'élément select d'origine,
     créez une nouvelle DIV qui fera office d'élément d'option : */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* Lorsqu'un élément est cliqué, mettez à jour la zone de sélection d'origine,
         et l'élément sélectionné : */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
                y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
            }
        }
        h.click();
    });
    b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("mouseover", function(e) {
    /* Lorsque vous survolez la case de sélection, fermez toutes les autres cases de sélection,
     et ouvrez/fermez la boîte de sélection actuelle : */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
});
}

function closeAllSelect(elmnt) {
/* Une fonction qui fermera toutes les cases de sélection du document,
sauf la zone de sélection actuelle : */
var x, y, i, xl, yl, arrNo = [];
x = document.getElementsByClassName("select-items");
y = document.getElementsByClassName("select-selected");
xl = x.length;
yl = y.length;
for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
    arrNo.push(i)
    } else {
        y[i].classList.remove("select-arrow-active");
}
}
for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
    x[i].classList.add("select-hide");
    }
}
}

/* Si l'utilisateur clique n'importe où en dehors de la zone de sélection, ferme toutes les cases de sélection : */
document.addEventListener("click", closeAllSelect);

});