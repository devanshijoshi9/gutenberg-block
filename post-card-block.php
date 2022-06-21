<?php

require MY_PLUGIN_DIR_PATH . 'src/components/post-card/index.php';

function render_post_block($attributes, $content)
{
	if ( $attributes['postStatus'] ) {
		$status = [ 'publish', 'draft', 'future' ];
	}

	$args = array(
		'orderby'     => 'date',
		'category'    => $attributes['category'],
		'order'       => $attributes['postOrder'],
		'post_status' => $status ? $status : 'publish',
		'numberposts' => $attributes['postPerPage']
	);

	$latest_posts = get_posts( $args );

	ob_start();

	if ( $attributes['singlePost'] == false ) {
		foreach ( $latest_posts as $post ) {
			// echo '<pre>'; print_r($post); echo '</pre>';
			Movie_template($post);
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

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function post_card_block_init()
{
	register_block_type(
		__DIR__ . '/build',
		array(
			'render_callback' => 'render_post_block',
		)
	);
}
add_action('init', 'post_card_block_init');
