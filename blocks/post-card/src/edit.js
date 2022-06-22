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
	ResponsiveWrapper
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
import '../../../components/post-card/style.scss';

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

	const allCategories = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecords( 'taxonomy', 'category' );
	}, [] );

	var categoryOptions = [];

	if( allCategories ) {
		categoryOptions.push( { value: '0', label: 'Select Category' } );
		allCategories.forEach((category) => {
			categoryOptions.push({value:category.id, label:category.name});
		});
	} else {
		categoryOptions.push( { value: 0, label: 'Loading...' } )
	}

	const onChangeCategory = ( newCategory ) => {
		setAttributes( { category: newCategory } )
	}

	const onSelectMedia = (media) => {
		console.log(media)
		setAttributes( {
			mediaId: media.id,
			mediaUrl: media.url
		} );
	}

	const removeMedia = () => {
		setAttributes({
			mediaId: 0,
			mediaUrl: ''
		});
	}

	return (
		<div className='post-information'>
			<div { ...blockProps }>
				{ <ServerSideRender block="devanshi/post-cards" attributes={attributes} /> }
			</div>
			<Fragment>
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
									options={ categoryOptions }
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
					<PanelBody
						title={__('Select block background image', 'gutenberg-block')}
						initialOpen={ true }
					>
						<div className="editor-post-featured-image">
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ onSelectMedia }
								value={ attributes.mediaId }
								allowedTypes={ ['image'] }
								render={({open}) => (
									<Button 
										className={attributes.mediaId == 0 ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview'}
										onClick={open}
									>
										{attributes.mediaId == 0 && __('Choose an image', 'gutenberg-block')}
										{attributes.mediaId != 0 && 
											<ResponsiveWrapper
												naturalWidth={ 1920 }
												naturalHeight={ 1080 }
												>
													<img src={attributes.mediaUrl} />
											</ResponsiveWrapper>
										}
									</Button>
								)}
							/>
						</MediaUploadCheck>
						{attributes.mediaId != 0 && 
							<MediaUploadCheck>
								<Button onClick={removeMedia} isLink isDestructive>{__('Remove image', 'awp')}</Button>
							</MediaUploadCheck>
						}
						</div>
				</PanelBody>
				</InspectorControls>
				</Fragment>
				<BlockControls>
					<AlignmentControl
					value={ attributes.align }
					onChange={ onChangeAlign }
				/>
			</BlockControls>
		</div>	 
	);
}
