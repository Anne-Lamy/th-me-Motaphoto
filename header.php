<?php
/**
  * L'en-tête de mon thème
  *
  * Il s'agit du modèle qui affiche toute la section <head> et <header>
 * *
 * @package Motaphoto
 */

?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Motaphoto</title>
    <?php wp_head(); ?>
</head>

<body class="uppercase-text" <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="motaphoto-header">

    <div class="content">
        <div class="motaphoto-logo">
            <a href="<?= site_url() ?>">
            <img class="nathalie-mota" id="ajax_call" src="<?= site_url() ?>/wp-content/themes/motaphoto/assets/images/Logo.png">
            </a>
        </div>
        <div class="nav-header motaphoto-menu">
            <h3>
            <?php wp_nav_menu([
                    'theme_location' => 'principal-menu',
                ]);
            ?>
            </h3>
        </div>
    </div>

</header>