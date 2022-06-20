<?php
include './style.scss';

function Movie_template( $post ) {
    ?>
      <div class="card">
        <div class="card__image">
          <?php if ( ! empty( has_post_thumbnail( $post->ID ) ) ) { ?>
            <?php echo get_the_post_thumbnail( $post->ID, 'large' ); ?>
          <?php } ?>
        </div>
        <div class="card__container">
          <a href="<?php echo esc_url(get_permalink($post->ID)); ?>"> <?php echo esc_html(get_the_title($post->ID)); ?></a> 
          <p>
            <?php echo esc_html__('Post Status: '); ?>
            <?php echo esc_html( $post->post_status); ?>
          </p> 
        </div>
      </div>
    <?php
}
?>
