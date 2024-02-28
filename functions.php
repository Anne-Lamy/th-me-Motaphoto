<?php

function enqueue_custom_scripts_styles()
{
    // Style du thème parent en file d'attente
    wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');

}

add_action('wp_enqueue_scripts', 'enqueue_custom_scripts_styles');