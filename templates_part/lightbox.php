<div id="lightbox" class="lightbox">
    <?php
    // Récupère la publication suivante.
    $next_post = get_next_post();
    // Récupère la publication précédente.
    $prev_post = get_previous_post();

    // Obtient l'URL de l'image pour la publication suivante.
    $next_image_url = $next_post ? get_the_post_thumbnail_url($next_post->ID, 'large') : '';
    // Obtient l'URL de l'image pour la publication précédente.
    $prev_image_url = $prev_post ? get_the_post_thumbnail_url($prev_post->ID, 'large') : '';
    ?>

    <button class="lightbox_close" alt="Fermer"> </button>

    <?php if ($prev_image_url) : ?>
    <button class="lightbox_next" alt="Suivante" data-image="<?php echo esc_attr($prev_image_url); ?>"> </button>
    <?php endif; ?>

    <?php if ($next_image_url) : ?>
    <button class="lightbox_prev" alt="Précédente" data-image="<?php echo esc_attr($next_image_url); ?>"> </button>
    <?php endif; ?> 
    
    <div class="lightbox_container full-image">

    <!-- insertion de l'image plein écran via Ajax -->
    
    </div>

</div>