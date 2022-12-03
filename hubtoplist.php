<?php

/**
 * Plugin name: Hub Top List
 * Author: Davor Novoselac
 * Description: This is a test plugin for Carl Farrugia Galea
 * Version: 1.0.0
 * Text Domain: hub-top-list
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/

// Create basic security
if ( !defined( 'ABSPATH' ) ) {
    echo 'Hi, nothing for you here when called directly.';
    exit;
}

// Main HubTopList class
class HubTopList {
    // Running our get_api_data function in contructor
    public function __construct() {
        // Load assets, css, js
        add_action('init', array($this, 'load_assets'));

        // Add hubtoplist shortcode
        add_shortcode('hubtoplist', array($this, 'load_hubTopList'));
    }
    // Load all assets, css and js
    public function load_assets() {
        // Load css
        wp_enqueue_style(
            'hubtoplist-css',
            plugin_dir_url( __FILE__ ) . 'css/hubtoplist.css',
            array(),
            1,
            'all'
        );

        // Load js
        wp_enqueue_script(
            'hubtoplist-js',
            plugin_dir_url( __FILE__ ) . 'js/hubtoplist.js',
            array('jquery'),
            1,
            true
        );
    }

    public function load_hubTopList() {
        return '
            <section class="hubTopList">
                <div class="hubTopList__loading" style="display:block;"></div>
                <div class="hubTopList__data">
                    <main class="hubTopList__entries"></main>
                </div>
            </section>
        ';
    }

}

new HubTopList;