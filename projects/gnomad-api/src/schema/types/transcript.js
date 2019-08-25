import { GraphQLList } from 'graphql'

import { extendObjectType } from '../../utilities/graphql'
import { withCache } from '../../utilities/redis'

import DatasetArgumentType from '../datasets/DatasetArgumentType'
import datasetsConfig from '../datasets/datasetsConfig'

import ClinvarVariantSummaryType from '../datasets/clinvar/ClinvarVariantSummaryType'
import fetchClinvarVariantsByTranscript from '../datasets/clinvar/fetchClinvarVariantsByTranscript'

import fetchGnomadConstraintByTranscript from '../datasets/gnomad_r2_1/fetchGnomadConstraintByTranscript'
import GnomadConstraintType from '../datasets/gnomad_r2_1/GnomadConstraintType'

import { UserVisibleError } from '../errors'

import { TranscriptType as BaseTranscriptType } from '../gene-models/transcript'

import coverageType, { fetchCoverageByTranscript } from './coverage'
import { GtexTissueExpressionsType, fetchGtexTissueExpressionsByTranscript } from './gtex'
import { VariantSummaryType } from './variant'

const TranscriptType = extendObjectType(BaseTranscriptType, {
  fields: {
    clinvar_variants: {
      type: new GraphQLList(ClinvarVariantSummaryType),
      resolve: (obj, args, ctx) => fetchClinvarVariantsByTranscript(ctx, obj),
    },
    exome_coverage: {
      type: new GraphQLList(coverageType),
      args: {
        dataset: { type: DatasetArgumentType },
      },
      resolve: async (obj, args, ctx) => {
        const { index, type } = datasetsConfig[args.dataset].exomeCoverageIndex
        if (!index) {
          return []
        }
        return withCache(ctx, `coverage:transcript:${index}:${obj.transcript_id}`, () =>
          fetchCoverageByTranscript(ctx, {
            index,
            type,
            chrom: obj.chrom,
            exons: obj.exons,
          })
        )
      },
    },
    genome_coverage: {
      type: new GraphQLList(coverageType),
      args: {
        dataset: { type: DatasetArgumentType },
      },
      resolve: async (obj, args, ctx) => {
        const { index, type } = datasetsConfig[args.dataset].genomeCoverageIndex
        if (!index) {
          return []
        }
        return withCache(ctx, `coverage:transcript:${index}:${obj.transcript_id}`, () =>
          fetchCoverageByTranscript(ctx, {
            index,
            type,
            chrom: obj.chrom,
            exons: obj.exons,
          })
        )
      },
    },
    gnomad_constraint: {
      type: GnomadConstraintType,
      resolve: (obj, args, ctx) => fetchGnomadConstraintByTranscript(ctx, obj.transcript_id),
    },
    gtex_tissue_tpms_by_transcript: {
      type: GtexTissueExpressionsType,
      resolve: (obj, args, ctx) => fetchGtexTissueExpressionsByTranscript(ctx, obj.transcript_id),
    },
    variants: {
      type: new GraphQLList(VariantSummaryType),
      args: {
        dataset: { type: DatasetArgumentType },
      },
      resolve: (obj, args, ctx) => {
        const { fetchVariantsByTranscript } = datasetsConfig[args.dataset]
        if (!fetchClinvarVariantsByTranscript) {
          throw new UserVisibleError(
            `Querying variants by transcript is not supported for dataset "${args.dataset}"`
          )
        }
        return fetchVariantsByTranscript(ctx, obj)
      },
    },
  },
})

export default TranscriptType