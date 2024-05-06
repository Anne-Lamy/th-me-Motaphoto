document.addEventListener("DOMContentLoaded", function() {
    
    // AFFICHAGE DE LA MODALE :

    // Récupére la modale
    var modal = document.getElementById('contact-modal');
    // Récupére l'élément "Contact" du menu.
    var contactLinks = document.querySelectorAll("#contact-link, #btnContact");
    // Récupére l'élément <span> qui ferme la modale
    var span = document.getElementsByClassName("close")[0];

    // Lorsque l'utilisateur clique sur les liens "Contact", la modale s'ouvre.
    contactLinks = Array.from(contactLinks); // Conversion en tableau.
    contactLinks.forEach(function(link) {
        link.onclick = function() {
            modal.style.display = "block";
        };
    });

    // Récupérer le formulaire.
    var form = document.getElementById('contact-motaphoto');
    // Fermer la modale 3 secondes aprés vaildation.
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        setTimeout(function() {
        modal.style.display = "none";
        }, 3000);

        // Envoyer un message lors de la validation.
        var messageContainer = document.getElementById('message-container');
        
        messageContainer.innerHTML = ''; // Nettoyer le contenu précédent
        messageContainer.innerText = 'Votre message a bien été envoyé.';
        messageContainer.classList.add('success-message');
    });

    // Lorsque l'utilisateur clique sur <span> (x), la modale disparait.
    span.onclick = function() {
            modal.style.display = "none";
    };

    // Lorsque l'utilisateur clique n'importe où en dehors de la modale, elle se ferme.
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    


});
