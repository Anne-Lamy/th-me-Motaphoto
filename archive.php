<?php
/**
 * Le modèle pour afficher la liste des publications. (10 derniers)
 *
 * @package Motaphoto
 */

get_header(); ?>

<?php 
/* Démarre la boucle */
if (have_posts()) : while (have_posts()) : the_post();?>

<article class="portfolio">
    <div class="post">
        <div class="post-content">
            <a href="<?php the_permalink(); ?>" class=""><?php the_post_thumbnail(); ?></a>            
        </div>  
    </div>
</article>

<?php 
/* Termine la boucle */
endwhile; endif;?>

<?php get_footer(); ?>