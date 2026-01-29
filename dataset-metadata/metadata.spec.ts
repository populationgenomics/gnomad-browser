import { test, expect } from '@jest/globals'
import { DatasetId, ReferenceGenome, referenceGenome } from './metadata'
import { forAllDatasets } from '../tests/__helpers__/datasets'

{/* @ts-expect-error TS(TS2740) FIXME: Type '{ ourdna: "GRCh38"; }' is missing the following properties. */}
const expectedReferenceGenome: Record<DatasetId, ReferenceGenome> = {
  ourdna: 'GRCh38',
}

forAllDatasets('referenceGenome(%s)', (datasetId) => {
  const expectedResult = expectedReferenceGenome[datasetId]
  test(`${datasetId} uses reference genome ${expectedResult}`, () =>
    expect(referenceGenome(datasetId)).toEqual(expectedResult))
})
