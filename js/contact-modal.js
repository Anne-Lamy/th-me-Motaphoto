// Récupérer la modale
var modal = document.getElementById('myModal');

// Récupérer l'élément <span> qui ferme la modale
var span = document.getElementsByClassName("close")[0];

// Afficher la modale dès que la page se charge
window.onload = function() {
    modal.style.display = "block";
}

// Lorsque l'utilisateur clique sur <span> (x), faire disparaître la modale
span.onclick = function() {
    modal.style.display = "none";
}

// Lorsque l'utilisateur clique n'importe où en dehors de la modale, la fermer
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
