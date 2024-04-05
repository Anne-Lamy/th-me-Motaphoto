
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
        <div class="content-interaction interest">
            <div class="single-left-bottom">
                <div class="half-content">
                    <p>Cette photo vous intéresse ?</p>
                </div>
                <div class="half-content">
                    <button id="btnContact">Contact</button>
                </div>
            </div>
            <div class="single-right-bottom none">
                <div class="mini-slide">
                    <?php
                    // Récupère la publication suivante.
                    $next_post = get_next_post();
                    // Récupère la publication précédente.
                    $prev_post = get_previous_post();

                    // Vérifie si la publication suivante existe et affiche sa vignette avec un lien vers le post.
                    if ($next_post) {
                        $next_post_thumbnail = get_the_post_thumbnail($next_post->ID, array(80, 70));
                        $next_post_link = get_permalink($next_post->ID);
                        echo '<a href="' . $next_post_link . '"><div>' . $next_post_thumbnail . '</div></a>';
                    }
                    // Sinon, vérifie si la publication précédente existe et affiche sa vignette avec un lien vers le post.
                    elseif ($prev_post) {
                        $prev_post_thumbnail = get_the_post_thumbnail($prev_post->ID, array(80, 70));
                        $prev_post_link = get_permalink($prev_post->ID);
                        echo '<a href="' . $prev_post_link . '"><div>' . $prev_post_thumbnail . '</div></a>';
                    }
                    ?>
                    <div class="arrow">
                        <?php if ($prev_post) : ?>
                            <a href="<?= get_permalink($prev_post->ID) ?>"><img id="left-arrow" src="<?= site_url() ?>/wp-content/themes/motaphoto/assets/images/left-arrow.png"></a>
                        <?php endif; ?>
                        <?php if ($next_post) : ?>
                            <a href="<?= get_permalink($next_post->ID) ?>"><img id="right-arrow" src="<?= site_url() ?>/wp-content/themes/motaphoto/assets/images/right-arrow.png"></a>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
        <div class="content-presentation">
            <h3>VOUS AIMEREZ AUSSI</h3>
        </div>
        
            
            <?php
                get_template_part('templates_part/photo_block');
            ?>


        </article>
    
</div>    

<?php endwhile; endif;

get_footer();