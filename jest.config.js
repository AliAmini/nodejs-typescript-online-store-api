/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  "moduleNameMapper": {
    "@middlewares/(.*)": "<rootDir>/src/middlewares/$1",
    "@services/(.*)": "<rootDir>/src/services/$1",
    "@helpers/(.*)": "<rootDir>/src/helpers/$1",
    "@models/(.*)": "<rootDir>/src/models/$1",
    "@controllers/(.*)": "<rootDir>/src/controllers/$1",
    "@mytypes/(.*)": "<rootDir>/src/@types/$1",
    "@routes/(.*)": "<rootDir>/src/api/v1/$1",
    "@src/(.*)": "<rootDir>/src/$1"
  },

  "moduleFileExtensions": ["js", "json", "jsx", "ts", "tsx", "node"]
};