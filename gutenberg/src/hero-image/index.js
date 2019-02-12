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
const { Fragment } = wp.element;
const {
    AlignmentToolbar,
    BlockControls,
    Editable,
	RichText, 
    MediaUpload,
    MediaPlaceholder,
	URLInput,
} = wp.editor;
const {
	Button,
	TextControl,
	TextareaControl,
	IconButton,
    Tooltip,
} = wp.components;

const blockAttributes = {
    title: {
        type: 'string',
        source: 'html',
        selector: '.hero-title'
    },
    subtitle: {
        type: 'string',
        source: 'html',
        selector: '.hero-subtitle'
    },
    content: {
        type: 'array',
        source: 'children',
        selector: '.hero-content'
    },
    imgURL: {
        type: 'string',
        source: 'attribute',
        attribute: 'src',
        selector: 'img',
    },
    imgID: {
        type: 'number',
    },
    imgAlt: {
        type: 'string',
        source: 'attribute',
        attribute: 'alt',
        selector: 'img',
    },
    overlayColor: {
        type: 'string',
    },
    linkText: {
        type: 'string',
        source: 'text',
        selector: 'a',
    },
    url: {
        type: 'string',
        source: 'attribute',
        attribute: 'href',
        selector: 'a',
    },
    blockAlignment: {
        type: 'string',
    },
};

/**
 * Register: Gutenberg Blocks.
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

 /**
  * Intro Block
  */
registerBlockType( 'corefunctionality/hero-element', {
	title: __( 'Hero Block', 'core-functionality' ),
	icon: 'format-image',
    category: 'content',
    align: true,
	keywords: [
		__( 'hero image content' ),
	],
	attributes: blockAttributes,

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: props => {
		const { attributes: { title, subtitle, content, linkText, url, imgID, imgURL, imgAlt, blockAlignment }, className, setAttributes, isSelected } = props;
        const onChangeTitle = title => { setAttributes( { title } ) };
		const onChangeSubTitle = subtitle => { setAttributes( { subtitle } ) };
		const onChangeContent = content => { setAttributes( { content } ) };
        const onChangeLinkText = linkText => { setAttributes( { linkText } ) };
        const onChangeLinkUrl = url => { setAttributes( { url } ) };
        const onSelectImage = img => {
            setAttributes( {
                imgID: img.id,
                imgURL: img.url,
                imgAlt: img.alt,
            } );
        };
        const onRemoveImage = () => {
            setAttributes({
                imgID: null,
                imgURL: null,
                imgAlt: null,
            });
        };

        const mediaPlaceholder = <MediaPlaceholder

            onSelect={ media => { setAttributes( { imgURL: media.url } ) } }
			allowedTypes = { [ 'image' ] }
			multiple = { false }
			labels = { { title: 'The Image' } }
		/>;

        const getImageButton = ( openEvent ) => {

            return (
                <div>

                </div>
            );

        };

		return (
			<div className={ className }>
                <BlockControls>
                    <AlignmentToolbar
                        value={ blockAlignment }
                        onChange={ blockAlignment => setAttributes( { blockAlignment } ) }
                    />
                </BlockControls>
                <div class="hero-body container">
                
                    <RichText
                        tagName="h3"
                        className={ 'hero-subtitle' }
                        placeholder={ __( 'Enter Subtitle' ) }
                        value={ subtitle }
                        onChange={ onChangeSubTitle }
                    />
                    <RichText
                        tagName="h2"
                        className={ 'hero-title' }
                        placeholder = { __( 'Enter Heading' ) }
                        value={ title }
                        onChange={ onChangeTitle }
                    />
                    <RichText
                        tagName="div"
                        multiline="p"
                        placeholder={ __( 'Enter Content', 'core-functionality' ) }
                        className={ 'hero-content' }
                        value={ content }
                        onChange={ onChangeContent }
                    />
                    { isSelected ? (

                        <Fragment>
                            <TextControl
                                id="link-text"
                                label={ __( 'Link Text', 'core-functionality' ) }
                                value={ linkText }
                                onChange={ onChangeLinkText }
                            />
                            <p>{ __( 'Link URL', 'core-functionality' ) }</p>
                            <form
                                className="blocks-format-toolbar__link-modal-line blocks-format-toolbar__link-modal-line"
                                onSubmit={ event => event.preventDefault() }
                            >
                                <URLInput
                                    className="url"
                                    label={ __( 'Link URL', 'core-functionality' ) }
                                    value={ url }
                                    onChange={ onChangeLinkUrl }
                                />
                                <IconButton
                                    className="components-toolbar__control"
                                    icon="editor-break"
                                    label={ __( 'Apply', 'core-functionality' ) }
                                    type="submit"
                                />
                            </form>
                        </Fragment>

                        ) : (

                        <p>
                            <a href={ url }  class="btn btn-danger">
                                { linkText  || __( 'Edit Link', 'core-functionality' ) }
                            </a>
                        </p>

                        )}

                        

                        <MediaPlaceholder
                            onSelect={ media => { setAttributes( { imgAlt: media.alt, imgURL: media.url } ) } }
                            allowedTypes = { [ 'image' ] }
                            multiple = { false }
                            labels = { { title: 'The Image' } }
                            value={ imgURL }
                        />
                        
                </div>
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
	save: props => {
		const { attributes: { title, subtitle, content, linkText, url, imgID, imgURL, imgAlt, blockAlignment } } = props;
		return (
			<div style={ { backgroundImage: "url(" + imgURL + ")" } }>
                <div class="hero-body container">
                    <h3 class="hero-subtitle">{ subtitle }</h3>
                    <h2 class="hero-title">{ title }</h2>
                    <div class="hero-content">
                        { content }
                    </div>
                    <a href={ url } class="btn btn-danger">{ linkText }</a>
                </div>
			</div>
		);
	},

} );