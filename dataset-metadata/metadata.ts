export type ReferenceGenome = 'GRCh37' | 'GRCh38'

export const datasetLabels = {
  gnomad_sv_r4: 'gnomAD SVs v4.1.0',
  gnomad_cnv_r4: 'gnomAD CNVs v4.1.0',
  gnomad_r4: 'gnomAD v4.1.0',
  ourdna: 'OurDNA v1.0',
} as const
export type DatasetId = keyof typeof datasetLabels

export const allDatasetIds = Object.getOwnPropertyNames(datasetLabels) as DatasetId[]

export type DatasetMetadata = {
  referenceGenome: ReferenceGenome
  isSubset: boolean
  hasShortVariants: boolean
  hasStructuralVariants: boolean
  hasCopyNumberVariants: boolean
  hasCopyNumberVariantCoverage: boolean
  hasConstraints: boolean
  hasVariantCoocurrence: boolean
  hasNonCodingConstraints: boolean
  hasExome: boolean
  genesHaveExomeCoverage: boolean
  genesHaveGenomeCoverage: boolean
  transcriptsHaveExomeCoverage: boolean
  regionsHaveExomeCoverage: boolean
  regionsHaveGenomeCoverage: boolean
  hasLocalAncestryPopulations: boolean
  isLiftoverSource: boolean
  isLiftoverTarget: boolean
  isV3Subset: boolean
  usesGrch37: boolean
  usesGrch38: boolean
  isV2: boolean
  isV3: boolean
  isV4: boolean
  isExac: boolean
  isSVs: boolean
  isV4SVs: boolean
  isV4CNVs: boolean
  hasV2Genome: boolean
  metricsIncludeLowQualityGenotypes: boolean
  has1000GenomesPopulationFrequencies: boolean
  hasAlleleBalance: boolean
  hasRelatedVariants: boolean
  showAllIndividualsInAgeDistributionByDefault: boolean
  hasExons: boolean
  hasShortTandemRepeats: boolean
  hasMitochondrialGenomeCoverage: boolean
  hasMitochondrialVariants: boolean
  hasNonCodingReadData: boolean
  readsDatasetId: string
  readsIncludeLowQualityGenotypes: boolean
  coverageDatasetId: DatasetId
  variantFeedbackDescription: string | null
  shortVariantDatasetId: DatasetId
  structuralVariantDatasetId: DatasetId
  copyNumberVariantDatasetId: DatasetId
  hasJointFrequencyData: boolean
  hasVRSData: boolean
}

