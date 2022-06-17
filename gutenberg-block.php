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
	if ( $attributes['postStatus'] ) {
		$status = [ 'publish', 'draft', 'future' ];
	}

	$args = array(
		'orderby'     => 'date',
		'order'       => $attributes['postOrder'],
		'post_status' => $status ? $status : 'publish',
		'numberposts' => 10
	);

	$latest_posts = get_posts( $args );

	ob_start();

	if ( $attributes['singlePost'] == false ) {
		foreach ( $latest_posts as $post ) {
			post_template( $post );
		}
	} else {
		single_post_template( $attributes );
	}

	return ob_get_clean();
	
}

function single_post_template( $post ) {
	?>
	<div>
		<p>
			<h3>
				<b>
					<a href="<?php echo esc_url(get_permalink($post['ID'])); ?>"> <?php echo esc_html(get_the_title($post['ID'])); ?></a>
				</b>
			</h3>
		</p>

		<p>
			<?php if ( ! empty( has_post_thumbnail( $post['ID'] ) ) ) { ?>
				<?php echo get_the_post_thumbnail( $post['ID'], 'large' ); ?>
			<?php } ?>
		</p>
	</div>
	<?php
}

function post_template( $post ) {
	?>
	<div>
		<p>
			<h3>
				<b>
					<a href="<?php echo esc_url(get_permalink($post->ID)); ?>"> <?php echo esc_html(get_the_title($post->ID)); ?></a>
				</b>
			</h3>
		</p>

		<p>
			<?php if ( ! empty( has_post_thumbnail( $post->ID ) ) ) { ?>
				<?php echo get_the_post_thumbnail( $post->ID, 'large' ); ?>
			<?php } ?>
		</p>
	</div>
	<?php
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
