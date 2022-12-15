import { differenceBy, chunk } from "lodash";

export function makeChunksDifference(
  sideA: any[],
  sideB: any[],
  key: string,
  chunkSize: number,
  transformPromise: (item: any) => Promise<any>
) {
  const difference = differenceBy(sideA, sideB, key);
  const chunkedDifference = chunk(difference.map(transformPromise), chunkSize);

  return chunkedDifference;
}
