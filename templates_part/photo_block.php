<article class="center-container">
    <div class="portfolio-container">

        <div class="portfolio-item">

            <div class="post-content post-category">

                <?php echo the_post_thumbnail('large', array('class' => 'single-thumbnail')); ?>
                
                <div id="full-screen">
                    <img class="screen-link" src="<?= site_url() ?>/wp-content/themes/motaphoto/assets/images/screen.png">
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
        </div>

    </div>
</article>