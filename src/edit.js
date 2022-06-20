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
	SelectControl,
	RadioControl,
	CheckboxControl,
	RangeControl
} from '@wordpress/components';

import ServerSideRender from '@wordpress/server-side-render';
import apiFetch from '@wordpress/api-fetch';
import { useState } from '@wordpress/element';

import { useSelect } from '@wordpress/data';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './components/post-card/style.scss';

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

	const onChangePostOption = ( newPostOption ) => {
		setAttributes({postOption: newPostOption})
		if ( newPostOption === "all" ) {
			setAttributes({singlePost: false})
		} else {
			setAttributes({singlePost: true})
		}
	}

	const onChangePostOrder = ( newpostOrder ) => {
		setAttributes( { postOrder: newpostOrder } )
	}

	const onChangePost = (changesPost) => {
		setAttributes({ID: changesPost})
	}

	const onChangePostStatus = ( newPostStatus ) => {
		let status = newPostStatus ? 'Checked' : 'Unchecked' 
		setAttributes( {postStatus: newPostStatus } )
	}
	
	const allposts = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecords( 'postType', 'post' );
	}, [] );

	// options for SelectControl
	var options = [];
		
	// if posts found
	if( allposts ) {
		options.push( { value: '0', label: 'Select Post' } );
		allposts.forEach((post) => {
			options.push({value:post.id, label:post.title.rendered});
		});
	} else {
		options.push( { value: 0, label: 'Loading...' } )
	}

	//const [ categories, setCategories ] = useState(['1']);

	// apiFetch( { path: '/wp/v2/categories' } ).then(
	// 	( category ) => {
	// 		setCategories( { category } )
	// 		console.log(categories)
	// 	}
	// );

	async function fetch_categories() {
		const response = await apiFetch( { path:'/wp/v2/categories', } );
		//const newValue = response[0].value;
		var categoryOptions = [];

		if( response ) {
			categoryOptions.push( { value: '0', label: 'Select Category' } );
			response.forEach((category) => {
				categoryOptions.push({value:category.id, label:category.name});
			});
		} else {
			categoryOptions.push( { value: 0, label: 'Loading...' } )
		}
		return {categoryOptions}
	}

	const categoriesOption = fetch_categories();

	console.log(categoriesOption)

	const onChangeCategory = ( newCategory ) => {
		setAttributes( { category: newCategory } )
	}

	//http://gutenbergblock.local/wp-json/wp/v2/posts?categories=4

	return (
		<div className='post-information'>
			<div { ...blockProps }>
				{ <ServerSideRender block="devanshi/dynamic-block-example" attributes={attributes} /> }
			</div>
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
				<PanelBody title={ __( 'Post Settings', 'gutenberg-block' ) }>

					<RadioControl
						label="Select Option"
						selected={ attributes.postOption }
						options={ [
							{ label: 'Latest Posts', value: 'all' },
							{ label: 'Specific post', value: 'single' },
						] }
						onChange={ onChangePostOption }
					/>

					{ ! attributes.singlePost && (
						<>
							<RadioControl
								label="Select Post Order"
								selected={ attributes.postOrder }
								options={ [
									{ label: 'Ascending', value: 'asc' },
									{ label: 'Desending', value: 'desc' },
								] }
								onChange={ onChangePostOrder }
							/>

							<SelectControl
								label="Select Category"
								value={ attributes.category }
								options={ categoriesOption }
								onChange={ onChangeCategory }
							/>

							<CheckboxControl
								label="Tick to include all post status"
								help="Publish, Draft and Future Post "
								checked={ attributes.postStatus }
								onChange={ onChangePostStatus }
							/>

							<RangeControl
								label="Posts per Page"
								value={ attributes.postPerPage }
								onChange={ ( newPostPerPage ) => setAttributes( { postPerPage: newPostPerPage } ) }
								min={ 3 }
								max={ 50 }
							/>
						</>
					) }

					{ attributes.singlePost && (
						<SelectControl
							label="Select Post"
							value={ attributes.ID }
							options={ options }
							onChange={ onChangePost }
						/>
					)}
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<AlignmentControl
					value={ attributes.align }
					onChange={ onChangeAlign }
				/>
			</BlockControls>
		</div>	 
	);
}
