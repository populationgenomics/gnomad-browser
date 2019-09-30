import { fetchAllSearchResults } from '../../../utilities/elasticsearch'

import shapeExacVariantSummary from './shapeExacVariantSummary'

const fetchExacVariantsByTranscript = async (ctx, transcript) => {
  const transcriptId = transcript.transcript_id
  const filteredRegions = transcript.exons.filter(exon => exon.feature_type === 'CDS')
  const padding = 75
  const rangeQueries = filteredRegions.map(region => ({
    range: {
      pos: {
        gte: region.start - padding,
        lte: region.stop + padding,
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
    ],

    body: {
      query: {
        bool: {
          filter: [
            {
              nested: {
                path: 'sortedTranscriptConsequences',
                query: {
                  term: { 'sortedTranscriptConsequences.transcript_id': transcriptId },
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

  return hits.map(shapeExacVariantSummary({ type: 'transcript', transcriptId }))
}

export default fetchExacVariantsByTranscript
