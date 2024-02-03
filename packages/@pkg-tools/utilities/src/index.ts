import path from 'node:path';
import jiti from 'jiti';

import { type PkgToolsConfig } from '@pkg-tools/config';

export function resolvePkgToolsConfig() {
  const rootDir = path.resolve(process.cwd(), '.');

  const pkgToolsConfig: PkgToolsConfig =
    tryRequire('./pkg-tools.config', rootDir) || {};

  return pkgToolsConfig;
}

function tryRequire(id: string, rootDir: string = process.cwd()) {
  const _require = jiti(rootDir, { interopDefault: true, esmResolve: true });
  try {
    return _require(id);
  } catch (error: unknown) {
    //@ts-ignore
    if (error.code !== 'MODULE_NOT_FOUND') {
      console.error(`Error trying import ${id} from ${rootDir}`, error);
    }
    return {};
  }
}
