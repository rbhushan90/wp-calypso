/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';
import './style.scss';

registerBlockType( 'a8c/content-preview', {
	title: __( 'Content Preview' ),
	description: __( 'Previews the content of a post or a page into the editor.' ),
	icon: 'layout',
	category: 'layout',
	attributes: {
		selectedPostId: { type: 'number' },
		selectedPostType: { type: 'string' },
	},
	supports: {
		align: [ 'wide', 'full' ],
		anchor: true,
		html: false,
		reusable: false,
	},
	edit,
	save: () => null,
} );
