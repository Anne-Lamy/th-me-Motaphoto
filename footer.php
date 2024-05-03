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
            
    <div class="content">

        <div class="footer-content">
            <!-- Ajout de la POPUP de contact. -->
            <?php get_template_part('templates_part/contact-modal'); ?>

            <!-- Ajout de la POPUP de la lightbox. -->            
            <?php get_template_part('templates_part/lightbox'); ?>            

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

