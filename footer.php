
        <div class="footer">
            <?php 
            // Ajout de la POPUP de contact.
            get_template_part('modale'); ?>

            <div class="nav-footer">
                <h3>
                <?php wp_nav_menu([
                        'theme_location' => 'footer-menu',
                    ]);
                ?>
                </h3>
            </div>
        </div>
        
    </main>
</body>
</html>

