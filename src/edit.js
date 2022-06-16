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

import ServerSideRender from '@wordpress/server-side-render';

import { useSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { useState, useEffect } from '@wordpress/element';

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

	const allposts = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecords( 'postType', 'post' );
	}, [] );

	const [selectedPost, newSelectedPost] = useState(1)
	const [post, setPost ]                = useState('')
	const [ error, setError ]             = useState( null );
    const [ isLoaded, setIsLoaded ]       = useState( false );

	// options for SelectControl
	var options = [];
		
	// if posts found
	if( allposts ) {
		options.push( { value: 0, label: 'Select Post' } );
		allposts.forEach((post) => {
			options.push({value:post.id, label:post.title.rendered});
		});
	} else {
		options.push( { value: 0, label: 'Loading...' } )
	}

	const onChangePost = (changesPost) => {
		console.log(changesPost)
		newSelectedPost(changesPost)

		apiFetch( { path: `/wp/v2/posts/${ changesPost }` } ).then( ( posts ) => {
			console.log( posts );
			setPost( posts );
		} );
	}

	if ( selectedPost !== "" ) {
		useEffect( () => {
			apiFetch( { path: `/wp/v2/posts/${ selectedPost }` } ).then(
				( result ) => {
					setIsLoaded( true );
					setPost( result );
				},
				( error ) => {
					setIsLoaded( true );
					setError( error );
				}
			);
		}, selectedPost );
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
				<PanelBody title={ __( 'Post Settings', 'gutenberg-block' ) }>

					<SelectControl
						label="Select Post"
						value={ selectedPost }
						options={ options }
						onChange={ onChangePost }
					/>

				</PanelBody>

			</InspectorControls>
			<BlockControls>
				<AlignmentControl
					value={ attributes.align }
					onChange={ onChangeAlign }
				/>
			</BlockControls>
			<div {...useBlockProps()}>
				<RichText
					tagName="p"
					onChange={ onChangeContent }
					allowedFormats={ [ 'core/bold', 'core/italic' ] }
					value={ attributes.content }
					placeholder={ __( 'Write your text', 'gutenberg-block' ) }
					style={ { textAlign: attributes.align, backgroundColor: attributes.backgroundColor, color: attributes.textColor } }
				/>
				{/* { error && __('Error:') && error.message }
				{ ! isLoaded && __('Loading Post') } */}
				{ post && (
					<a href={ post.title.rendered }>
						{ post.title.rendered }
					</a>
				) }

				<ServerSideRender
					block="devanshi/dynamic-block-example"
					attributes={ attributes }
				/>
			</div>
		</>	 
	);
}
