<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'abcd');

/** MySQL database username */
// ** !!ATTN!! MAKE SURE TO CHANGE HERE TO YOUR OWN!
define('DB_USER', 'root'); // ** Windows's default local env 

/** MySQL database password */
// ** !!ATTN!! MAKE SURE TO CHANGE HERE TO YOUR OWN!
define('DB_PASSWORD', ''); // ** Windows's default local env

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', 'utf8mb4_general_ci');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
// ** !!ATTN!! MAKE SURE TO ADD NEW SALT ON YOUR OWN!
define('AUTH_KEY',         'bhJu9=m:h_&~u#Vh5%q06ZRsH)[FT.VU-|H+_Lu&qkP-Q$+1C{5vf;eq0Z.!%*3#');
define('SECURE_AUTH_KEY',  '9f-8f2`N7rny7z).WGBQnjO@d!]|EaTw|_g{;+uwE/yBI!imwQ5E(95%gve6^|Q|');
define('LOGGED_IN_KEY',    '<8lp(zz46IJa|O_!|V-F *]thr!lW`]!&r&wiy^V~z0rE,j|%m*z>s-ds6]_/cO*');
define('NONCE_KEY',        '+Of3LDvj-[.+)V8yFbl8v2Qt-|}/*]8,%h5Xy.>dCO<N?Cg5bj-C&L0_U#2WF}+]');
define('AUTH_SALT',        '-}V-Ut(9/})JPa[oCdd97{A&4J?E+mNE>-|9-u:oiCTs;{m.m2EKqX[/~aB@g+hs');
define('SECURE_AUTH_SALT', '[?fqG}gy/-|hYgO^V+--`yR5F`kbJPGo(5 c_sc=hCgkn>[NRDV)upql2ch+Z+_*');
define('LOGGED_IN_SALT',   '9@`8Eals>u@X4G,I3CBd&ny#`saz.g@It4r?Agwu&-`v!Lz zrpmjj9$v9wu1H{g');
define('NONCE_SALT',       'fQ^HquLi,/}-gLf( =y,|7n0Yz(Q|)0t]+@Cm 8,;9o{T>$m[gP.bB.dDS *=zr{');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
// ** !!ATTN!! MAKE SURE TO CHANGE HERE TO YOUR OWN!
$table_prefix  = 'abcd_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
/**
 * A better way to set debug to true, but wont show the errors to users
 * Reference: https://kinsta.com/blog/wp-config-php/
 */
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', false );
@ini_set( 'display_errors', 0 );

/** For debugging scripts and styles, set true to load uncompressed versions */
define( 'SCRIPT_DEBUG', true );


/* That's all, stop editing! Happy blogging. */


/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');


/**
 * WordPress Address
 * Reference: https://codex.wordpress.org/Changing_The_Site_URL
 */
// define('WP_SITEURL','http://mydomain.com/wordpress'); // ** the actual url WP resides
// define('WP_HOMEURL','http://mydomain.com'); // ** the url you want Users to tyep in

/**
 * === SECURITY MEASURE ===
 * TO make WP site secure, set an arbiturary directory to place wp-content, plugins, and uploads
 * to break away from the default structure
 * Reference: 
 * https://kinsta.com/blog/wp-config-php/
 * https://blogvault.net/everything-about-wordpress-configuration/
 * !!ATTN!!: All paths are relative to ABSPATH, and they should not contain a leading slash.
 * !!ATTN!!: Also, dont forget to set this wp-config.php file permission to be 400 or 440, like -r--r----
 */

/**
 * wp-content dir
 */
/** TO make WP site secure, set an arbiturary directory to place wp-content to break away from the default structure */
// define( 'WP_CONTENT_DIR', dirname(__FILE__) . '/mydir/wp-content' );
// define( 'WP_CONTENT_URL', 'http://example.com/mydir/wp-content' );

/**
 * themes dir
 * It’s not possible to set from the wp-config file to move /wp-content/themes folder, 
 * but we can register a new theme directory in a plugin or a theme’s functions file.
 * Reference: https://codex.wordpress.org/register_theme_directory
 */

/**
 * plugins dir
 */
// define( 'WP_PLUGIN_DIR', dirname(__FILE__) . '/wp-content/mydir/plugins' );
// define( 'WP_PLUGIN_URL', 'http://example.com/wp-content/mydir/plugins' );

/**
 * uploads dir
 */
// define( 'UPLOADS', 'wp-content/mydir/uploads' );


/**
 * === Memory Limit ===
 * If a fatal error with allowed memory size exhausted happened,
 * you can increase the memory limit
 */
define( 'WP_MEMORY_LIMIT', '128M' );
define( 'WP_MAX_MEMORY_LIMIT', '256M' );


/** 
 * === Other useful settings ===
 * Reference: 
 * https://code.tutsplus.com/articles/new-wp-config-tweaks-you-probably-dont-know--wp-35396
 * https://code.tutsplus.com/tutorials/conquering-the-wp-configphp-file-11-good-practices--wp-26338
 */
/** Enable the media trash */
define( 'MEDIA_TRASH', true );

/** To skip updating wp-content dir when you are sure you dont use default themes */
define( 'CORE_UPGRADE_SKIP_NEW_BUNDLED', true );

/** Allow dynamic setup of WPLANG for multilingual websites */
require_once( dirname( __FILE__ ) . '/wp-lang.php' );

/** Define your WP.com API key constant */
// define( 'WPCOM_API_KEY', 'YourKeyHere' );

/** Only when you need a TOTAL control of allowed html tags, you can setup your own custom list of allowed tags 
 * Make sure to hook your my_filter func with add_filter like add_filter( 'pre_kses', 'my_filter' );
 * Commented for now.
*/
// define( 'CUSTOM_TAGS', true );
// $allowedposttags = array();
// $allowedtags = array();
// $allowedentitynames = array();

/** Disable default post revisions to save some database bloating; commented for now*/
// define('WP_POST_REVISIONS', false );
/** Or you can set the revision limit; enabling this one here */
define('WP_POST_REVISIONS', 2 );

/** IF your site is SSL enabled, htne set this to true to force ssl on login page */
// define('FORCE_SSL_LOGIN', true);
/** If your site is SSL enabled and wanna have admin more secure, set this to true to set SSL for all admin panel pages */
// define('FORCE_SSL_ADMIN', true);

/** To widen the autosave frequency, add more than default 60sec */
define('AUTOSAVE_INTERVAL', 240 ); // the value should be in seconds!

/** USEFUL TIP!
 * If you need to move your site to another domain, set this constant, and
 * login on your new domain like newdomain.com/login.php and if the home URL has changed successfully
 * on the General Options page, take out this constant.
 */
define('RELOCATE',true); // We're not done yet!

/** Disallow users to edit the theme or plugin files */
define('DISALLOW_FILE_EDIT',true);
/** Disallow users to even install new themes or plugins*/
// define('DISALLOW_FILE_MODS',true);

/** Allow multisites to share a single WP installation */
// define('WP_ALLOW_MULTISITE', true);

/** Define custome users and usermeta tables 
 * Note: By default, users data go into users table and metadata goes into usermeta table
*/
// define('CUSTOM_USER_TABLE', 'my_users');
// define('CUSTOM_USER_META_TABLE', 'my_usermeta');

