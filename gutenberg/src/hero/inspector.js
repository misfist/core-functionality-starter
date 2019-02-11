/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { InspectorControls, PanelColorSettings } = wp.editor;
const { PanelBody, TextControl, SelectControl, RangeControl, ToggleControl } = wp.components;

/**
 * Inspector controls
 */
export default class Inspector extends Component {

	render() {
		const { attributes, setAttributes } = this.props;

		return (
			<InspectorControls key="inspector">
				<PanelBody initialOpen={ true } title={ __( 'Positioning', 'core-functionality' ) }>
					<RangeControl
						label={ __( 'Width (%)', 'core-functionality' ) }
						value={ attributes.width }
						onChange={ ( width ) => setAttributes( { width } ) }
						min={ 25 }
						max={ 100 }
					/>
					<SelectControl
						label={ __( 'Position', 'core-functionality' ) }
						value={ attributes.position }
						onChange={ ( position ) => setAttributes( { position } ) }
						options={ [
							{ value: 'left', label: __( 'Left', 'core-functionality' ) },
							{ value: 'center', label: __( 'Center', 'core-functionality' ) },
							{ value: 'right', label: __( 'Right', 'core-functionality' ) },
						] }
					/>
				</PanelBody>
				<PanelBody initialOpen={ false } title={ __( 'Button Settings', 'core-functionality' ) }>
					<ToggleControl
						label={ __( 'Show Button', 'core-functionality' ) }
						checked={ !! attributes.showButton }
						help={ ( checked ) => checked ? __( 'Button is visible.', 'core-functionality' ) : __( 'Button is not visible.', 'core-functionality' ) }
						onChange={ ( showButton ) => setAttributes( { showButton } ) }
					/>
					{ attributes.showButton && (
						<Fragment>
							<TextControl
								label={ __( 'Button Text', 'core-functionality' ) }
								value={ attributes.buttonText }
								onChange={ ( buttonText ) => setAttributes( { buttonText } ) }
							/>
							<TextControl
								label={ __( 'Button URL', 'core-functionality' ) }
								value={ attributes.url }
								onChange={ ( url ) => setAttributes( { url } ) }
							/>
						</Fragment>
					) }
				</PanelBody>

			</InspectorControls>
		);
	}

}
