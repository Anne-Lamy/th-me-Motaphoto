<?php

function enqueue_custom_scripts_styles() {
    // Style principal du thème
    wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');
    // Style Sass du thème
    wp_enqueue_style('sass-style', get_template_directory_uri() . '/sass/style.css', array('parent-style'));
    // Script du menu responsive
    wp_enqueue_script('menu-script', get_template_directory_uri() . '/js/menu-responsive.js', array(), true);
    // Script de la modale
    wp_enqueue_script('modal-script', get_template_directory_uri() . '/js/contact-modal.js', array(), true);
    // Script de la lightbox
    wp_enqueue_script('lightbox-script', get_template_directory_uri() . '/js/lightbox.js', array(), true);
    // Script du contenu du single photo.
    wp_enqueue_script('photo-filter', get_template_directory_uri() . '/js/photo-filter.js', array('jquery'), true);

    // Création et ajout du nonce pour le script 'photo-filter'
    $nonce = wp_create_nonce('photo_filter_nonce');

    wp_localize_script('photo-filter', 'photo_filter_js', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => $nonce, // Ajout du nonce à l'objet JavaScript.
    ));
}
add_action('wp_enqueue_scripts', 'enqueue_custom_scripts_styles');



// _______________________________________________________________
// MENUS :


function register_my_menus() {
    register_nav_menus(
        array(
            'principal-menu' => __( 'Menu Principal' ),
            'footer-menu' => __( 'Menu Footer' ),
        )
    );
}
add_action( 'init', 'register_my_menus' );

// Ajouter un filtre pour ajouter un lien de contact au menu principal uniquement.
function add_custom_nav_menu_items($items, $args) {
    if ($args->theme_location == 'principal-menu') {
        // enregistrer un identifiant personnalisé pour le lien de contact.
        $items .= '<li><a href="#" id="contact-link" class="motaphoto-menu">Contact</a></li>';
    }
    return $items;
}
add_filter('wp_nav_menu_items', 'add_custom_nav_menu_items', 10, 2);


// _______________________________________________________________
// THEME "Motaphoto" :


// On créer notre lien Motaphto dans le menu de Wordpress.
function motaphoto_add_admin_pages()
{
    // Ajout de la page d'administration de Motaphoto.
    add_menu_page('Paramètre du thème Motaphoto', 'Motaphoto', 'manage_options', 'motaphoto_settings', 'motaphoto_theme_settings', 'dashicons-admin-settings', 60);
}
// On créer le contenu de notre page Metaphoto.
function motaphoto_theme_settings()
{
    echo '<h1>' . esc_html(get_admin_page_title()) . '</h1>';
    echo '<form action="options.php" method="post" name="motaphoto_settings">';
    echo '<div>';

    settings_fields('motaphoto_settings_fields');
    do_settings_sections('motaphoto_settings_section');
    submit_button();

    echo '</div>';
    echo '</form>';
}


// On créer notre function de lots de réglages.
function motaphoto_settings_register()
{
    // Déclare à WordPress l’existence d’un lot de réglages.
    register_setting('motaphoto_settings_fields', 'motaphoto_settings_fields', 'motaphoto_settings_fields_validate');

    //On créer une section Paramètres où le premier paramètre sera rangé.
    add_settings_section('motaphoto_settings_section', __('Paramètres', 'motaphoto'), 'motaphoto_settings_section_description', 'motaphoto_settings_section');

    // On créer nos paramètres de champs.
                        // 1- Clef unique du champ 2- Nom dans l'interface 3- fonction a appeller pour générer le champ 4- la page ou on veut afficher ce champ 5- la section souhaité.
    add_settings_field('motaphoto_settings_field_description', __('Description', 'motaphoto'), 'motaphoto_settings_field_description_output', 'motaphoto_settings_section', 'motaphoto_settings_section');
    add_settings_field('motaphoto_settings_field_phone_number', __('Numéro de téléphone', 'motaphoto'), 'motaphoto_settings_field_phone_number_output', 'motaphoto_settings_section', 'motaphoto_settings_section');
    add_settings_field('motaphoto_settings_field_email', __('Email', 'motaphoto'), 'motaphoto_settings_field_email_output', 'motaphoto_settings_section', 'motaphoto_settings_section');
}

function motaphoto_settings_section_description()
{
    echo __('Paramètrez les différentes options du thème Motaphoto.', 'motaphoto');
}


