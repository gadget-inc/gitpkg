import execa from 'execa';
import { normalisePackageNameNpm } from './normalise-package-name';

export default function getGitTagName(pkg, config) {
  const gitpkgPackageName = config.getTagName(pkg);
  return gitpkgPackageName;
}

/**
 * Returns the default tag name. This function can be replaced in the config file.
 * @param {object} pkg The package.json object.
 */
export function defaultTagNameFormat(pkg) {
  let gitSha = undefined;
  try {
    const { stdout } = execa.sync("git rev-parse --short HEAD", { encoding: "utf-8" })
    gitSha = stdout.trim()
  } catch (error) {
  }

  let tag = `${normalisePackageNameNpm(pkg.name)}-v${pkg.version}-gitpkg`;

  if (gitSha) {
    tag = `${tag}-${gitSha}`
  }

  return tag;
}
