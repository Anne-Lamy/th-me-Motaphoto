<div class="page framed-layout">

    <div class="singles">
        <form action="<?php echo admin_url('admin-ajax.php'); ?>" method="post" id="ajax_call">   
            <div class="content-interaction ">
                <div class="single-left-bottom mini">
                    <div class="custom-select">
                    <select name="category" id="category" class="select-post chosen-select">
                        <option value=""  data-slug="" class="hidden-option">CATEGORIES</option>
                        
                        <?php 
                        // Récupére toutes les catégories du type de post "photos"
                        $categories = get_terms( array( 'taxonomy' => 'categories'));
                        if ($categories) {
                            foreach ($categories as $category) {
                                echo '<option class="select-selected" value="' . $category->term_id . '" data-slug="' . $category->slug . '">' . $category->name . '</option>';
                            }
                        }
                        ?>
                    </select>
                    </div>
                    <div class="custom-select">
                    <select name="format" id="format" class="select-post chosen-select">
                        <option value=""  data-slug="" class="hidden-option">FORMATS</option>
                        
                        <?php 
                        // Récupére tous les formats du type de post "photos"
                        $formats = get_terms( array( 'taxonomy' => 'formats'));
                        if ($formats) {
                            foreach ($formats as $format) {
                                echo '<option class="select-selected" value="' . $format->term_id . '" data-slug="' . $format->slug . '">' . $format->name . '</option>';
                            }
                        }
                        ?>
                    </select>
                    </div>
                </div>
                <div class="single-right-bottom">
                    <div class="custom-select">
                    <select type="date" name="date" id="date" class="select-post chosen-select">
                        <option value=""  data-slug="" class="hidden-option">TRIER PAR</option>
                        
                        <?php
                        // Récupére toutes les dates de publication des posts sans doublons.
                        $args = array(
                            'post_type' => 'photos',
                            'posts_per_page' => -1,
                            'fields' => 'ids',
                        );
                        $query = new WP_Query($args); // Effectue une requette auprés de la base de données.
                        if ($query->have_posts()) { // Si on récupère des résultats ...
                            $dates = array(); // Tableau pour stocker les dates.
                            while ($query->have_posts()) { // Parcourt chaque post.
                                $query->the_post(); // On envois les résultats au script (sous forme de données JSON) ...
                                $post_date = get_the_date('Y'); // Récupérer l'année de publication.
                                if (!in_array($post_date, $dates)) { // Vérifier si l'année n'est pas déjà présente dans le tableau.
                                    $dates[] = $post_date; // Ajouter l'année au tableau si elle n'est pas déjà présente.
                                    echo '<option class="select-selected" value="' . $post_date . '" data-slug="' . $post_date . '">' . $post_date . '</option>';
                                }
                            }
                            wp_reset_postdata(); // Réinitialiser les données de publication
                        }
                        ?>
                    </select>

                    </div>

                </div>
            </div>
        </form>     
        
        <div class="photo-block" id="photos-list">

            <?php
            // Récupère le numéro de page ou attribue 1 par défaut
            $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

            // Récupération des publications
            $get_photos = new WP_Query(array( 
                'post_type'     => 'photos',    // Type de publication à récupérer (photos)
                'status'        => 'published', // Filtre pour récupérer uniquement les publications publiées
                'posts_per_page'=> 8,           // Limite le nombre de publications à 8 par page
                'orderby'       => 'post_date', // Trie les publications par date de publication
                'order'         => 'DESC',      // Trie les publications du plus récent au plus ancien
                'paged'         => $paged       // Pagination selon le numéro de page
            ));

            if ($get_photos->have_posts()) {
                while ($get_photos->have_posts()) : $get_photos->the_post();

                    get_template_part('templates_part/photo_block');

                endwhile;
                wp_reset_postdata();?>

        </div>

            <?php // Vérifie si le nombre de photos est inférieur à 8 pour afficher un message approprié.
            if ($get_photos->post_count < 8) {
                echo '<div class="load-more"><a class="btn secondary-button">Plus de photos</a></div>';
            } else {
                echo '<div id="photos-loader" class="loading-banner"><button type="submit" class="btn">Charger plus !</button></div>';
            }};
        ?>
    </div>
</div>