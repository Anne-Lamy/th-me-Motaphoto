<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Motaphoto</title>
</head>
<body>
    <main id="main" class="site-main" role="main">

        <div class="header">
            <div class="motaphoto-logo">
                <a href="<?= site_url() ?>">
                <img src="wp-content/themes/motaphoto/assets/images/Logo.png">
                </a>
            </div>
            <div class="nav-header">
                <h3>
                <?php wp_nav_menu([
                        'theme_location' => 'principal-menu',
                    ]);
                ?>
            </div>
        </div>