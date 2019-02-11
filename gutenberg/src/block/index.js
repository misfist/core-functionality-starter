/**
 * BLOCK: gutenberg
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { Component } = wp.element;
const {
	TextControl,
	TextareaControl
} = wp.components;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'corefunctionality/intro', {
	title: __( 'Intro Block', 'core-functionality' ),
	icon: 'info',
	category: 'content',
	keywords: [
		__( 'intro title content' ),
	],
	attributes: {
		title: {
			type: 'string',
			source: 'meta',
			meta: 'intro_title'
		},
		content: {
			type: 'string',
			source: 'meta',
			meta: 'intro_content'
		}
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: function( props ) {
		// Creates a <p class='wp-block-corefunctionality-intro'></p>.
		return (
			<div className={ props.className }>
				<h2>Intro Title</h2>
				<p>Intro content</p>
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( props ) {
		return (
			<div>
				<h2>Intro Title</h2>
				<p>Intro content</p>
			</div>
		);
	},
} );

registerBlockType( 'corefunctionality/summary', {
	title: __( 'Summary Block', 'core-functionality' ),
	icon: 'clipboard',
	category: 'content',
	keywords: [
		__( 'summary title content' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],
	attributes: {
		title: {
			type: 'string',
			source: 'meta',
			meta: 'summary_title'
		},
		content: {
			type: 'string',
			source: 'meta',
			meta: 'summary_content'
		}
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: function( props ) {
		// Creates a <p class='wp-block-corefunctionality-summary'></p>.
		return (
			<div className={ props.className }>
				<h2>Summary Title</h2>
				<p>Summary content</p>
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( props ) {
		return (
			<div>
				<h2>Summary Title</h2>
				<p>Summary content</p>
			</div>
		);
	},
} );