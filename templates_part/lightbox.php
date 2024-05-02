<?php

// Effectue la requête WP_Query avec les arguments définis
$get_lightbox = new WP_Query(array(
    'post_type' => 'photos',
    'posts_per_page' => -1, // Récupérer toutes les images
    ));

// Vérifie si la requête a des résultats
if ($get_lightbox->have_posts()) {
    while ($get_lightbox->have_posts()) : $get_lightbox->the_post(); ?>
    
        <div id="lightbox" class="lightbox">

            <button class="lightbox_close" alt="Fermer"> </button>
            <button class="lightbox_prev" alt="Précédente"> </button>
            <button class="lightbox_next" alt="Suivante"> </button>

            <div class="lightbox_container">
                <!-- insertion de l'image -->
                <?php the_post_thumbnail('large', array('class' => 'single-thumbnail')); ?>
            </div>
            
            <div id="info-lightbox">
                <!-- Affichage de la référence -->
                <h3><?php echo get_post_meta(get_the_ID(), 'ref', true); ?></h3>
                <!-- Affichage des catégories -->
                <h3> 
                <?php
                    $categories = get_the_terms(get_the_ID(), 'categories');
                    if ($categories) {
                        foreach ($categories as $category) {
                            echo $category->name . ', ';
                        }
                    }
                ?>
                </h3>
            </div>

        
        </div>

<?php 
    endwhile;
    wp_reset_postdata();
}
?>
