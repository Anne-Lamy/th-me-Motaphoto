<div class="page framed-layout">

    <div class="singles">
        <form action="<?php echo admin_url('admin-ajax.php'); ?>" method="post" id="ajax_call">   
            <div class="content-interaction">
                <div class="single-left-bottom mini">
                    <select name="category" id="category" class="select-post">
                        <option value="" class="hidden-option">CATEGORIES</option>
                        <option value=""> </option>
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
                    <select name="format" id="format" class="select-post">
                        <option value="" class="hidden-option">FORMATS</option>
                        <option value=""> </option>
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
                <div class="single-right-bottom">     
                    <select type="date" name="date" id="date" class="select-post">
                        <option value="" class="hidden-option">TRIER PAR</option>
                        <option value=""> </option>
                        <?php
                        // Récupére toutes les dates de publication des posts.
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
        </form>
        <div class="center-container">
            <div class="portfolio-container">
                <article class="portfolio-item" id="ajax_return">
            
                </article>
            </div>
        </div>
    </div>
</div>