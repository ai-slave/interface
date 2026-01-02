const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	transpilePackages: ['@base-org/account'],
	webpack: (config) => {
		config.resolve.fallback = {
			...config.resolve.fallback,
			'@react-native-async-storage/async-storage': false
		};
		return config;
	},
	staticPageGenerationTimeout: 1000,
	images: {
		unoptimized: true, // for cloudflare pages
		domains: ['icons.llama.fi', 'assets.coingecko.com', 'icons.llamao.fi']
	},
	compiler: {
		styledComponents: true
	},
	async headers() {
		return [
			{
				source: '/:path*',
				headers: [
					{
						key: 'Access-Control-Allow-Origin',
						value: '*'
					},
					{
						key: 'Access-Control-Allow-Methods',
						value: 'GET'
					},
					{
						key: 'Access-Control-Allow-Headers',
						value: 'X-Requested-With, content-type, Authorization'
					}
				]
			}
		];
	},
	experimental: {},
	webpack: (config) => {
		config.resolve.fallback = {
			...config.resolve.fallback,
			// MetaMask SDK imports this React Native module but doesn't need it in browser environments
			'@react-native-async-storage/async-storage': false
		};
		return config;
	}
};

module.exports = withBundleAnalyzer(nextConfig);
