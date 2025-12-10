import React from 'react'
import { Redirect } from 'react-router-dom'

import {
  DatasetId,
  referenceGenome,
  hasStructuralVariants,
} from '@gnomad/dataset-metadata/metadata'
import Query from '../Query'
import TranscriptPage from './TranscriptPage'

const operationName = 'Transcript'
const query = `
query ${operationName}($transcriptId: String!, $referenceGenome: ReferenceGenomeId!) {
  transcript(transcript_id: $transcriptId, reference_genome: $referenceGenome) {
    reference_genome
    transcript_id
    transcript_version
    chrom
    strand
    start
    stop
    exons {
      feature_type
      start
      stop
    }
    exac_constraint {
      exp_syn
      obs_syn
      syn_z
      exp_mis
      obs_mis
      mis_z
      exp_lof
      obs_lof
      lof_z
      pLI
    }
    gene {
      gene_id
      gene_version
      reference_genome
      symbol
      name
      canonical_transcript_id
      mane_select_transcript {
        ensembl_id
        ensembl_version
        refseq_id
        refseq_version
      }
      hgnc_id
      omim_id
      chrom
      start
      stop
      strand
      exons {
        feature_type
        start
        stop
      }
      flags
    }
  }
}
`

type Props = {
  datasetId: DatasetId
  transcriptId: string
}

const TranscriptPageContainer = ({ datasetId, transcriptId }: Props) => (
  <Query
    operationName={operationName}
    query={query}
    variables={{ transcriptId, referenceGenome: referenceGenome(datasetId) }}
    loadingMessage="Loading transcript"
    errorMessage="Unable to load transcript"
    success={(data: any) => data.transcript}
  >
    {({ data }: any) => {
      const { transcript } = data

      // Cannot query structural variants by transcript, redirect to gene page
      if (hasStructuralVariants(datasetId)) {
        return <Redirect to={`/gene/${transcript.gene.gene_id}?dataset=${datasetId}`} />
      }

      return <TranscriptPage datasetId={datasetId} transcript={transcript} />
    }}
  </Query>
)

export default TranscriptPageContainer
