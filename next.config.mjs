/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.pdf$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      });
      return config;
    },
    output: 'export',
};

export default nextConfig;
