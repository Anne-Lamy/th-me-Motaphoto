<?php
/**
 * Le modèle pour afficher la liste des publications. (10 derniers)
 *
 * @package Motaphoto
 */

get_header(); ?>

<article class="center-container">

    <div class="portfolio-container">

        <?php 
        /* Démarre la boucle */
        if (have_posts()) : while (have_posts()) : the_post();?>

        <article class="portfolio-item">
            
            <div class="post-content">
                <?php the_post_thumbnail(); ?>
                <div id="full-screen">
                    <img class="screen-link" src="<?= site_url() ?>/wp-content/themes/motaphoto/assets/images/screen.png">
                </div>
                <a href="<?php the_permalink(); ?>">
                <div id="info-single">
                    <h3><?php the_title(); ?></h3>
                        <h3><?php $categories = get_the_terms(get_the_ID(), 'categories');
                                if ($categories) {
                                    foreach ($categories as $category) {
                                        echo $category->name;
                                    }
                                }
                            ?>
                    </h3>
                </div>
                </a>
            </div>  
            
        </article>

        <?php 
        /* Termine la boucle */
        endwhile; endif;?>
    </div>

</article>

<?php get_footer(); ?>
