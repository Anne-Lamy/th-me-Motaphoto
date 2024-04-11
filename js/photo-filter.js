jQuery(document).ready(function($) {

// _______________________________________________________________
// FONCTION POUR CHARGER PLUS DE PHOTOS :

    let jsonFlag = true;

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