import path from 'path'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { makeExecutableSchema } from '@graphql-tools/schema'

import aliasResolvers from './resolvers/aliases'
import browserMetadataResolvers from './resolvers/browser-metadata'
import clinVarVariantResolvers from './resolvers/clinvar-variants'
import clinVarVariantFieldResolvers from './resolvers/clinvar-variant-fields'
import copyNumberVariantResolvers from './resolvers/copy-number-variants'
import coverageResolvers from './resolvers/coverage'
import geneResolvers from './resolvers/gene'
import geneFieldResolvers from './resolvers/gene-fields'
import regionResolvers from './resolvers/region'
import regionFieldResolvers from './resolvers/region-fields'
import structuralVariantResolvers from './resolvers/structural-variants'
import transcriptResolvers from './resolvers/transcript'
import transcriptFieldResolvers from './resolvers/transcript-fields'
import variantResolvers from './resolvers/variants'
import variantFieldResolvers from './resolvers/variant-fields'
import variantCooccurrenceResolvers from './resolvers/variant-cooccurrence'
import cnvCoverageResolvers from './resolvers/cnv-coverage'

const typeDefs = mergeTypeDefs([
  ...loadFilesSync(path.join(__dirname, './types')),
  'directive @cost(value: Int!, multipliers: [String!]) on FIELD_DEFINITION',
])

const resolvers = mergeResolvers([
  aliasResolvers,
  browserMetadataResolvers,
  clinVarVariantResolvers,
  clinVarVariantFieldResolvers,
  copyNumberVariantResolvers,
  cnvCoverageResolvers,
  coverageResolvers,
  geneResolvers,
  geneFieldResolvers,
  regionResolvers,
  regionFieldResolvers,
  structuralVariantResolvers,
  transcriptResolvers,
  transcriptFieldResolvers,
  variantResolvers,
  variantFieldResolvers,
  variantCooccurrenceResolvers,
])

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

export default schema
