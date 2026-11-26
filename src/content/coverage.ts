// Operation coverage as the Stratus repo measures it. Copy the numbers from the
// headline of docs/coverage/README.md (written by scripts/models/coverage.py)
// whenever it changes; never round or estimate them here.

export type OperationCoverage = {
  /** Operations Stratus implements across the services it emulates. */
  implemented: number;
  /** Operations AWS defines for those same services, per the botocore models. */
  defined: number;
  /** The botocore release the catalogue is generated from (scripts/models/requirements.txt). */
  botocoreVersion: string;
};

export const operationCoverage: OperationCoverage = {
  implemented: 510,
  defined: 3306,
  botocoreVersion: "1.44.11",
};

const thousands = new Intl.NumberFormat("en-US");

/** "510 of 3,306", the way the coverage page states it. */
export function coverageFraction({ implemented, defined }: OperationCoverage = operationCoverage): string {
  return `${thousands.format(implemented)} of ${thousands.format(defined)}`;
}

/** Operations AWS defines that Stratus answers with 501 NotImplemented. */
export function notImplementedCount({ implemented, defined }: OperationCoverage = operationCoverage): number {
  return defined - implemented;
}
