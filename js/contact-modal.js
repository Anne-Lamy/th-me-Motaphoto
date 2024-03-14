document.addEventListener("DOMContentLoaded", function() {

    // Récupérer la modale
    var modal = document.getElementById('contact-modal');
    // Récupérer l'élément "Contact" du menu.
    var contactLinks = document.querySelectorAll("#contact-link, #btnContact");
    // Récupérer l'élément <span> qui ferme la modale
    var span = document.getElementsByClassName("close")[0];

    // Afficher la modale dès que la page se charge
    modal.style.display = "block";

    // Lorsque l'utilisateur clique sur les liens "Contact", la modale s'ouvre.
    contactLinks = Array.from(contactLinks); // Conversion en tableau
    contactLinks.forEach(function(link) {
        link.onclick = function() {
            modal.style.display = "block";
        };
    });

    // Lorsque l'utilisateur clique sur <span> (x), la modale disparait.
    span.onclick = function() {
        modal.style.display = "none";
    }
    // Lorsque l'utilisateur clique n'importe où en dehors de la modale, elle se ferme.
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

});
