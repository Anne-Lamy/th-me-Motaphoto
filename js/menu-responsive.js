document.addEventListener('DOMContentLoaded', function () {

// APPARITION DU MENU XL (déplié) DE NAVIGATION MOBILE :

    const burger = document.getElementById('burger');
    const cross = document.getElementById('cross');
    const menuXL = document.getElementById('menu-xl');
    const links = document.querySelectorAll('.menu-xl li');

    burger.addEventListener('click', function (event) {
        event.preventDefault();
        menuXL.classList.add('fadeInTop');
        burger.style.display = 'none';
        cross.style.display = 'block';
    });

    cross.addEventListener('click', function (event) {
        event.preventDefault();
        menuXL.classList.remove('fadeInTop');
        cross.style.display = 'none';
        burger.style.display = 'block';
    });

    //Ajouter un écouteur d'événements à chaque lien du menu pour masquer le menu
    links.forEach(function(link) {
        link.addEventListener('click', function() {
            menuXL.classList.remove('fadeInTop');
            cross.style.display = 'none';
            burger.style.display = 'block';
        });
    });
    
});