// On créer une function pour nettoyer et adapter les valeurs de nos réglages.
function motaphoto_settings_fields_validate($inputs)
{
    // On enregistre le champ quand il est modifié.
    if (isset($_POST) && !empty($_POST)) {
        //Si le champ est défini et non vide dans les données POST.
        if (isset($_POST['motaphoto_settings_field_description']) && !empty($_POST['motaphoto_settings_field_description'])) {
            // On met à jour cette option avec la valeur correspondante.
            update_option('motaphoto_settings_field_description', $_POST['motaphoto_settings_field_description']);
        }
        if (isset($_POST['motaphoto_settings_field_phone_number']) && !empty($_POST['motaphoto_settings_field_phone_number'])) {
            update_option('motaphoto_settings_field_phone_number', $_POST['motaphoto_settings_field_phone_number']);
        }
        if (isset($_POST['motaphoto_settings_field_email']) && !empty($_POST['motaphoto_settings_field_email'])) {
            update_option('motaphoto_settings_field_email', $_POST['motaphoto_settings_field_email']);
        }
    }
    return $inputs;
}


// On paramètres les champs après récupération.
function motaphoto_settings_field_description_output()
{
    // On récupère la valeur de l'option et la clef du champ description.
    $value = get_option('motaphoto_settings_field_description');
    // On affiche le champ.
    echo '<input name="motaphoto_settings_field_description" type="text" value="' . $value . '" />';
}

function motaphoto_settings_field_phone_number_output()
{
    $value = get_option('motaphoto_settings_field_phone_number');
    echo '<input name="motaphoto_settings_field_phone_number" type="text" value="' . $value . '" />';
}

function motaphoto_settings_field_email_output()
{
    $value = get_option('motaphoto_settings_field_email');
    echo '<input name="motaphoto_settings_field_email" type="text" value="' . $value . '" />';
}



// Appelle le lien Motaphoto dans le menu de Wordpress.
add_action('admin_menu', 'motaphoto_add_admin_pages', 10);
// Appelle la fonction d’un lot de réglages.
add_action('admin_init', 'motaphoto_settings_register');


// _______________________________________________________________
// PUPLICATION "Mes Photos" :


// Récupération des posts PHOTOS depuis le formulaire de selection.
function motaphoto_request_photos() {

    var_dump("La requête a bien été traitée par WordPress.");

    // Vérifie si les variables existent et ne sont pas nulle,
    // Nettoie et sécurise la valeur de la variable pour des raisons de sécurité,
    // Si la variable n'existe pas ou est nulle, alors elle est définie comme une chaîne vide ''.
    $category = isset($_POST['category']) ? sanitize_text_field($_POST['category']) : '';
    $format = isset($_POST['format']) ? sanitize_text_field($_POST['format']) : '';
    $date = isset($_POST['date']) ? sanitize_text_field($_POST['date']) : '';

    // Configuration des arguments pour la requête WP_Query.
    $args = array(
        'post_type' => 'photos',
        'posts_per_page' => 8,
        'tax_query' => array(
            'relation' => 'AND',
            array(
                'taxonomy' => 'categories',
                'field' => 'id',
                'terms' => $category,
            ),
            array(
                'taxonomy' => 'formats',
                'field' => 'id',
                'terms' => $format,
            ),
        ),
        'date_query' => array(
            array(
                'year' => $date,
            ),
        ),
    );


    $query = new WP_Query($args);  // Effectue une requette auprés de la base de données.

    // On vérifie si on obtient des résultats.
    if ($query->have_posts()) {    // Si on récupère des résultats ...
        while ($query->have_posts()) {
            $query->the_post();    // On envois les résultats au script (sous forme de données JSON) ...?>

            <article class="portfolio-item">                    
                    <div class="post-content">
                        <?php echo get_the_post_thumbnail(); ?>
                        <div id="full-screen">
                            <img class="screen-link" src="<?= site_url() ?>/wp-content/themes/motaphoto/assets/images/screen.png">
                        </div>
                        <a href="<?php echo get_the_permalink(); ?>">
                        <div id="info-single">
                            <h3><?php echo get_the_title(); ?></h3>
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
        }
        wp_reset_postdata(); // Réinitialiser les données de publication.
    } else {
        echo 'Aucune photo trouvée !';
    }

    wp_die(); // Termine la requête Ajax.
}

// Appelle la function de la requette et indique à WP qu'elle est à utiliser via un appel Ajax.
add_action('wp_ajax_request_photos', 'motaphoto_request_photos');
// Rend également la function accessible pour les utilisateurs non connectés.
add_action('wp_ajax_nopriv_request_photos', 'motaphoto_request_photos');


