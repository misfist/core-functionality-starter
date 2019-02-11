<?php
/**
 * Core Gutenberg Functions
 *
 * @package    Core_Functionality
 * @subpackage Core_Functionality\Includes
 * @since      0.1.0
 * @license    GPL-2.0+
 */

/**
 * Block Initializer.
 */
require_once SITE_CORE_DIR . '/gutenberg/src/init.php';

/**
 * Register Gutenberg Category
 *
 * @param array $categories
 * @param obj $post
 * @return void
 */
function core_block_category( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 'content',
				'title' => __( 'Content', 'core-functionality' ),
			),
		)
	);
}
add_filter( 'block_categories', 'core_block_category', 10, 2 );

/**
 * Limit Gutenberg Support by Post Type
 *
 * @param  boolean $is_enabled
 * @param  string  $post_type
 * @return boolean $is_enabled
 */
function core_disable_gutenberg_post_type( $is_enabled, $post_type ) {
  $gutenberg_supported_types = array( 'post', 'page' );

  if ( !in_array( $post_type, $gutenberg_supported_types, true ) ) {
    $is_enabled = false;
  }

	return $is_enabled;
}
add_filter( 'gutenberg_can_edit_post_type', 'core_disable_gutenberg_post_type', 10, 2 );

/**
 * Is Gutenberg Enabled
 * Check post_meta value `enable_gutenberg`
 *
 * @param  int $id
 * @return boolean true | false
 */
function core_is_gutenberg_enabled( $id = false ) {
	if( empty( $id ) ) {
    return false;
  }

	$id = intval( $id );

	return get_post_meta( $id, 'enable_gutenberg', true );
}

/**
 * Disable Gutenberg
 *
 * @param  boolean $is_enabled
 * @param  string  $post_type
 * @return boolean $is_enabled
 */
function core_enable_gutenberg( $can_edit, $post_type ) {
	if( ! ( is_admin() && !empty( $_GET['post'] ) ) ) {
  	return $can_edit;
  }

	if( !core_is_gutenberg_enabled( $_GET['post'] ) ) {
    $can_edit = false;
  }

	return $can_edit;
}
// add_filter( 'gutenberg_can_edit_post_type', 'core_enable_gutenberg', 10, 2 );
// add_filter( 'use_block_editor_for_post_type', 'core_enable_gutenberg', 10, 2 );
