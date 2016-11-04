<?php
/**
 * Core Security Functions
 *
 * @package    Core_Functionality
 * @subpackage Core_Functionality\Includes
 * @since      0.1.0
 * @license    GPL-2.0+
 */

 /**
  * Hide WP version strings from scripts and styles
  *
  * @since      0.1.0
  *
  * @uses       script_loader_src
  * @uses       style_loader_src
  *
  * @param      {string} $src
  * @return     {string} $src   Modified to remove version
  */
 function remove_wp_version_strings( $src ) {
      global $wp_version;
      parse_str( parse_url( $src, PHP_URL_QUERY ), $query );
      if ( !empty( $query['ver'] ) && $query['ver'] === $wp_version ) {
          $src = remove_query_arg( 'ver', $src );
      }
      return $src;
  }
  add_filter( 'script_loader_src', 'remove_wp_version_strings' );
  add_filter( 'style_loader_src', 'remove_wp_version_strings' );

/**
 * Hide WP version strings from generator meta tag
 *
 * @since   0.1.0
 *
 * @uses    the_generator
 *
 * @param   void
 * @return  {string} Empty string
 */
function remove_wp_version_meta_tag() {
   return '';
}
add_filter( 'the_generator', 'remove_wp_version_meta_tag' );
