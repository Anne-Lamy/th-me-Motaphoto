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
            <img src="<?= site_url() ?>/wp-content/themes/motaphoto/assets/images/Logo.png">
            </a>
        </div>
        <div class="motaphoto-menu">
            <div class="menu-desktop">
                <h3>
                <?php wp_nav_menu([
                        'theme_location' => 'principal-menu',
                    ]);
                ?>
                </h3>
            </div>
            <div class="menu-burger">
                <a href="#menu-xl" id="burger-link">
                <img id="burger" src="<?= site_url() ?>/wp-content/themes/motaphoto/assets/images/burger.png">
                <img id="cross" src="<?= site_url() ?>/wp-content/themes/motaphoto/assets/images/cross.png">
                </a>
            </div>
        </div>
        <div id="menu-xl" class="menu-xl">
            <h1>
                <?php wp_nav_menu([
                        'theme_location' => 'principal-menu',
                    ]);
                ?>
            </h1>
        </div>
    </div>

</header>