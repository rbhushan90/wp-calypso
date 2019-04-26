/**
 * External dependencies
 */
import { connect } from 'react-redux';
import page from 'page';
import React, { FunctionComponent } from 'react';
import { useTranslate } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import Button from 'components/button';
import { FEATURE_GOOGLE_MY_BUSINESS } from 'lib/plans/constants';
import { hasFeature } from 'state/sites/plans/selectors';
import { getSelectedSiteId, getSelectedSiteSlug } from 'state/ui/selectors';
import MarketingToolFeature from '../feature';

interface MarketingToolGMBFeatureProps {
	hasGoogleMyBusinessAvailable: boolean;
	selectedSiteSlug: string | null;
}

const MarketingToolGMBFeature: FunctionComponent< MarketingToolGMBFeatureProps > = ( {
	hasGoogleMyBusinessAvailable,
	selectedSiteSlug,
} ) => {
	const translate = useTranslate();

	const handleConnectToGoogleMyBusinessClick = () => {
		page( `/google-my-business/${ selectedSiteSlug || '' }` );
	};

	return (
		<MarketingToolFeature
			title={ translate( 'Let your customers find you on Google' ) }
			description={ translate(
				'Get ahead of your competition. Be there when customers search businesses like yours on Google Search and Maps by connecting to Google My Business.'
			) }
			imagePath="/calypso/images/illustrations/business.svg"
		>
			{ hasGoogleMyBusinessAvailable ? (
				<Button onClick={ handleConnectToGoogleMyBusinessClick }>
					{ translate( 'Connect to Google My Business' ) }
				</Button>
			) : (
				<Button>{ translate( 'Upgrade to Business' ) }</Button>
			) }
		</MarketingToolFeature>
	);
};

export default connect( state => {
	const selectedSiteId = getSelectedSiteId( state );
	return {
		hasGoogleMyBusinessAvailable: selectedSiteId
			? hasFeature( state, selectedSiteId, FEATURE_GOOGLE_MY_BUSINESS )
			: false,
		selectedSiteSlug: getSelectedSiteSlug( state ),
	};
} )( MarketingToolGMBFeature );
