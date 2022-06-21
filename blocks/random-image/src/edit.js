import { __ } from '@wordpress/i18n';

import {
	Placeholder,
	Button,
	ToolbarGroup,
	ToolbarButton
} from "@wordpress/components";

import {
	useBlockProps,
    BlockIcon,
	BlockControls
} from "@wordpress/block-editor";

import { useState } from "@wordpress/element";

import { useDispatch } from "@wordpress/data";

import DisabledLoading from './components/disabled-loading/index'

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

	const [loading, setLoading] = useState(false);
	const { createErrorNotice } = useDispatch("core/notices");

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
		setLoading(true);
		try {
			const image = await getRandomImage();
			setAttributes({ src: image });
		} catch (error) {
			createErrorNotice(
				__("Something went wrong, Please try again later!", "random-image"),
				{
					type: "snackbar",
				}
			);
		} finally {
			setLoading(false);
		}
	};

	const isSourceAvailable = typeof attributes.src !== "undefined";

	return (
		<div>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
					showTooltip
					icon="update-alt"
					label={__("Try another image", "random-image")}
				/>
				</ToolbarGroup>
			</BlockControls>
			<div { ...blockProps }>
				{isSourceAvailable && (
					<DisabledLoading isLoading={loading}>
						<img src={attributes.src} />
					</DisabledLoading> 
				)}
				{!isSourceAvailable && (
					<Placeholder
						icon={<BlockIcon icon="format-image" />}
						label={__("Random image block", "random-image")}
						instructions={__("Quickly add random placeholder images in your site.","random-image")}
					>
						<Button variant="primary" isBusy={loading} onClick={updateImage}>
							{__("Create a random image", "random-image")}
						</Button>
					</Placeholder>
				)}
			</div>
		</div>	 
	);
}
