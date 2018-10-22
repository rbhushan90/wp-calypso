/** @format */
/**
 * Internal Dependencies
 */
import { fetch, onSuccess } from '../';
import { http } from 'state/data-layer/wpcom-http/actions';
import { requestChartCounts, receiveChartCounts } from 'state/stats/chart-tabs/actions';

describe( 'fetch', () => {
	it( 'should dispatch http requests corresponding to the number of stat fields', () => {
		const action = requestChartCounts( {
			date: '2100-01-01',
			period: 'day',
			quantity: 10,
			siteId: 1,
			statFields: [ 'views', 'visitors' ],
		} );
		const output = fetch( action );
		expect( output ).toHaveLength( 2 );
		expect( output ).toEqual( [
			http(
				{
					method: 'GET',
					path: `/sites/1/stats/visits`,
					apiVersion: '1.1',
					query: {
						unit: 'day',
						date: '2100-01-01',
						quantity: 10,
						stat_fields: 'views',
					},
				},
				action
			),
			http(
				{
					method: 'GET',
					path: `/sites/1/stats/visits`,
					apiVersion: '1.1',
					query: {
						unit: 'day',
						date: '2100-01-01',
						quantity: 10,
						stat_fields: 'visitors',
					},
				},
				action
			),
		] );
	} );
} );

describe( 'onSuccess', () => {
	test( 'should return a receiveChartCounts action with a transformed API response', () => {
		const data = {
			1: {
				year: [
					{
						period: '2018-09-20',
						views: 247,
						labelDay: 'Sep 20',
						classNames: [],
					},
				],
			},
		};
		const output = onSuccess( { siteId: 1, period: 'year' }, data );
		expect( output ).toEqual( receiveChartCounts( 1, 'year', data ) );
	} );
} );