const metadata: Record<DatasetId, DatasetMetadata> = {
  gnomad_sv_r4: {
    isSubset: false,
    hasConstraints: true,
    hasVariantCoocurrence: false,
    hasNonCodingConstraints: true,
    hasExome: false,
    genesHaveExomeCoverage: false,
    genesHaveGenomeCoverage: true,
    transcriptsHaveExomeCoverage: false,
    regionsHaveExomeCoverage: false,
    regionsHaveGenomeCoverage: true,
    hasShortVariants: false,
    hasStructuralVariants: true,
    hasCopyNumberVariants: false,
    hasLocalAncestryPopulations: true,
    isLiftoverSource: false,
    isLiftoverTarget: false,
    referenceGenome: 'GRCh38',
    usesGrch37: false,
    usesGrch38: true,
    isV3Subset: false,
    isV2: false,
    isV3: false,
    isV4: true,
    isExac: false,
    isSVs: true,
    hasV2Genome: false,
    metricsIncludeLowQualityGenotypes: false,
    has1000GenomesPopulationFrequencies: false,
    hasAlleleBalance: true,
    hasRelatedVariants: true,
    showAllIndividualsInAgeDistributionByDefault: true,
    hasExons: false,
    hasShortTandemRepeats: true,
    hasMitochondrialGenomeCoverage: true,
    hasMitochondrialVariants: true,
    hasNonCodingReadData: true,
    readsDatasetId: 'gnomad_sv_r4',
    readsIncludeLowQualityGenotypes: false,
    coverageDatasetId: 'gnomad_r4',
    variantFeedbackDescription: 'gnomAD v3',
    isV4SVs: true,
    shortVariantDatasetId: 'gnomad_r4',
    structuralVariantDatasetId: 'gnomad_sv_r4',
    isV4CNVs: false,
    copyNumberVariantDatasetId: 'gnomad_cnv_r4',
    hasCopyNumberVariantCoverage: false,
    hasJointFrequencyData: true,
    hasVRSData: false,
  },
  gnomad_cnv_r4: {
    isSubset: false,
    hasConstraints: true,
    hasVariantCoocurrence: false,
    hasNonCodingConstraints: false,
    hasExome: true,
    genesHaveExomeCoverage: true,
    genesHaveGenomeCoverage: false,
    transcriptsHaveExomeCoverage: true,
    regionsHaveExomeCoverage: true,
    regionsHaveGenomeCoverage: false,
    hasShortVariants: false,
    hasStructuralVariants: false,
    hasCopyNumberVariants: true,
    hasLocalAncestryPopulations: false,
    isLiftoverSource: false,
    isLiftoverTarget: false,
    referenceGenome: 'GRCh38',
    usesGrch37: true,
    usesGrch38: false,
    isV3Subset: false,
    isV2: false,
    isV3: false,
    isV4: true,
    isExac: false,
    isSVs: false,
    hasV2Genome: false,
    metricsIncludeLowQualityGenotypes: false,
    has1000GenomesPopulationFrequencies: false,
    hasAlleleBalance: true,
    hasRelatedVariants: true,
    showAllIndividualsInAgeDistributionByDefault: true,
    hasExons: true,
    hasShortTandemRepeats: false,
    hasMitochondrialGenomeCoverage: true,
    hasMitochondrialVariants: true,
    hasNonCodingReadData: true,
    readsDatasetId: 'gnomad_cnv_r4',
    readsIncludeLowQualityGenotypes: false,
    coverageDatasetId: 'gnomad_r4',
    variantFeedbackDescription: 'gnomAD v4',
    isV4SVs: false,
    shortVariantDatasetId: 'gnomad_r4',
    structuralVariantDatasetId: 'gnomad_sv_r4',
    isV4CNVs: true,
    copyNumberVariantDatasetId: 'gnomad_cnv_r4',
    hasCopyNumberVariantCoverage: true,
    hasJointFrequencyData: true,
    hasVRSData: false,
  },
  gnomad_r4: {
    isSubset: false,
    hasConstraints: true,
    hasVariantCoocurrence: false,
    hasNonCodingConstraints: true,
    hasExome: true,
    genesHaveExomeCoverage: true,
    genesHaveGenomeCoverage: true,
    transcriptsHaveExomeCoverage: true,
    regionsHaveExomeCoverage: true,
    regionsHaveGenomeCoverage: true,
    hasShortVariants: true,
    hasStructuralVariants: false,
    hasCopyNumberVariants: false,
    hasLocalAncestryPopulations: true,
    isLiftoverSource: false,
    isLiftoverTarget: true,
    referenceGenome: 'GRCh38',
    usesGrch37: false,
    usesGrch38: true,
    isV3Subset: false,
    isV2: false,
    isV3: false,
    isV4: true,
    isExac: false,
    isSVs: false,
    hasV2Genome: false,
    metricsIncludeLowQualityGenotypes: false,
    has1000GenomesPopulationFrequencies: false,
    hasAlleleBalance: true,
    hasRelatedVariants: true,
    showAllIndividualsInAgeDistributionByDefault: true,
    hasExons: true,
    hasShortTandemRepeats: true,
    hasMitochondrialGenomeCoverage: true,
    hasMitochondrialVariants: true,
    hasNonCodingReadData: true,
    readsDatasetId: 'gnomad_r4',
    readsIncludeLowQualityGenotypes: false,
    coverageDatasetId: 'gnomad_r4',
    variantFeedbackDescription: 'gnomAD v4',
    isV4SVs: false,
    shortVariantDatasetId: 'gnomad_r4',
    structuralVariantDatasetId: 'gnomad_sv_r4',
    isV4CNVs: false,
    copyNumberVariantDatasetId: 'gnomad_cnv_r4',
    hasCopyNumberVariantCoverage: false,
    hasJointFrequencyData: true,
    hasVRSData: true,
  },
  ourdna: {
    isSubset: true,
    hasConstraints: true,
    hasVariantCoocurrence: false,
    hasNonCodingConstraints: false,
    hasExome: true,
    genesHaveExomeCoverage: true,
    genesHaveGenomeCoverage: true,
    transcriptsHaveExomeCoverage: true,
    regionsHaveExomeCoverage: true,
    regionsHaveGenomeCoverage: true,
    hasShortVariants: true,
    hasStructuralVariants: false,
    hasCopyNumberVariants: false,
    hasLocalAncestryPopulations: false, // Do not have for OurDNA
    isLiftoverSource: false,
    isLiftoverTarget: false, // Not needed for OurDNA
    referenceGenome: 'GRCh38',
    usesGrch37: false,
    usesGrch38: true,
    isV3Subset: false,
    isV2: false,
    isV3: false,
    isV4: true,
    isExac: false,
    isSVs: false,
    hasV2Genome: false,
    metricsIncludeLowQualityGenotypes: false,
    has1000GenomesPopulationFrequencies: false,
    hasAlleleBalance: true,
    hasRelatedVariants: true,
    showAllIndividualsInAgeDistributionByDefault: true,
    hasExons: true,
    hasShortTandemRepeats: false,
    hasMitochondrialGenomeCoverage: false,
    hasMitochondrialVariants: false,
    hasNonCodingReadData: true,
    readsDatasetId: 'gnomad_r4',
    readsIncludeLowQualityGenotypes: false,
    coverageDatasetId: 'gnomad_r4',
    variantFeedbackDescription: 'gnomAD v4',
    isV4SVs: false,
    shortVariantDatasetId: 'ourdna',
    structuralVariantDatasetId: 'gnomad_sv_r4',
    isV4CNVs: false,
    copyNumberVariantDatasetId: 'gnomad_cnv_r4',
    hasCopyNumberVariantCoverage: false,
    hasJointFrequencyData: true,
    hasVRSData: false,
  },
}

