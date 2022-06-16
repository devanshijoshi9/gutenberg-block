<?php

/**
 * Plugin Name:       Gutenberg Block
 * Description:       Example
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Devanshi Joshi
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gutenberg-block
 * Domain Path:       block
 *
 * @package gutenberg-block
 */

function render_dev_dynamic_block($attributes, $content)
{
	// var_dump($attributes);
	$recent_posts = wp_get_recent_posts(
		array(
			'numberposts' => 1,
			'post_status' => 'publish',
		)
	);

	if ( count( $recent_posts ) === 0 ) {
		return __( 'No posts', 'learn-gutenberg' );
	}

	$post    = $recent_posts[0];
	$post_id = $post['ID'];

	$wrapper_attributes = get_block_wrapper_attributes();

	return sprintf(
		'<div %1$s><a href="%2$s">%3$s</a></div>',
		$wrapper_attributes,
		esc_url( get_permalink( $post_id ) ),
		esc_html( get_the_title( $post_id ) )
	);
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function gutenberg_block_gutenberg_block_block_init()
{
	register_block_type(
		__DIR__ . '/build',
		array(
			'render_callback' => 'render_dev_dynamic_block',
		)
	);
}
add_action('init', 'gutenberg_block_gutenberg_block_block_init');
