<?php
/**
 * Le modèle pour afficher tous les messages uniques.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_One
 * @since Twenty Twenty-One 1.0
 */

get_header();

/* Début de la boucle */
while ( have_posts() ) :
	the_post();

	get_template_part( 'template-parts/content-single' );

	if ( is_attachment() ) {
		// Navigation des publications parentes.
		the_post_navigation(
			array(
				/* traducteurs : %s : lien vers la publication parente. */
				'prev_text' => sprintf( __( '<span class="meta-nav">Publié dans</span><span class="post-title">%s</span>', 'motaphoto' ), '%title' ),
			)
		);
	}

	// Si les commentaires sont ouverts ou s'il y a au moins un commentaire, chargez le modèle de commentaire.
	if ( comments_open() || get_comments_number() ) {
		comments_template();
	}

	// Navigation dans les articles précédent/suivant.
	$motaphoto_next = is_rtl() ? motaphoto_get_icon_svg( 'ui', 'arrow_left' ) : motaphoto_get_icon_svg( 'ui', 'arrow_right' );
	$motaphoto_prev = is_rtl() ? motaphoto_get_icon_svg( 'ui', 'arrow_right' ) : motaphoto_get_icon_svg( 'ui', 'arrow_left' );

	$motaphoto_next_label     = esc_html__( 'Next post', 'motaphoto' );
	$motaphoto_previous_label = esc_html__( 'Previous post', 'motaphoto' );

	the_post_navigation(
		array(
			'next_text' => '<p class="meta-nav">' . $motaphoto_next_label . $motaphoto_next . '</p><p class="post-title">%title</p>',
			'prev_text' => '<p class="meta-nav">' . $motaphoto_prev . $motaphoto_previous_label . '</p><p class="post-title">%title</p>',
		)
	);
endwhile; // Fin de la boucle.

get_footer();
