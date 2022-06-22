<?php

function image_gallery_block_init()
{
	register_block_type(
		MY_PLUGIN_DIR_PATH . 'blocks/image-gallery'
	);
}
add_action('init', 'image_gallery_block_init');

?>