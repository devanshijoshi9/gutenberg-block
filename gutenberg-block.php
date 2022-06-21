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

define( 'MY_PLUGIN_DIR_PATH', plugin_dir_path( __FILE__ ) );

require MY_PLUGIN_DIR_PATH . 'post-card-block.php';
