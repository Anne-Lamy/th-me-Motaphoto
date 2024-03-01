
        <div class="footer">
            <?php 
            // Ajout de la POPUP de contact.
            get_template_part('templates_part/contact_modal'); ?>

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

