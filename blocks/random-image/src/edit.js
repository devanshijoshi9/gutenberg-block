import { __ } from '@wordpress/i18n';

import {
	Placeholder,
	Button,
} from "@wordpress/components";

import {
	useBlockProps,
    BlockIcon
} from "@wordpress/block-editor";

import ServerSideRender from '@wordpress/server-side-render';

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

	async function getRandomImage() {
		try {
			const apiEndpoint = "https://source.unsplash.com/random";
			const url = await (await fetch(apiEndpoint)).url;
			return url;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	const updateImage = async () => {
		const image = await getRandomImage(); // Our API handler.
		setAttributes({ src: image }); // Updating the attribute.
	};

	const isSourceAvailable = typeof attributes.src !== "undefined";

	return (
		<div className='post-information'>
			<div { ...blockProps }>
				{ <ServerSideRender block="devanshi/post-cards" attributes={attributes} /> }
				{isSourceAvailable && <img src={attributes.src} />}
				{!isSourceAvailable && (
					<Placeholder
						icon={<BlockIcon icon="format-image" />}
						label={__("Random image block", "random-image")}
						instructions={__("Quickly add random placeholder images in your site.","random-image")}
					>
						<Button variant="primary" onClick={updateImage}>
							{__("Create a random image", "random-image")}
						</Button>
					</Placeholder>
				)}
			</div>
		</div>	 
	);
}
