/**
 * BLOCK: Hero
 */

import './style.scss';
import './editor.scss';
import Inspector from './inspector';

const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const {
	RichText, 
	BlockControls, 
	AlignmentToolbar,
	MediaPlaceholder,
	MediaUpload,
	MediaUploadCheck
} = wp.editor;

const ALLOWED_MEDIA_TYPES = [ 'image' ];
const IMAGE_BACKGROUND_TYPE = 'image';

const blockAttributes = {
	subtitle: {
		source: 'children',
		selector: '.hero-subtitle',
	},
	title: {
		source: 'children',
		selector: '.hero-title',
	},
	content: {
		source: 'children',
		selector: '.hero-content',
	},
	alignment: {
		type: 'string',
	},
	position: {
		type: 'string',
		default: 'left',
	},
	width: {
		type: 'number',
		default: 25,
	},
	id: {
		type: 'number',
	},
	overlayColor: {
		type: 'string',
	},
	backgroundType: {
		type: 'string',
		default: 'image',
	},
	showButton: {
		type: 'bool',
		default: true,
	},
	buttonText: {
		type: 'string',
		default: __( 'Click He	re', 'core-functionality' ),
	},
	url: {
		type: 'string',
		default: '',
	}
};

registerBlockType( 'corefunctionality/hero', {
	title: __( 'Hero', 'core-functionality' ),
	description: __( 'Pair this block with the wrapper block to create stunning hero areas.', 'core-functionality' ),
	category: 'core-functionality',
	icon: 'format-image',
	category: 'content',
	keywords: [
		__( 'Hero', 'core-functionality' ),
	],
	attributes: blockAttributes,
	supports: {
		align: true,
	},

	edit: function( props ) {
		const { attributes, setAttributes, className } = props;

		const heroStyle = {
			textAlign: attributes.alignment,
			maxWidth: attributes.width + '%',
		};

		return (
			<Fragment>
				<Inspector { ...props } />
				<BlockControls key="controls">
					<AlignmentToolbar
						value={ attributes.alignment }
						onChange={ ( alignment ) => setAttributes( { alignment } ) }
					/>
				</BlockControls>
				<div className={ className + ' ' + attributes.position }>
					<div className="inner" style={ heroStyle }>
						<RichText
							value={ attributes.subtitle }
							onChange={ ( subtitle ) => setAttributes( { subtitle } ) }
							tagName="h3"
							placeholder={ __( 'Hero Sub-title', 'core-functionality' ) }
							formattingControls={ [] }
							keepPlaceholderOnFocus={ true }
							className="hero-subtitle"
						/>
						<RichText
							value={ attributes.title }
							onChange={ ( title ) => setAttributes( { title } ) }
							tagName="h2"
							placeholder={ __( 'Hero Heading', 'core-functionality' ) }
							formattingControls={ [] }
							keepPlaceholderOnFocus={ true }
							className="hero-title"
						/>
						<RichText
							value={ attributes.content }
							onChange={ ( content ) => setAttributes( { content } ) }
							tagName="p"
							placeholder={ __( 'Hero Text', 'core-functionality' ) }
							formattingControls={ [] }
							keepPlaceholderOnFocus={ true }
							className="hero-content"
						/>
						{ attributes.showButton &&
							<div className="button-container">
								{ /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
								<a className="btn btn-danger" href="#">{ attributes.buttonText }</a>
							</div>
						}
					</div>
				</div>
			</Fragment>
		);
	},

	save: function( props ) {
		const { attributes } = props;

		const heroStyle = {
			textAlign: attributes.alignment,
			maxWidth: attributes.width + '%',
		};

		return (
			<div className={ attributes.position }>
				<div className="inner" style={ heroStyle }>
				{ attributes.subtitle }
					<RichText.Content
						tagName="h3"
						value={ attributes.subtitle }
						className="hero-subtitle"
					/>
					<RichText.Content
						tagName="h2"
						value={ attributes.title }
						className="hero-title"
					/>
					<RichText.Content
						tagName="p"
						value={ attributes.content }
						className="hero-content"
					/>
					{ attributes.showButton &&
						<div className="button-container">
							<a className="btn btn-danger" href={ attributes.url }>{ attributes.buttonText }</a>
						</div>
					}
				</div>
			</div>
		);
	},

} );
