<article class="portfolio-item">

    <div class="post-content">

        <?php /* insertion de l'image de fond via Ajax */ ?>

        <div id="full-screen">
            <img class="screen-link" data-image="<?php // echo esc_url($image_url); ?>" src="<?= site_url() ?>/wp-content/themes/motaphoto/assets/images/screen.png">
        </div>
        
        <a href="<?php echo get_the_permalink(); ?>">
            <div id="info-single">
                <h3><?php echo get_the_title(); ?></h3>
                <h3><?php 
                    $categories = get_the_terms(get_the_ID(), 'categories');
                    if ($categories) {
                        foreach ($categories as $category) {
                            echo $category->name;
                        }
                    }
                ?></h3>
            </div>
        </a>
    </div>
</article>