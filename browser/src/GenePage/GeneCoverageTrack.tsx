import React from 'react'

import { referenceGenome, isExac, coverageDatasetId } from '@gnomad/dataset-metadata/metadata'
import { coverageConfigClassic, coverageConfigNew } from '../coverageStyles'
import CoverageTrack from '../CoverageTrack'
import Query from '../Query'

const operationName = 'GeneCoverage'
const coverageQuery = `
query ${operationName}($geneId: String!, $datasetId: DatasetId!, $referenceGenome: ReferenceGenomeId!, $includeExomeCoverage: Boolean!, $includeGenomeCoverage: Boolean!) {
  gene(gene_id: $geneId, reference_genome: $referenceGenome) {
    coverage(dataset: $datasetId) {
      exome @include(if: $includeExomeCoverage) {
        pos
        mean
        median: median_approx
        over_1
        over_5
        over_10
        over_15
        over_20
        over_25
        over_30
        over_50
        over_100
      }
      genome @include(if: $includeGenomeCoverage) {
        pos
        mean
        median: median_approx
        over_1
        over_5
        over_10
        over_15
        over_20
        over_25
        over_30
        over_50
        over_100
      }
    }
  }
}
`
type OwnProps = {
  datasetId: string
  geneId: string
  includeExomeCoverage?: boolean
  includeGenomeCoverage?: boolean
}

// @ts-expect-error TS(2456) FIXME: Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof GeneCoverageTrack.defaultProps

// @ts-expect-error TS(7022) FIXME: 'GeneCoverageTrack' implicitly has type 'any' beca... Remove this comment to see the full error message
const GeneCoverageTrack = ({
  datasetId,
  geneId,
  includeExomeCoverage,
  includeGenomeCoverage,
}: Props) => {
  return (
    <Query
      operationName={operationName}
      query={coverageQuery}
      variables={{
        geneId,
        datasetId: coverageDatasetId(datasetId),
        referenceGenome: referenceGenome(coverageDatasetId(datasetId)),
        includeExomeCoverage,
        includeGenomeCoverage,
      }}
      loadingMessage="Loading coverage"
      loadingPlaceholderHeight={220}
      errorMessage="Unable to load coverage"
      success={(data: any) => {
        if (!data.gene || !data.gene.coverage) {
          return false
        }
        const exomeCoverage = includeExomeCoverage ? data.gene.coverage.exome : true
        const genomeCoverage = includeGenomeCoverage ? data.gene.coverage.genome : true
        return exomeCoverage || genomeCoverage
      }}
    >
      {({ data }: any) => {
        const exomeCoverage = includeExomeCoverage ? data.gene.coverage.exome : null
        const genomeCoverage = includeGenomeCoverage ? data.gene.coverage.genome : null

        const normalizeOverMetrics = (coverage: any, maxFraction: number) => {
            if (!coverage) return null
            
            return coverage.map((point: any) => ({
              ...point,
              over_1: point.over_1 / maxFraction,
              over_5: point.over_5 / maxFraction,
              over_10: point.over_10 / maxFraction,
              over_15: point.over_15 / maxFraction,
              over_20: point.over_20 / maxFraction,
              over_25: point.over_25 / maxFraction,
              over_30: point.over_30 / maxFraction,
              over_50: point.over_50 / maxFraction,
              over_100: point.over_100 / maxFraction,
            }))
          }

        const normalizedExomeCoverage = exomeCoverage 
        ? normalizeOverMetrics(exomeCoverage, 10671 / 11945) 
        : null
      
        const normalizedGenomeCoverage = genomeCoverage 
          ? normalizeOverMetrics(genomeCoverage, 2211 / 2515) 
          : null
            
        const coverageConfig = isExac(datasetId)
          ? coverageConfigClassic(exomeCoverage, genomeCoverage)
          : coverageConfigNew(normalizedExomeCoverage, normalizedGenomeCoverage)

        return (
          <CoverageTrack
            coverageOverThresholds={[1, 5, 10, 15, 20, 25, 30, 50, 100]}
            datasets={coverageConfig}
            filenameForExport={() => `${geneId}_coverage`}
            height={190}
            datasetId={datasetId}
          />
        )
      }}
    </Query>
  )
}

GeneCoverageTrack.defaultProps = {
  includeExomeCoverage: true,
  includeGenomeCoverage: true,
}

export default GeneCoverageTrack
