// How to install Stratus on each OS. Everything here is built from the
// GoReleaser asset naming in the Stratus repo (.goreleaser.yaml), so bumping
// `stratusVersion` after a release is the only edit a new version needs.

export const stratusVersion = "0.2.0";

export type ReleaseOs = "Darwin" | "Linux" | "Windows";
export type ReleaseArch = "x86_64" | "arm64";

const releasesBase = "https://github.com/rmukubvu/stratus/releases";

export const releasesPage = `${releasesBase}/tag/v${stratusVersion}`;

/** The download URL of a release archive, e.g. stratus_0.2.0_Linux_x86_64.tar.gz. */
export function releaseAssetUrl(os: ReleaseOs, arch: ReleaseArch, version = stratusVersion): string {
  const ext = os === "Windows" ? "zip" : "tar.gz";
  return `${releasesBase}/download/v${version}/stratus_${version}_${os}_${arch}.${ext}`;
}

export type InstallOption = {
  /** Tab label. */
  os: "macOS" | "Linux" | "Windows";
  language: "sh" | "powershell";
  code: string;
  note: string;
};

export const installOptions: InstallOption[] = [
  {
    os: "macOS",
    language: "sh",
    code: "brew install rmukubvu/tap/stratus",
    note: "Homebrew, on Apple silicon or Intel.",
  },
  {
    os: "Linux",
    language: "sh",
    code: `curl -fsSL ${releaseAssetUrl("Linux", "x86_64")} | tar -xz stratus
sudo mv stratus /usr/local/bin/`,
    note: "On arm64, swap x86_64 for arm64 in the URL.",
  },
  {
    os: "Windows",
    language: "powershell",
    code: `Invoke-WebRequest ${releaseAssetUrl("Windows", "x86_64")} -OutFile stratus.zip
Expand-Archive stratus.zip "$HOME\\stratus"
$env:Path += ";$HOME\\stratus"`,
    note: "PowerShell. The last line adds Stratus to PATH for this window. On arm64, swap x86_64 for arm64.",
  },
];
