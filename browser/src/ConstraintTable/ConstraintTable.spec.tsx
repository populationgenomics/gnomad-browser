import React from 'react'
import { Factory } from 'fishery' // eslint-disable-line import/no-extraneous-dependencies

import { describe, expect } from '@jest/globals'
import renderer from 'react-test-renderer'
import { forAllDatasets, forAllDatasetsExcept } from '../../../tests/__helpers__/datasets'
import { withDummyRouter } from '../../../tests/__helpers__/router'

import ConstraintTable, { Gene, Transcript } from './ConstraintTable'
import { ExacConstraint } from './ExacConstraintTable'
import { GnomadConstraint } from './GnomadConstraintTable'

const transcriptFactory = Factory.define<Transcript>(() => ({
  transcript_id: 'dummy_transcript',
  transcript_version: '12.34.5',
  chrom: '13',
}))

const geneFactory = Factory.define<Gene>(({ params }) => {
  const { canonical_transcript_id = 'EN1010' } = params
  const transcripts =
    canonical_transcript_id !== null
      ? [transcriptFactory.build({ transcript_id: canonical_transcript_id })]
      : []

  return {
    chrom: '13',
    canonical_transcript_id,
    transcripts,
  }
})

const exacConstraintFactory = Factory.define<ExacConstraint>(() => ({
  exp_lof: 0.123,
  obs_lof: 0.234,
  exp_syn: 0.345,
  obs_syn: 0.456,
  exp_mis: 0.567,
  obs_mis: 0.678,
  syn_z: 0.789,
  mis_z: 0.891,
  pLI: 0.912,
}))

const gnomadConstraintFactory = Factory.define<GnomadConstraint>(() => ({
  exp_lof: 0.123,
  exp_syn: 0.234,
  exp_mis: 0.345,
  syn_z: 0.456,
  mis_z: 0.567,
  pLI: 0.678,
  oe_lof: 0.789,
  oe_lof_lower: 0.6,
  oe_lof_upper: 0.9,
  oe_mis: 0.891,
  oe_mis_lower: 0.8,
  oe_mis_upper: 0.99,
  oe_syn: 0.912,
  oe_syn_lower: 0.8,
  oe_syn_upper: 0.95,
}))

forAllDatasets('ConstraintTable with "%s" dataset selected', (datasetId) => {
  describe('with a minimal gene', () => {
    test('has no unexpected changes', () => {
      const tree = renderer.create(
        <ConstraintTable datasetId={datasetId} geneOrTranscript={geneFactory.build()} />
      )
      expect(tree).toMatchSnapshot()
    })
  })

  describe('with a minimal transcript', () => {
    test('has no unexpected changes', () => {
      const tree = renderer.create(
        <ConstraintTable datasetId={datasetId} geneOrTranscript={transcriptFactory.build()} />
      )
      expect(tree).toMatchSnapshot()
    })
  })

  describe('with a mitochondrial gene', () => {
    test('has no unexpected changes', () => {
      const tree = renderer.create(
        <ConstraintTable
          datasetId={datasetId}
          geneOrTranscript={geneFactory.build({ chrom: 'M' })}
        />
      )
      expect(tree).toMatchSnapshot()
    })
  })

  describe('with a mitochondrial transcript', () => {
    test('has no unexpected changes', () => {
      const tree = renderer.create(
        <ConstraintTable
          datasetId={datasetId}
          geneOrTranscript={transcriptFactory.build({ chrom: 'M' })}
        />
      )
      expect(tree).toMatchSnapshot()
    })
  })
})

test('ConstraintTable with exac dataset and gene with available constraints has no unexpected changes', () => {
  const tree = renderer.create(
    withDummyRouter(
      <ConstraintTable
        datasetId="exac"
        geneOrTranscript={geneFactory.build({ exac_constraint: exacConstraintFactory.build() })}
      />
    )
  )
  expect(tree).toMatchSnapshot()
})

test('ConstraintTable with exac dataset and transcript with available constraints has no unexpected changes', () => {
  const tree = renderer.create(
    withDummyRouter(
      <ConstraintTable
        datasetId="exac"
        geneOrTranscript={transcriptFactory.build({
          exac_constraint: exacConstraintFactory.build(),
        })}
      />
    )
  )
  expect(tree).toMatchSnapshot()
})

forAllDatasetsExcept(['exac'], 'ConstraintTable with "%s" dataset selected', (datasetId) => {
  describe('and gene with available constraint', () => {
    test('has no unexpected changes', () => {
      const tree = renderer.create(
        withDummyRouter(
          <ConstraintTable
            datasetId={datasetId}
            geneOrTranscript={geneFactory.build({
              gnomad_constraint: gnomadConstraintFactory.build(),
            })}
          />
        )
      )
      expect(tree).toMatchSnapshot()
    })
  })

  describe('and transcript with available constraint', () => {
    test('has no unexpected changes', () => {
      const tree = renderer.create(
        withDummyRouter(
          <ConstraintTable
            datasetId={datasetId}
            geneOrTranscript={transcriptFactory.build({
              gnomad_constraint: gnomadConstraintFactory.build(),
            })}
          />
        )
      )
      expect(tree).toMatchSnapshot()
    })
  })
})
