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
	AlignmentControl, 
	BlockControls,
	InspectorControls,
	PanelColorSettings,
	MediaPlaceholder,
	BlockIcon,
	MediaUpload,
	MediaUploadCheck
} from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl,
	RadioControl,
	CheckboxControl,
	RangeControl,
	Button,
	ResponsiveWrapper,
	ToolbarButton,
	ToolbarGroup
} from '@wordpress/components';

import { Fragment } from '@wordpress/element';
import ServerSideRender from '@wordpress/server-side-render';
import { useSelect } from '@wordpress/data';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */

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

	const hasImages = attributes.images.length > 0;

	return (
		<div>
			<BlockControls>
				<ToolbarGroup>
					<MediaUploadCheck>
						<MediaUpload
							multiple
							gallery
							addToGallery = {true}
							onSelect = {(newImages) => setAttributes({ images: newImages })}
							allowedTypes = {["image"]}
							value = { attributes.images.map((image) => image.id) }
							render = {({ open }) => (
								<ToolbarButton onClick={open}>
									{__("Edit Gallery", "gutenberg-block")}
								</ToolbarButton>
							)}
						/>
					</MediaUploadCheck>
				</ToolbarGroup>
			</BlockControls>
			<div { ...blockProps }>
				{hasImages && (
					<figure className="scrollable-gallery-inner-container">
						{ attributes.images.map((image, index) => (
							<img key={index} src={image.url} />
						))}
					</figure>
				)}
				{ !hasImages && (
					<MediaPlaceholder
						multiple
						gallery
						icon={<BlockIcon icon="format-gallery" />}
						labels={{
							title: __( "Scrollable Image Gallery", "gutenberg-block" ),
							instructions: __( "Create scrollable image gallery", "gutenberg-block"),
						}}
						onSelect= { (newImages) => { setAttributes( { images: newImages } ) } }
					/>
				)}
			</div>
		</div>
	);
}
