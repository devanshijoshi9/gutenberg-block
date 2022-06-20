<?php
//include MY_PLUGIN_DIR_PATH . 'components/post-card/style.css';

function Movie_template( $post ) {
    ?>
    <link rel='stylesheet' href=<?php MY_PLUGIN_DIR_PATH . 'components/post-card/style.css' ?>/>
      <div class="card">
        <div class="card__image">
          <?php if ( ! empty( has_post_thumbnail( $post->ID ) ) ) { ?>
            <?php echo get_the_post_thumbnail( $post->ID ); ?>
          <?php } ?>
        </div>
        <div class="card__container">
          <a class="card__container--title" href="<?php echo esc_url(get_permalink($post->ID)); ?>"> <?php echo esc_html(get_the_title($post->ID)); ?></a> 
          <p>
            <?php echo esc_html__('Post Status: '); ?>
            <?php echo esc_html( $post->post_status); ?>
          </p> 
        </div>
      </div>
    <?php
}
?>
