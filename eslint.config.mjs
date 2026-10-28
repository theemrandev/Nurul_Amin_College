import nextConfig from 'eslint-config-next';

const eslintConfig = [
  ...nextConfig,
  {
    ignores: [
      'slick-1.8.1/**',
      'js/**',
      'test/**',
      'scripts/**',
      '.next/**',
      'out/**',
      'node_modules/**',
    ],
  },
];

export default eslintConfig;
