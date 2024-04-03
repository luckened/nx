import { TSESLint } from '@typescript-eslint/utils';
import { rule, RULE_NAME } from './only-wrapped-native-imports';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});


ruleTester.run(RULE_NAME, rule, {
  valid: [
    {
      code: `import something from 'nx/src/native/import';`,
      filename: 'project/path/to/file/validFile.js', 
    },
    {
      code: `import something from 'nx/src/native/import';`,
      filename: 'project/path/to/file/validFile.ts', 
    },
    {
      code: `import something from 'nx/src/native/other-entry-point';`,
      filename: 'project/path/to/file/validFile.ts', 
    },
  ],
  invalid: [
    {
      code: `import nativeThing from 'nx/src/native';`,
      errors: [{ messageId: 'invalidImport' }],
      filename: 'project/path/to/file/invalidFile1.ts',
    },
    {
      code: `import nativeThing from 'nx/src/native';`,
      errors: [{ messageId: 'invalidImport' }],
      filename: 'project/path/to/file/invalidFile2.js',
    },
    {
      code: `import indexThing from 'nx/src/native/index';`,
      errors: [{ messageId: 'invalidImport' }],
      filename: 'project/path/to/file/invalidFile3.ts', 
    },
    {
      code: `import relativeNative from '../native';`, 
      errors: [{ messageId: 'invalidImport' }],
      filename: 'packages/nx/src/nested/relativeImport.ts', 
    },
    {
      code: `import relativeNative from '../../native';`, 
      errors: [{ messageId: 'invalidImport' }],
      filename: 'packages/nx/src/nested/utils/relativeImport.ts', 
    },
    {
      code: `import relativeNative from './native';`, 
      errors: [{ messageId: 'invalidImport' }],
      filename: 'packages/nx/src/relativeImport.ts', 
    },
  ],
});