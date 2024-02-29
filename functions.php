<?php

function enqueue_custom_scripts_styles()
{
    // Style du thème parent en file d'attente
    wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');

    // Tous les styles du thème parent en file d'attente
    wp_enqueue_style('parent-style', get_template_directory_uri() . '/styles/style.css');

    // Script de la modale en file d'attente
    wp_enqueue_script('child-script', get_template_directory_uri() . '/js/modale.js', array(), true );
}




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






add_action('wp_enqueue_scripts', 'enqueue_custom_scripts_styles');

// Appelle le lien Motaphoto dans le menu de Wordpress.
add_action('admin_menu', 'motaphoto_add_admin_pages', 10);