/**
 * This file sets you up with structure needed for an ESLint rule.
 *
 * It leverages utilities from @typescript-eslint to allow TypeScript to
 * provide autocompletions etc for the configuration.
 *
 * Your rule's custom logic will live within the create() method below
 * and you can learn more about writing ESLint rules on the official guide:
 *
 * https://eslint.org/docs/developer-guide/working-with-rules
 *
 * You can also view many examples of existing rules here:
 *
 * https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/src/rules
 */

import { ESLintUtils } from '@typescript-eslint/utils';
import { dirname, join, normalize, resolve } from 'path';

// NOTE: The rule will be available in ESLint configs as "@nx/workspace-only-wrapped-native-imports"
export const RULE_NAME = 'only-wrapped-native-imports';

export const rule = ESLintUtils.RuleCreator(() => __filename)({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: ``,
      recommended: 'recommended',
    },
    schema: [],
    messages: {
      invalidImport:
        "Direct imports from 'nx/src/native' are not allowed. Use 'nx/src/native/import' instead.",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      ImportDeclaration(node) {
        const importPath = node.source.value;
        if (isInvalidImport(importPath, context.physicalFilename)) {
          context.report({
            node,
            messageId: 'invalidImport',
          });
        }
      },
    };
  },
});

function isInvalidImport(importPath: string, fileName: string): boolean {
  const regex = /nx[\/\\]src[\/\\]native([\/\\]index(\.js)?)?$/;
  if (importPath.startsWith('.') || importPath.startsWith('..')) {
    const absolutePath = resolve(dirname(fileName), importPath);
    const normalizedPath = normalize(absolutePath);

    return regex.test(normalizedPath)
  }
  return regex.test(importPath)
}
