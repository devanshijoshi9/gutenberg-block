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
 * @package           gutenberg-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function gutenberg_block_gutenberg_block_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'gutenberg_block_gutenberg_block_block_init' );
