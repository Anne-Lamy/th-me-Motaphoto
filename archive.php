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
            <a href="<?php the_permalink(); ?>">
                <div class="post-content">
                    <?php the_post_thumbnail(); ?>
                    <div id="info-single">
                        <h3><?php echo get_post_meta(get_the_ID(), 'ref', true); ?></h3>
                            <h3><?php $categories = get_the_terms(get_the_ID(), 'categories');
                                    if ($categories) {
                                        foreach ($categories as $category) {
                                            echo $category->name;
                                        }
                                    }
                                ?>
                        </h3>
                    </div>
                </div>  
            </a>
        </article>

        <?php 
        /* Termine la boucle */
        endwhile; endif;?>
    </div>

</div>

<?php get_footer(); ?>
