import { expandInputs } from './inputs-utils';

describe('inputs-utils', () => {
  it('should return empty object if workspace files are empty ', () => {
    expect(
      expandInputs(['{workspaceRoot}/**'], [], {} as any, 'nx:build')
    ).toEqual({});
  });

  it('should return files that match workspaceRoot', () => {
    expect(
      expandInputs(
        ['{workspaceRoot}/**'],
        [
          {
            file: 'apps/app/src/main.ts',
            hash: 'hash',
          },
        ],
        {} as any,
        'nx:build'
      )
    ).toEqual({
      general: { '{workspaceRoot}/**': ['apps/app/src/main.ts'] },
    });
  });

  it('should return files that match projectRoot', () => {
    expect(
      expandInputs(
        ['{projectRoot}/**/*'],
        [],
        {
          projects: [{ name: 'nx', data: { root: 'nx' } }],
          fileMap: {
            nx: [
              {
                file: 'nx/src/main.ts',
                hash: 'hash',
              },
            ],
          },
        } as any,
        'nx:build'
      )
    ).toEqual({ nx: { '{projectRoot}/**/*': ['nx/src/main.ts'] } });
  });

  it('should return files that match projectRoot with project name', () => {
    expect(
      expandInputs(
        ['lib1:{projectRoot}/**/*'],
        [],
        {
          projects: [{ name: 'lib1', data: { root: 'lib1' } }],
          fileMap: {
            lib1: [
              {
                file: 'lib1/src/main.ts',
                hash: 'hash',
              },
            ],
          },
        } as any,
        'nx:build'
      )
    ).toEqual({ lib1: { '{projectRoot}/**/*': ['lib1/src/main.ts'] } });
  });
});
