<?php
/**
 * Le modèle pour afficher une publication unique.
 *
 * @package Motaphoto
 */

get_header();

/* Démarre la boucle. */
if (have_posts()) : while (have_posts()) : the_post();?>

<div class="page framed-layout">

    <article class="single">

        <div class="content-single">
            <div id="" class="single-left"> 
                <!-- Affichage du titre -->
                <h2><?php the_title(); ?></h2>
                <!-- Affichage de la référence -->
                <h3>Référence : <?php echo get_post_meta(get_the_ID(), 'ref', true); ?></h3>
                <!-- Affichage des catégories -->
                <h3>Catégories : 
                <?php
                    $categories = get_the_terms(get_the_ID(), 'categories');
                    if ($categories) {
                        foreach ($categories as $category) {
                            echo $category->name . ', ';
                        }
                    }
                ?>
                </h3>
                <!-- Affichage des formats -->
                <h3>Formats : 
                <?php
                    $formats = get_the_terms(get_the_ID(), 'formats');
                    if ($formats) {
                        foreach ($formats as $format) {
                            echo $format->name . ', ';
                        }
                    }
                ?>
                </h3>
                <!-- Affichage du type -->
                <h3>Type : <?php echo get_post_meta(get_the_ID(), 'type', true); ?></h3>
                <!-- Affichage de l'année -->
                <h3>Année : <?php echo get_the_date('Y'); ?></h3>
            </div>
            <div class="single-right">
                <!-- Affichage de la photo -->            
                <?php the_post_thumbnail('large', array('class' => 'single-thumbnail')); ?>
            </div>
        </div>
    
        <div class="content-interaction">
            <div class="single-left-bottom">
                <p>Cette photo vous intéresse ?</p>
            </div>
            <div class="single-right-bottom">     
                <p>image</p>
            </div>
        </div>

        <div class="content-presentation">
                <h3>VOUS AIMEREZ AUSSI</h3>
        </div>
    </article>

</div>    

<?php 
/* Termine la boucle */
endwhile; endif;

get_footer();

