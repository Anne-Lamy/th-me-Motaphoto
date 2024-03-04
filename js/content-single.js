document.addEventListener("DOMContentLoaded", function () {

    // Ajoute un écouteur d'événement au clic sur l'élément avec l'ID "ajax_call".
    document.querySelector("#ajax_call").addEventListener("click", function () {
    // Crée un nouvel objet postData pour stocker les données du formulaire.
    let postData = new postData();
    // Ajoute une paire clé-valeur à l'objet postData, avec "action" comme clé et "request_photos" comme valeur.
    postData.append("action", "request_photos");




    // Effectue une requête HTTP POST à l'URL définie dans single_script_js.ajax_url, en envoyant les données du formulaire.
    fetch(single_script_js.ajax_url, {
        method: "POST", // Utilise la méthode POST pour envoyer les données.
        body: postData, // Utilise les données du post photos comme corps de la requête.
    })

        .then(function (response) {
        // Gère la réponse de la requête.
        if (!response.ok) { // Si la réponse n'est pas OK (statut HTTP 200).
            throw new Error("Erreur de réponse du réseau."); // Lève une erreur avec un message approprié.
        }
        // Si la réponse est OK, retourne les données JSON de la réponse.
        return response.json();
        })

        .then(function (data) {
        // Traite les données JSON retournées.
        data.posts.forEach(function (post) { // Pour chaque élément dans le tableau data.posts
            // Insère du HTML à la fin de l'élément avec l'ID "ajax_return" contenant le titre du message
            document.querySelector("#ajax_return").insertAdjacentHTML("beforeend",'<div class="col-12 mb-5">' + post.post_title + "</div>"
            );
        });
        })

        .catch(function (error) {
        // Gère les erreurs survenues lors de la requête ou du traitement des données
        console.error(
            "Il y a eu un problème avec l'opération de récupération: ",
            error
        );
        });
    });
});
