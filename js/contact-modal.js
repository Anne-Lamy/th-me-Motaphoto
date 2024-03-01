// Récupérer la modale
var modal = document.getElementById('myModal');

// Récupérer le bouton qui ouvre la modale
var btn = document.getElementById("myBtn");

// Récupérer l'élément <span> qui ferme la modale
var span = document.getElementsByClassName("close")[0];

// Lorsque l'utilisateur clique sur le bouton, ouvrir la modale
btn.onclick = function() {
    modal.style.display = "block";
}

// Lorsque l'utilisateur clique sur <span> (x), fermer la modale
span.onclick = function() {
    modal.style.display = "none";
}

// Lorsque l'utilisateur clique n'importe où en dehors de la modale, la fermer
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
