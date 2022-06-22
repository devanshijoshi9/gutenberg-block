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
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
 export default function save( { attributes } ) {

	alert('hello');

	console.log(attributes)
	let blockProps = useBlockProps.save({
		className: "image-gallery",
		style: {
			"--total-container-transform": (( attributes.images.length + 1) * 16)
				.toString()
				.concat("vw"),
		},
	});

	return (
		<div {...blockProps}>
			<figure className="image-gallery-inner-container" data-direction="right">
				{attributes.images.map((image, index) => (
					<img key={index} src={image.url} data-mediaid={image.id} />
				))}

				{attributes.images.map((image, index) => (
					<img
						className="duplicate-image"
						key={index}
						src={image.url}
						data-mediaid={image.id}
					/>
				))}
			</figure>
		</div>
	);
}
