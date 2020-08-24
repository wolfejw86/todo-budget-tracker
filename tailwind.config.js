
module.exports = {
  purge: {
    enabled: true,
    content: ['./client/**/*.html',
      './imports/**/*.jsx',
      './client/**/*.jsx',
    ],
    options: {
      whitelist: [
        'bg-yellow-200',
        'bg-red-200',
        'bg-green-200',
        'bg-purple-200',
        'bg-blue-200',
        'bg-orange-300'
      ],
    }
  },
  theme: {},
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
  },
};
