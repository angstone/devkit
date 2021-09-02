/* tslint:disable:no-implicit-dependencies */
/* tslint:disable:no-unused-expression */
/* tslint:disable:no-reference */
/* tslint:disable:no-console */
// <reference path="../../../types/chai-like/index.d.ts" />
// <reference path="../../../tsconfig.json" />
import { expect } from 'chai';
// import chalk from 'chalk'
import { fake } from 'sinon';
import { SICacheRead } from '../../interfaces';
import { cacheFetcher } from './cache-fetcher.tools';

describe('CacheFetcher', () => {
	it('should exist and get fetcher', () => {
		const fetcher = cacheFetcher.getFetcher();
		expect(fetcher).to.be.exist;
	});

	it('should work as expected by default', async () => {
		const storeFunc = fake();
		const cachedFetcher = cacheFetcher.getFetcher<string>();
		const value = await cachedFetcher.get({
			cacheOptions: undefined,
			fetcher: async (): Promise<string> => {
				return 'foo';
			},
			storeHard: async (dataRead: SICacheRead<string>) => {
				storeFunc('bar');
			},
			readHard: async (): Promise<SICacheRead<string> | undefined> => {
				// const cacheRead: SICacheRead<string> = {
				// 	data: 'baz',
				// 	updatedAt: Date.now() - 200,
				// };
				// return cacheRead;
				return undefined;
			},
		});
		expect(value).to.be.equals('foo');
		await new Promise(r => setImmediate(r));
		expect(storeFunc).to.have.been.calledWith('bar');
	});

	it('should work as expected from=none to=none and expiration any', async () => {
		const storeFunc = fake();
		const cachedFetcher = cacheFetcher.getFetcher<string>({
			fromCache: 'none',
			toCache: 'none',
			expiration: 30 * 60 * 1000,
		});
		const value = await cachedFetcher.get({
			cacheOptions: undefined,
			fetcher: async (): Promise<string> => {
				return 'foo';
			},
			storeHard: async (dataRead: SICacheRead<string>) => {
				storeFunc('bar');
			},
			readHard: async (): Promise<SICacheRead<string> | undefined> => {
				const cacheRead: SICacheRead<string> = {
					data: 'baz',
					updatedAt: Date.now() - 200,
				};
				return cacheRead;
				// return undefined
			},
		});
		expect(value).to.be.equals('foo');
		await new Promise(r => setImmediate(r));
		expect(storeFunc).to.not.have.been.called;
	});

	it('should work as expected from=none to=hard and expiration any', async () => {
		const storeFunc = fake();
		const cachedFetcher = cacheFetcher.getFetcher<string>({
			fromCache: 'none',
			toCache: 'none',
			expiration: 30 * 60 * 1000,
		});
		const value = await cachedFetcher.get({
			cacheOptions: {
				toCache: 'hard',
			},
			fetcher: async (): Promise<string> => {
				return 'foo';
			},
			storeHard: async (dataRead: SICacheRead<string>) => {
				storeFunc('bar');
			},
			readHard: async (): Promise<SICacheRead<string> | undefined> => {
				const cacheRead: SICacheRead<string> = {
					data: 'baz',
					updatedAt: Date.now() - 200,
				};
				return cacheRead;
				// return undefined
			},
		});
		expect(value).to.be.equals('foo');
		await new Promise(r => setImmediate(r));
		expect(storeFunc).to.have.been.calledWith('bar');
	});

	it('should work as expected from=none to=hard and expiration any the second time', async () => {
		const storeFunc = fake();
		const storeFunc2 = fake();
		const cachedFetcher = cacheFetcher.getFetcher<string>({
			fromCache: 'none',
			toCache: 'none',
			expiration: 30 * 60 * 1000,
		});
		const value = await cachedFetcher.get({
			cacheOptions: {
				toCache: 'hard',
			},
			fetcher: async (): Promise<string> => {
				return 'foo';
			},
			storeHard: async (dataRead: SICacheRead<string>) => {
				storeFunc('bar');
			},
			readHard: async (): Promise<SICacheRead<string> | undefined> => {
				const cacheRead: SICacheRead<string> = {
					data: 'baz',
					updatedAt: Date.now() - 200,
				};
				return cacheRead;
			},
		});

		const value2 = await cachedFetcher.get({
			cacheOptions: {
				toCache: 'hard',
			},
			fetcher: async (): Promise<string> => {
				return 'foo';
			},
			storeHard: async (dataRead: SICacheRead<string>) => {
				storeFunc2('zic');
			},
			readHard: async (): Promise<SICacheRead<string> | undefined> => {
				const cacheRead: SICacheRead<string> = {
					data: 'baz',
					updatedAt: Date.now() - 200,
				};
				return cacheRead;
			},
		});
		expect(value).to.be.equals('foo');
		await new Promise(r => setImmediate(r));
		expect(storeFunc2).to.have.been.calledWith('zic');
	});
});
