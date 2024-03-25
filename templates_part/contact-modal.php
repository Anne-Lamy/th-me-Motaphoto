<div id="contact-modal" class="modal">
    <!-- Contenu de la modale -->
    <div class="modal-content">
        <div class="modal-header">
        </div>
        <div class="modal-body">

            <form id="contact-motaphoto" class="contact-motaphoto" action="<?= admin_url('admin-post.php') ?>" method="post">
                <input type="hidden" name="action" value="traitement_formulaire">
                <label for="your-name">NOM</label>
                <input type="text" id="your-name" name="your-name" autocomplete="name" required>

                <label for="your-email">E-MAIL</label>
                <input type="email" id="your-email" name="your-email" autocomplete="email" required>

                <label for="your-subject">REF. PHOTO</label>
                <input type="text" id="your-subject" name="your-subject" value="<?php echo get_post_meta(get_the_ID(), 'ref', true); ?>">

                <label for="your-message">MESSAGE</label>
                <textarea id="your-message" name="your-message" rows="10"></textarea>

                <input type="submit" value="Envoyer">
            </form>

            <?php 
            // Ou on insère le formulaire de demandes de renseignements.
            // echo do_shortcode('[contact-form-7 id="f37bb8b" title="Formulaire de contact"]');
            ?>
        </div>
        <div id="message-container"></div>
        <script>
            document.addEventListener('DOMContentLoaded', function () {
                var form = document.getElementById('contact-motaphoto');
                form.addEventListener('submit', function (event) {
                    var messageContainer = document.getElementById('message-container');
                    messageContainer.innerHTML = ''; // Nettoyer le contenu précédent
                    
                    // Afficher le message
                    messageContainer.innerText = 'Votre message a bien été envoyé.';

                    // Ajouter une classe CSS pour styliser le message
                    messageContainer.classList.add('success-message');

                    // Masquer le message après un certain temps (par exemple, 5 secondes)
                    setTimeout(function () {
                        messageContainer.innerHTML = ''; // Supprimer le message après 5 secondes
                        messageContainer.classList.remove('success-message'); // Retirer la classe CSS
                    }, 5000); // 5000 millisecondes = 5 secondes
                });
            });
        </script>
        <div class="modal-footer">
            <span class="close">&times;</span>
        </div>
    </div>
</div>
