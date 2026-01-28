import { beforeEach, describe, expect, jest, it, test } from '@jest/globals'

import { fetchSearchResults } from './search'

describe('fetchSearchResults', () => {
  beforeEach(() => {
    // @ts-expect-error TS(2322) FIXME: Type 'Mock<UnknownFunction>' is not assignable to ... Remove this comment to see the full error message
    global.fetch = jest.fn()
  })

  it('should return a variant page link for structural variant IDs', async () => {
    expect(await fetchSearchResults('ourdna', 'MCNV_4_185')).toEqual([
      {
        label: 'MCNV_4_185',
        value: '/variant/MCNV_4_185?dataset=ourdna',
      },
    ])
  })

  it('should return a variant page link for variant IDs', async () => {
    expect(await fetchSearchResults('ourdna', '1-55516888-G-GA')).toEqual([
      {
        label: '1-55516888-G-GA',
        value: '/variant/1-55516888-G-GA?dataset=ourdna',
      },
    ])
  })

  it('should return a variant page link for rsIDs', async () => {
    expect(await fetchSearchResults('ourdna', 'rs527413419')).toEqual([
      {
        label: 'rs527413419',
        value: '/variant/rs527413419?dataset=ourdna',
      },
    ])
  })

  it('should return a gene page link for Ensembl gene IDs', async () => {
    expect(await fetchSearchResults('ourdna', 'ENSG00000169174')).toEqual([
      {
        label: 'ENSG00000169174',
        value: '/gene/ENSG00000169174?dataset=ourdna',
      },
    ])
  })

  it('should return a transcript page link for Ensembl transcript IDs', async () => {
    expect(await fetchSearchResults('ourdna', 'ENST00000302118')).toEqual([
      {
        label: 'ENST00000302118',
        value: '/transcript/ENST00000302118?dataset=ourdna',
      },
    ])
  })

  it('should return a region page link for region IDs', async () => {
    expect(await fetchSearchResults('ourdna', '1:55039447-55064852')).toEqual([
      {
        label: '1-55039447-55064852',
        value: '/region/1-55039447-55064852?dataset=ourdna',
      },
    ])
  })

  it('should return region page links for a window and a position for position IDs', async () => {
    expect(await fetchSearchResults('ourdna', '1:55039447')).toEqual([
      {
        label: '1-55039427-55039467',
        value: '/region/1-55039427-55039467?dataset=ourdna',
      },
      {
        label: '1-55039447-55039447',
        value: '/region/1-55039447-55039447?dataset=ourdna',
      },
    ])
  })

  it('should search for gene symbols', async () => {
    // @ts-expect-error TS(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
    global.fetch.mockReturnValue(
      Promise.resolve({
        json: () =>
          Promise.resolve({
            data: {
              gene_search: [{ ensembl_id: 'ENSG00000169174', symbol: 'PCSK9' }],
            },
          }),
      })
    )

    expect(await fetchSearchResults('ourdna', 'PCSK9')).toEqual([
      {
        label: 'PCSK9',
        value: '/gene/ENSG00000169174?dataset=ourdna',
      },
    ])
  })

  it("sorts gene search results with genes that start with the query ahead of those that don't", async () => {
    // @ts-expect-error TS(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
    global.fetch.mockReturnValue(
      Promise.resolve({
        json: () =>
          Promise.resolve({
            data: {
              gene_search: [
                { ensembl_id: 'ENSG000004', symbol: 'ABCD3' },
                { ensembl_id: 'ENSG000001', symbol: 'QRST3' },
                { ensembl_id: 'ENSG000005', symbol: 'LMNO2' },
                { ensembl_id: 'ENSG000002', symbol: 'QRST1' },
                { ensembl_id: 'ENSG000006', symbol: 'ZXCV1' },
                { ensembl_id: 'ENSG000003', symbol: 'QRST2' },
              ],
            },
          }),
      })
    )

    expect(await fetchSearchResults('ourdna', 'QRS')).toEqual([
      { label: 'QRST1', value: '/gene/ENSG000002?dataset=ourdna' },
      {
        label: 'QRST2',
        value: '/gene/ENSG000003?dataset=ourdna',
      },
      {
        label: 'QRST3',
        value: '/gene/ENSG000001?dataset=ourdna',
      },
      {
        label: 'ABCD3',
        value: '/gene/ENSG000004?dataset=ourdna',
      },
      {
        label: 'LMNO2',
        value: '/gene/ENSG000005?dataset=ourdna',
      },
      {
        label: 'ZXCV1',
        value: '/gene/ENSG000006?dataset=ourdna',
      },
    ])
  })

  it('should return a link to variant co-occurrence for two variant IDs', async () => {
    expect(await fetchSearchResults('ourdna', '1-55505647-G-T and 1-55523855-G-A')).toEqual([
      {
        label: '1-55505647-G-T and 1-55523855-G-A co-occurrence',
        value:
          '/variant-cooccurrence?dataset=ourdna&variant=1-55505647-G-T&variant=1-55523855-G-A',
      },
    ])
  })

  describe('looking up a query formatted like a CAID', () => {
    test('returns links to any genes with matching symbols as well as the presumptive CAID, disambiguating if needed', async () => {
      // @ts-expect-error TS(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
      global.fetch.mockReturnValue(
        Promise.resolve({
          json: () =>
            Promise.resolve({
              data: {
                gene_search: [
                  { ensembl_id: 'ENSG000004', symbol: 'CA327' },
                  { ensembl_id: 'ENSG000001', symbol: 'CA321' },
                  { ensembl_id: 'ENSG000005', symbol: 'CA3213' },
                  { ensembl_id: 'ENSG000006', symbol: 'CA32' },
                  { ensembl_id: 'ENSG000003', symbol: 'CA325' },
                ],
              },
            }),
        })
      )

      expect(await fetchSearchResults('ourdna', 'CA3')).toEqual([
        { label: 'CA3', value: `/variant/CA3?dataset=ourdna` },
        {
          label: 'CA32',
          value: '/gene/ENSG000006?dataset=ourdna',
        },
        {
          label: 'CA321',
          value: '/gene/ENSG000001?dataset=ourdna',
        },
        {
          label: 'CA3213',
          value: '/gene/ENSG000005?dataset=ourdna',
        },
        {
          label: 'CA325',
          value: '/gene/ENSG000003?dataset=ourdna',
        },
        {
          label: 'CA327',
          value: '/gene/ENSG000004?dataset=ourdna',
        },
      ])

      expect(await fetchSearchResults('ourdna', 'CA32')).toEqual([
        { label: 'CA32 (variant)', value: `/variant/CA32?dataset=ourdna` },
        {
          label: 'CA32 (ENSG000006)',
          value: '/gene/ENSG000006?dataset=ourdna',
        },
        {
          label: 'CA321',
          value: '/gene/ENSG000001?dataset=ourdna',
        },
        {
          label: 'CA3213',
          value: '/gene/ENSG000005?dataset=ourdna',
        },
        {
          label: 'CA325',
          value: '/gene/ENSG000003?dataset=ourdna',
        },
        {
          label: 'CA327',
          value: '/gene/ENSG000004?dataset=ourdna',
        },
      ])
    })
  })
})
