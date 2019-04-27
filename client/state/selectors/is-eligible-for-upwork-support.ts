/** @format */

/**
 * External dependencies
 */
import { get, includes, some } from 'lodash';

/**
 * Internal dependencies
 */
import { getCurrentUserLocale } from 'state/current-user/selectors';
import getSitesItems from 'state/selectors/get-sites-items';
import { isBusinessPlan, isEcommercePlan } from 'lib/plans';

const UPWORK_LOCALES = [ 'es', 'es-cl', 'es-mx', 'fr', 'fr-ca', 'fr-be', 'fr-ch' ];

/**
 * @param {Object} state Global state tree
 * @return {Boolean} Whether or not this customer should receive Upwork support
 */
export default function isEligibleForUpworkSupport( state ): boolean {
	if ( ! includes( UPWORK_LOCALES, getCurrentUserLocale( state ) ) ) {
		return false;
	}

	const hasBusinessOrEcommercePlan = some( getSitesItems( state ), site => {
		const planSlug = get( site, 'plan.product_slug' );
		return isBusinessPlan( planSlug ) || isEcommercePlan( planSlug );
	} );

	// Upwork is not available if the customer has a Business or eCommerce plan
	return hasBusinessOrEcommercePlan ? false : true;
}
