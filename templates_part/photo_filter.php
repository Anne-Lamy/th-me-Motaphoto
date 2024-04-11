<div class="page framed-layout">

    <div class="singles">
        <form action="<?php echo admin_url('admin-ajax.php'); ?>" method="post" id="ajax_call">   
            <div class="content-interaction ">
                <div class="single-left-bottom mini">
                    <div class="custom-select">
                    <select name="category" id="category" class="select-post">
                        <option class="hidden-option">CATEGORIES</option>
                        <option> </option>
                        <?php 
                        // Récupérer toutes les catégories du type de post "photos"
                        $categories = get_terms('categories');
                        if ($categories) {
                            foreach ($categories as $category) {
                                echo '<option value="' . $category->term_id . '">' . $category->name . '</option>';
                            }
                        }
                        ?>
                    </select>
                    </div>
                    <div class="custom-select">
                    <select name="format" id="format" class="select-post">
                        <option class="hidden-option">FORMATS</option>
                        <option> </option>
                        <?php 
                        // Récupérer tous les formats du type de post "photos"
                        $formats = get_terms('formats');
                        if ($formats) {
                            foreach ($formats as $format) {
                                echo '<option value="' . $format->term_id . '">' . $format->name . '</option>';
                            }
                        }
                        ?>
                    </select>
                    </div>
                </div>
                <div class="single-right-bottom">
                    <div class="custom-select">
                    <select type="date" name="date" id="date" class="select-post">
                        <option class="hidden-option">TRIER PAR</option>
                        <option> </option>
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
                                    echo '<option value="' . $post_date . '">' . $post_date . '</option>';
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

        <div class="photo-block">

            <?php
            // Définition de la variable $paged pour la pagination
            $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

            // Initialisation d'une nouvelle instance de la classe WP_Query pour récupérer les publications
            $get_photos = new WP_Query(array( 
                'post_type'     => 'photos',    // Type de publication à récupérer (dans ce cas, des photos)
                'status'        => 'published', // Filtre pour récupérer uniquement les publications publiées
                'posts_per_page'=> 8,           // Limite le nombre de publications à 8 par page
                'orderby'       => 'post_date', // Trie les publications par date de publication
                'order'         => 'DESC',      // Trie les publications en ordre décroissant (du plus récent au plus ancien)
                'paged'         => $paged       // Utilisation de la variable $paged pour la pagination
            ));

            if ($get_photos->have_posts()) {
                while ($get_photos->have_posts()) : $get_photos->the_post();

                    get_template_part('templates_part/photo_block');

                endwhile;
                wp_reset_postdata();?>

        </div>
                
        <div class="photo-block" id="photos-list">
            <!-- insertion des images en plus via Ajax -->
        </div>

            <?php // Vérifie si le nombre de photos est inférieur à 8 pour afficher un message approprié.
            if ($get_photos->post_count < 8) {
                echo '<div class="load-more"><a class="btn secondary-button">Plus de photos</a></div>';
            } else {
                echo '<div id="photos-loader" class="loading-banner"><button type="submit" class="btn">Charger plus !</button></div>';
            }
        } else {
            echo '<p class="no-results">Aucun résultat trouvé pour votre filtre. Veuillez réessayer.</p>';
        }
        ?>
    </div>
</div>