import { withCache } from '../cache'

import { assertDatasetAndReferenceGenomeMatch } from './helpers/validation-helpers'
import gnomadV4VariantQueries from './variant-datasets/gnomad-v4-variant-queries'
import exacVariantQueries from './variant-datasets/exac-variant-queries'

type QueryArgs = [any, any]

const datasetQueries: Record<string, any> = {
  gnomad_r4: {
    countVariantsInRegion: (...args: QueryArgs) =>
      gnomadV4VariantQueries.countVariantsInRegion(...args, 'all'),
    fetchVariantById: (...args: QueryArgs) =>
      gnomadV4VariantQueries.fetchVariantById(...args, 'all'),
    fetchVariantsByGene: (...args: QueryArgs) =>
      gnomadV4VariantQueries.fetchVariantsByGene(...args, 'all'),
    fetchVariantsByRegion: (...args: QueryArgs) =>
      gnomadV4VariantQueries.fetchVariantsByRegion(...args, 'all'),
    fetchVariantsByTranscript: (...args: QueryArgs) =>
      gnomadV4VariantQueries.fetchVariantsByTranscript(...args, 'all'),
    fetchMatchingVariants: (...args: QueryArgs) =>
      gnomadV4VariantQueries.fetchMatchingVariants(...args, 'all'),
  },
  ourdna: {
    countVariantsInRegion: (...args: QueryArgs) =>
      gnomadV4VariantQueries.countVariantsInRegion(...args, 'all'),
    fetchVariantById: (...args: QueryArgs) =>
      gnomadV4VariantQueries.fetchVariantById(...args, 'all'),
    fetchVariantsByGene: (...args: QueryArgs) =>
      gnomadV4VariantQueries.fetchVariantsByGene(...args, 'all'),
    fetchVariantsByRegion: (...args: QueryArgs) =>
      gnomadV4VariantQueries.fetchVariantsByRegion(...args, 'all'),
    fetchVariantsByTranscript: (...args: QueryArgs) =>
      gnomadV4VariantQueries.fetchVariantsByTranscript(...args, 'all'),
    fetchMatchingVariants: (...args: QueryArgs) =>
      gnomadV4VariantQueries.fetchMatchingVariants(...args, 'all'),
    fetchVariantsAgeDistribution: (...args: QueryArgs) =>
      gnomadV4VariantQueries.fetchVariantsAgeDistribution(...args),
  },
  exac: exacVariantQueries,
}

type DatasetId = keyof typeof datasetQueries

export const countVariantsInRegion = (esClient: any, datasetId: DatasetId, region: any) => {
  assertDatasetAndReferenceGenomeMatch(datasetId, region.reference_genome)

  const query = datasetQueries[datasetId].countVariantsInRegion
  return query(esClient, region)
}

export const fetchVariantById = (esClient: any, datasetId: DatasetId, variantIdOrRsid: any) => {
  const query = datasetQueries[datasetId].fetchVariantById
  return query(esClient, variantIdOrRsid)
}

const _fetchVariantsByGene = (esClient: any, datasetId: DatasetId, gene: any) => {
  assertDatasetAndReferenceGenomeMatch(datasetId, gene.reference_genome)

  const query = datasetQueries[datasetId].fetchVariantsByGene
  return query(esClient, gene)
}

export const fetchVariantsByGene = withCache(
  _fetchVariantsByGene,
  (_: any, datasetId: DatasetId, gene: any) => `variants:${datasetId}:gene:${gene.gene_id}`,
  { expiration: 604800 }
)

export const fetchVariantsByRegion = (esClient: any, datasetId: DatasetId, region: any) => {
  assertDatasetAndReferenceGenomeMatch(datasetId, region.reference_genome)

  const query = datasetQueries[datasetId].fetchVariantsByRegion
  return query(esClient, region)
}

const _fetchVariantsByTranscript = (esClient: any, datasetId: DatasetId, transcript: any) => {
  assertDatasetAndReferenceGenomeMatch(datasetId, transcript.reference_genome)

  const query = datasetQueries[datasetId].fetchVariantsByTranscript
  return query(esClient, transcript)
}
export const fetchVariantsByTranscript = withCache(
  _fetchVariantsByTranscript,
  (_: any, datasetId: DatasetId, transcript: any) =>
    `variants:${datasetId}:transcript:${transcript.transcript_id}`,
  { expiration: 3600 }
)

export const fetchMatchingVariants = (esClient: any, datasetId: DatasetId, search: any) => {
  const query = datasetQueries[datasetId].fetchMatchingVariants
  return query(esClient, search)
}

export const fetchVariantsAgeDistribution = (esClient: any, datasetId: DatasetId) => {
  const query = datasetQueries[datasetId].fetchVariantsAgeDistribution
  return query(esClient)
}
