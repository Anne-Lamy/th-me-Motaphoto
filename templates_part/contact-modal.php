<div id="contact-modal" class="modal">
    <!-- Contenu de la modale -->
    <div class="modal-content">
        <div class="modal-header">
        </div>
        <div class="modal-body">

            <!-- Intégration du formulaire Contact Form 7 -->
            <div id="contact-motaphoto" class="contact-motaphoto" action="<?= admin_url('admin-post.php') ?>">
                <?php echo do_shortcode('[contact-form-7 id="1c2005a" title="Contact Motaphoto" your-subject="' . get_post_meta(get_the_ID(), 'ref', true) . '"]'); ?>
            </div>

            <!-- Ou bien avec un formulaire classique :
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
            </form>-->

        </div>
        <div id="message-container"></div>

        <div class="modal-footer">
            <span class="close">&times;</span>
        </div>
    </div>
</div>