const getMetadata = <T extends keyof DatasetMetadata>(
  datasetId: DatasetId,
  fieldName: T
): DatasetMetadata[T] => {
  return metadata[datasetId][fieldName]
}

export const isSubset = (datasetId: DatasetId) => getMetadata(datasetId, 'isSubset')

export const labelForDataset = (datasetId: DatasetId) => datasetLabels[datasetId]

export const hasConstraints = (datsetId: DatasetId) => getMetadata(datsetId, 'hasConstraints')

export const hasVariantCoocurrence = (datasetId: DatasetId) =>
  getMetadata(datasetId, 'hasVariantCoocurrence')

export const hasNonCodingConstraints = (datasetId: DatasetId) =>
  getMetadata(datasetId, 'hasNonCodingConstraints')

export const hasExome = (datsetId: DatasetId) => getMetadata(datsetId, 'hasExome')

export const genesHaveExomeCoverage = (datsetId: DatasetId) =>
  getMetadata(datsetId, 'genesHaveExomeCoverage')

export const genesHaveGenomeCoverage = (datsetId: DatasetId) =>
  getMetadata(datsetId, 'genesHaveGenomeCoverage')

export const transcriptsHaveExomeCoverage = (datsetId: DatasetId) =>
  getMetadata(datsetId, 'transcriptsHaveExomeCoverage')

export const regionsHaveExomeCoverage = (datsetId: DatasetId) =>
  getMetadata(datsetId, 'regionsHaveExomeCoverage')

export const regionsHaveGenomeCoverage = (datsetId: DatasetId) =>
  getMetadata(datsetId, 'regionsHaveGenomeCoverage')

export const hasShortVariants = (datasetId: DatasetId) => getMetadata(datasetId, 'hasShortVariants')

export const hasStructuralVariants = (datasetId: DatasetId) =>
  getMetadata(datasetId, 'hasStructuralVariants')

export const hasCopyNumberVariants = (datasetId: DatasetId) =>
  getMetadata(datasetId, 'hasCopyNumberVariants')

export const hasLocalAncestryPopulations = (datasetId: DatasetId) =>
  getMetadata(datasetId, 'hasLocalAncestryPopulations')

export const isLiftoverSource = (datasetId: DatasetId) => getMetadata(datasetId, 'isLiftoverSource')

export const isLiftoverTarget = (datasetId: DatasetId) => getMetadata(datasetId, 'isLiftoverTarget')

export const referenceGenome = (datasetId: DatasetId) => getMetadata(datasetId, 'referenceGenome')

export const usesGrch37 = (datasetId: DatasetId) => getMetadata(datasetId, 'usesGrch37')

export const usesGrch38 = (datasetId: DatasetId) => getMetadata(datasetId, 'usesGrch38')

