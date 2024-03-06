<?php
/**
  * Le footer de mon thème
  *
  * Il s'agit du modèle qui affiche toute la section <footer>.
 * *
 * @package Motaphoto
 */

?>

<footer class="motaphoto-footer">
            
    <div class="footer">
        <div class="footer-contact">
        <?php 
        // Ajout de la POPUP de contact.
        get_template_part('templates_part/contact_modal'); ?>
        </div>
        <div class="nav-footer motaphoto-menu">
            <h3>
            <?php wp_nav_menu([
                    'theme_location' => 'footer-menu',
                ]);
            ?>
            </h3>
        </div>
    </div>
        
</footer>

<?php wp_footer(); ?>

</body>
</html>

