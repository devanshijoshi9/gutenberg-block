/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
 import { 
	useBlockProps, 
	RichText, 
	AlignmentControl, 
	BlockControls,
	InspectorControls,
	PanelColorSettings
} from '@wordpress/block-editor';

import {
	TextControl,
	PanelBody,
	PanelRow,
	ToggleControl,
	ExternalLink,
	SelectControl
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';

import { useState } from '@wordpress/element';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {

	const blockProps = useBlockProps();

	const onChangeContent = ( newContent ) => {
		setAttributes( { content: newContent } )
	}

	const onChangeAlign = ( newAlign ) => {
		setAttributes( { 
			align: newAlign === undefined ? 'none' : newAlign, 
		} )
	}

	const onChangeTextColor = (newTextColor) => {
		setAttributes( { textColor: newTextColor } )
	}

	const onChangeBackgroundColor = ( newBackgroundColor ) => {
		setAttributes( { backgroundColor: newBackgroundColor } )
	}

	const onChangePostLink = ( newPostLink ) => {
		setAttributes( { postLink: newPostLink === undefined ? '' : newPostLink } )
	}
	
	const onChangeLinkLabel = ( newLinkLabel ) => {
		setAttributes( { linkLabel: newLinkLabel === undefined ? '' : newLinkLabel } )
	}
	
	const toggleNofollow = () => {
		setAttributes( { hasLinkNofollow: ! attributes.hasLinkNofollow } )
	}

	return (
		<>
			<InspectorControls>
				<PanelColorSettings 
					title={ __( 'Color settings', 'gutenberg-block' ) }
					initialOpen={ false }
					colorSettings={ [
						{
						  value: attributes.textColor,
						  onChange: onChangeTextColor,
						  label: __( 'Text color', 'gutenberg-block' ),
						},
						{
						  value: attributes.backgroundColor,
						  onChange: onChangeBackgroundColor,
						  label: __( 'Background color', 'gutenberg-block' ),
						}
					] }
				/>
				<PanelBody 
					title={ __( 'Link Settings', 'gutenberg-block' )}
					initialOpen={true}
				>
				<PanelRow>
					<fieldset>
						<TextControl
							label={__( 'Affiliate link', 'gutenberg-block' )}
							value={ attributes.postLink }
							onChange={ onChangePostLink }
							help={ __( 'Add your affiliate link', 'gutenberg-block' )}
						/>
					</fieldset>
				</PanelRow>
				<PanelRow>
					<fieldset>
						<ToggleControl
							label="Add rel = nofollow"
							help={
								attributes.hasLinkNofollow
									? 'Has rel nofollow.'
									: 'No rel nofollow.'
							}
							checked={ attributes.hasLinkNofollow }
							onChange={ toggleNofollow }
						/>
					</fieldset>
				</PanelRow>
				<PanelRow>
					<fieldset>
						<TextControl
							label={__( 'Link label', 'gutenberg-block' )}
							value={ attributes.linkLabel }
							onChange={ onChangeLinkLabel }
							help={ __( 'Add link label', 'gutenberg-block' )}
						/>
					</fieldset>
				</PanelRow>
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<AlignmentControl
					value={ attributes.align }
					onChange={ onChangeAlign }
				/>
			</BlockControls>
			<div>
				<RichText
					{ ...blockProps }
					tagName="p"
					onChange={ onChangeContent }
					allowedFormats={ [ 'core/bold', 'core/italic' ] }
					value={ attributes.content }
					placeholder={ __( 'Write your text...', 'gutenberg-block' ) }
					style={ { textAlign: attributes.align, backgroundColor: attributes.backgroundColor, color: attributes.textColor } }
				/>

				<ExternalLink 
					href={ attributes.postLink }
					className="post-link"
					style={ { textAlign: attributes.align, backgroundColor: attributes.backgroundColor, color: attributes.textColor } }
					rel={ attributes.hasLinkNofollow ? "nofollow" : "" }
				>
						{ attributes.linkLabel }
				</ExternalLink>
			</div>
		</>	 
	);
}
