<?php
/*
Template Name: Motaphoto
Template Post Type: post, page, product
*/


get_header();


if (have_posts()) : while (have_posts()) : the_post();?>

<div class="page framed-layout">
    <div class="content-page">
        <!-- Affichage du contenu -->
        <?php the_content(); ?>
    </div>
</div>

<?php
/* Termine la boucle */
endwhile; endif;

get_footer() ?>