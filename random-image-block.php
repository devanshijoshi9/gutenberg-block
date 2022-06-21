<?php
/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function random_image_block_init()
{
	register_block_type(
		MY_PLUGIN_DIR_PATH . 'blocks/random-image'
	);
}
add_action('init', 'random_image_block_init');

?>