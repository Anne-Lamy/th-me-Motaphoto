<!-- Déclencher/Ouvrir le modale -->
<button id="myBtn">Open Modal</button>

<!-- La Modale -->
<div id="myModal" class="modal">

    <!-- Contenu de la modale -->
    <div class="modal-content">
        <div class="modal-header">
            <span class="close">X</span>
            <h2>Header</h2>
        </div>
        <div class="modal-body">
            <?php
            // On insère le formulaire de demandes de renseignements
            echo do_shortcode('[contact-form-7 id="f37bb8b" title="Formulaire de contact"]');
            ?>
        </div>
        <div class="modal-footer">
            <h3>Footer</h3>
        </div>
    </div>

</div>
