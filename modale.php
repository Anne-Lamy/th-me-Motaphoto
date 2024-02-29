<!-- Ajout d'une popup pour le formulaire de contact -->
<div class="popup-overlay">
    <div class="popup-contact">
        <div class="popup-header">
            <span class="popup-close">&times;</span>
        </div>
        <div class="popup-informations">
            <?php
            // On insère le formulaire de demandes de renseignements
            echo do_shortcode('[contact-form-7 id="f37bb8b" title="Formulaire de contact"]');
            ?>
        </div>
    </div>
</div>


<!-- NE PAS OUBLIER DE RAJOUTER LE CODE JS POUR FERMER LA POPUP ! -->
