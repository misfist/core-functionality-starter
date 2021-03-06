<?php
/**
 * Plugin Name:     Core Functionality
 * Plugin URI:      https://github.com/misfist/core-functionality-starter
 * Description:     A plugin starter for core functionality
 * Author:          Pea <pea@misfist.com>
 * Author URI:      https://misfist.com
 * Text Domain:     core-functionality
 * Domain Path:     /languages
 * Version:         0.2.0
 *
 * @package         Core_Functionality
 */

 if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Plugin Directory
 *
 * @since 0.1.0
 */
define( 'SITE_CORE_DIR', dirname( __FILE__ ) );

require_once( 'includes/security.php' );
require_once( 'includes/performance.php' );

require_once( 'includes/custom-fields.php' );
require_once( 'includes/custom-post-types.php' );
require_once( 'includes/custom-taxonomy.php' );

require_once( 'includes/admin.php' );
require_once( 'includes/public.php' );

require_once( 'includes/helpers.php' );
