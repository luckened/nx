import { existsSync, removeSync, rmSync } from 'fs-extra';
import { tmpdir } from 'os';
import { join } from 'path';

export const nativeFileCacheLocation = join(tmpdir(), 'nx-native-cache');

export function cleanupNativeFileCache() {
  if (!existsSync(nativeFileCacheLocation)) {
    return;
  }
  try {
    rmSync(nativeFileCacheLocation, {
      recursive: true,
      force: true,
    });
  } catch (e) {
    // it's not critical if the cache can't be deleted, we don't want to surface errors here
  }
}