export const isV3Subset = (datasetId: DatasetId) => getMetadata(datasetId, 'isV3Subset')

export const isV2 = (datasetId: DatasetId) => getMetadata(datasetId, 'isV2')

export const isV3 = (datasetId: DatasetId) => getMetadata(datasetId, 'isV3')

export const isV4 = (datasetId: DatasetId) => getMetadata(datasetId, 'isV4')

export const isExac = (datasetId: DatasetId) => getMetadata(datasetId, 'isExac')

export const isSVs = (datasetId: DatasetId) => getMetadata(datasetId, 'isSVs')

export const hasV2Genome = (datasetId: DatasetId) => getMetadata(datasetId, 'hasV2Genome')

export const metricsIncludeLowQualityGenotypes = (datasetId: DatasetId) =>
  getMetadata(datasetId, 'metricsIncludeLowQualityGenotypes')

export const has1000GenomesPopulationFrequencies = (datasetId: DatasetId) =>
  getMetadata(datasetId, 'has1000GenomesPopulationFrequencies')

export const hasAlleleBalance = (datasetId: DatasetId) => getMetadata(datasetId, 'hasAlleleBalance')

export const hasRelatedVariants = (datasetId: DatasetId) =>
  getMetadata(datasetId, 'hasRelatedVariants')

export const showAllIndividualsInAgeDistributionByDefault = (datasetId: DatasetId) =>
  getMetadata(datasetId, 'showAllIndividualsInAgeDistributionByDefault')

export const hasExons = (datasetId: DatasetId) => getMetadata(datasetId, 'hasExons')

export const hasShortTandemRepeats = (datasetId: DatasetId) =>
  getMetadata(datasetId, 'hasShortTandemRepeats')

export const hasMitochondrialGenomeCoverage = (datasetId: DatasetId) =>
  getMetadata(datasetId, 'hasMitochondrialGenomeCoverage')

export const hasMitochondrialVariants = (datasetId: DatasetId) =>
  getMetadata(datasetId, 'hasMitochondrialVariants')

export const hasNonCodingReadData = (datasetId: DatasetId) =>
  getMetadata(datasetId, 'hasNonCodingReadData')

export const readsDatasetId = (datasetId: DatasetId) => getMetadata(datasetId, 'readsDatasetId')

export const readsIncludeLowQualityGenotypes = (datasetId: DatasetId) =>
  getMetadata(datasetId, 'readsIncludeLowQualityGenotypes')

export const coverageDatasetId = (datasetId: DatasetId) =>
  getMetadata(datasetId, 'coverageDatasetId')

export const variantFeedbackDescription = (datasetId: DatasetId) =>
  getMetadata(datasetId, 'variantFeedbackDescription')

export const isV4SVs = (datasetId: DatasetId) => getMetadata(datasetId, 'isV4SVs')

export const shortVariantDatasetId = (datasetId: DatasetId) =>
  getMetadata(datasetId, 'shortVariantDatasetId')

export const structuralVariantDatasetId = (datasetId: DatasetId) =>
  getMetadata(datasetId, 'structuralVariantDatasetId')
export const isV4CNVs = (datasetId: DatasetId) => getMetadata(datasetId, 'isV4CNVs')

export const copyNumberVariantDatasetId = (datasetId: DatasetId) =>
  getMetadata(datasetId, 'copyNumberVariantDatasetId')

export const hasCopyNumberVariantCoverage = (datasetId: DatasetId) =>
  getMetadata(datasetId, 'hasCopyNumberVariantCoverage')

export const baseDatasetForReferenceGenome = (_genome: ReferenceGenome): DatasetId =>
  'ourdna'

export const hasJointFrequencyData = (datasetId: DatasetId): boolean =>
  getMetadata(datasetId, 'hasJointFrequencyData')

export type TopLevelDataset = 'v4' | 'v3' | 'v2' | 'ExAC' | 'default'

export const getTopLevelDataset = (datasetId: DatasetId): TopLevelDataset => {
  if (isV4(datasetId)) {
    return 'v4'
  }
  if (isV3(datasetId)) {
    return 'v3'
  }
  if (isV2(datasetId)) {
    return 'v2'
  }
  if (isExac(datasetId)) {
    return 'ExAC'
  }

  return 'default'
}

export const hasVRSData = (datasetId: DatasetId) => getMetadata(datasetId, 'hasVRSData')
