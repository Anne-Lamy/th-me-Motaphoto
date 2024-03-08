<?php
/**
 * Le modèle pour afficher la page d'accueil des publications.
 *
 * @package Motaphoto
 */

if (have_posts()) : while (have_posts()) : the_post();?>

<article class="portfolio">
    <div class="post">
        <div class="post-content">
        <!-- Affichage du contenu -->
        <?php get_template_part( 'archive' ); ?>
        </div>  
    </div>
</article>

<?php 
/* Termine la boucle */
endwhile; endif;

get_footer();