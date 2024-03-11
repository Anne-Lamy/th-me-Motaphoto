<?php
/**
 * Le modèle pour afficher la liste des publications. (10 derniers)
 *
 * @package Motaphoto
 */

get_header(); ?>

<div class="center-container">

    <div class="portfolio-container">

        <?php 
        /* Démarre la boucle */
        if (have_posts()) : while (have_posts()) : the_post();?>

        <article class="portfolio-item">
            <div class="post-content">
                <a href="<?php the_permalink(); ?>"><?php the_post_thumbnail(); ?></a>            
            </div>  
        </article>

        <?php 
        /* Termine la boucle */
        endwhile; endif;?>
    </div>

</div>

<?php get_footer(); ?>
