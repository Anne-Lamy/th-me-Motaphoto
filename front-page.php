<?php
/**
* Le fichier modèle principal de la page d'accueil du site.
 *
 * @package Motaphoto
 */

get_header();
?>

<main id="main" class="site-main" role="main">

    <?php if (have_posts()) : while (have_posts()) : the_post();?>

        <div class="first-img load-more-images">
            <!-- insertion de l'image de fond via Ajax -->
        </div>

    <?php endwhile; endif;?>

        <div class="content-title">
            <h1>PHOTOGRAPHE EVENT</h1>
        </div>

        <?php get_template_part('templates_part/photo_filter'); ?>        

</main>

<?php get_footer() ?>

