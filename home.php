<?php
/**
 * Le modèle pour afficher la page d'accueil des publications.
 *
 * @package Motaphoto
 */

get_header(); ?>

<div class="post">
    <div class="portfolio-container">

        <?php 
        /* Démarre la boucle */
        if (have_posts()) : while (have_posts()) : the_post();?>

        <article class="portfolio-item">
            <div class="post-content">
                <?php get_template_part( 'archive' ); ?>         
            </div>  
        </article>

        <?php 
        /* Termine la boucle */
        endwhile; endif;?>

    </div>
</div>

<?php get_footer(); ?>