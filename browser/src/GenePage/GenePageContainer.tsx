import React from 'react'

import {
  DatasetId,
  referenceGenome,
  hasShortTandemRepeats,
} from '@gnomad/dataset-metadata/metadata'
import Delayed from '../Delayed'
import DocumentTitle from '../DocumentTitle'
import { BaseQuery } from '../Query'
import StatusMessage from '../StatusMessage'

import GeneNotFound from './GeneNotFound'
import GenePage, { Gene } from './GenePage'

const operationName = 'Gene'

const query = `
query ${operationName}($geneId: String, $geneSymbol: String, $referenceGenome: ReferenceGenomeId!, $shortTandemRepeatDatasetId: DatasetId!, $includeShortTandemRepeats: Boolean!) {
  gene(gene_id: $geneId, gene_symbol: $geneSymbol, reference_genome: $referenceGenome) {
    reference_genome
    gene_id
    gene_version
    symbol
    gencode_symbol
    name
    canonical_transcript_id
    mane_select_transcript {
      ensembl_id
      ensembl_version
      refseq_id
      refseq_version
    }
    hgnc_id
    ncbi_id
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
    transcripts {
      transcript_id
      transcript_version
      strand
      exons {
        feature_type
        start
        stop
      }
      gtex_tissue_expression {
        tissue
        value
      }
    }
    pext {
      regions {
        start
        stop
        mean
        tissues {
          tissue
          value
        }
      }
      flags
    }
    exac_regional_missense_constraint_regions {
      start
      stop
      obs_mis
      exp_mis
      obs_exp
      chisq_diff_null
    }
    gnomad_v2_regional_missense_constraint {
      passed_qc
      has_no_rmc_evidence
      regions {
        chrom
        start
        stop
        aa_start
        aa_stop
        obs_mis
        exp_mis
        obs_exp
        chisq_diff_null
        p_value
      }
    }
    short_tandem_repeats(dataset: $shortTandemRepeatDatasetId) @include(if: $includeShortTandemRepeats) {
      id
    }
    heterozygous_variant_cooccurrence_counts {
      csq
      af_cutoff
      data {
        two_het_total
	in_cis
	in_trans
	unphased
      }
    }
  }
}
`

type Props = {
  datasetId: DatasetId
  geneIdOrSymbol: string
}

const GenePageContainer = ({ datasetId, geneIdOrSymbol }: Props) => {
  const variables = {
    [geneIdOrSymbol.startsWith('ENSG') ? 'geneId' : 'geneSymbol']: geneIdOrSymbol,
    referenceGenome: referenceGenome(datasetId),
    shortTandemRepeatDatasetId: 'gnomad_r3',
    includeShortTandemRepeats: hasShortTandemRepeats(datasetId),
  }

  return (
    <BaseQuery operationName={operationName} query={query} variables={variables}>
      {({ data, error, graphQLErrors, loading }: any) => {
        if (loading) {
          return (
            <Delayed>
              <StatusMessage>Loading gene</StatusMessage>
            </Delayed>
          )
        }

        if (error) {
          return <StatusMessage>Unable to load gene</StatusMessage>
        }

        if (!data || !data.gene) {
          if (graphQLErrors && graphQLErrors.some((e: any) => e.message === 'Gene not found')) {
            return (
              <>
                <DocumentTitle title="Not found" />
                <GeneNotFound geneIdOrSymbol={geneIdOrSymbol} datasetId={datasetId} />
              </>
            )
          }

          return (
            <StatusMessage>
              {graphQLErrors && graphQLErrors.length
                ? Array.from(new Set(graphQLErrors.map((e: any) => e.message))).join(', ')
                : 'Unable to load gene'}
            </StatusMessage>
          )
        }

        const gene: Gene = { ...data.gene }
        return <GenePage datasetId={datasetId} gene={gene} geneId={data.gene.gene_id} />
      }}
    </BaseQuery>
  )
}

export default GenePageContainer
