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

    <div class="first-img">
        <h1>PHOTOGRAPHE EVENT</h1>
    </div>

    <div>
        
    </div>

</main>

<?php
/* Termine la boucle */
endwhile; endif;

get_footer() ?>

