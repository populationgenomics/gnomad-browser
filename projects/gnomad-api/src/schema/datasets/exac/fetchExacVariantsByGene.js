import { fetchAllSearchResults } from '../../../utilities/elasticsearch'
import { mergeOverlappingRegions } from '../../../utilities/region'

import shapeExacVariantSummary from './shapeExacVariantSummary'

const fetchExacVariantsByGene = async (ctx, gene) => {
  const geneId = gene.gene_id
  const filteredRegions = gene.exons.filter(exon => exon.feature_type === 'CDS')
  const sortedRegions = filteredRegions.sort((r1, r2) => r1.xstart - r2.xstart)
  const padding = 75
  const paddedRegions = sortedRegions.map(r => ({
    ...r,
    start: r.start - padding,
    stop: r.stop + padding,
    xstart: r.xstart - padding,
    xstop: r.xstop + padding,
  }))

  const mergedRegions = mergeOverlappingRegions(paddedRegions)

  const rangeQueries = mergedRegions.map(region => ({
    range: {
      pos: {
        gte: region.start,
        lte: region.stop,
      },
    },
  }))

  const hits = await fetchAllSearchResults(ctx.database.elastic, {
    index: 'exac_v1_variants',
    type: 'variant',
    size: 10000,
    _source: [
      'AC_Adj',
      'AC_Hemi',
      'AC_Hom',
      'AN_Adj',
      'alt',
      'chrom',
      'filters',
      'flags',
      'populations',
      'pos',
      'ref',
      'rsid',
      'sortedTranscriptConsequences',
      'variant_id',
      'xpos',
    ],

    body: {
      query: {
        bool: {
          filter: [
            {
              nested: {
                path: 'sortedTranscriptConsequences',
                query: {
                  term: { 'sortedTranscriptConsequences.gene_id': geneId },
                },
              },
            },
            { bool: { should: rangeQueries } },
          ],
        },
      },
      sort: [{ pos: { order: 'asc' } }],
    },
  })

  return hits.map(shapeExacVariantSummary({ type: 'gene', geneId }))
}

export default fetchExacVariantsByGene