import { registerBlockType } from '@wordpress/blocks';
import './style.scss';

import Random_Image_Edit from './edit';
import Random_Image_Save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType("devanshi/random-image", {
	/**
	 * @see ./edit.js
	 */
	edit: Random_Image_Edit,
	/**
	 * @see ./save.js
	 */
	Random_Image_Save,
});
