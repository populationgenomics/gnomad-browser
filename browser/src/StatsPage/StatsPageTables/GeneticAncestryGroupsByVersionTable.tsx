import React from 'react'

import { DownloadElementAsPNGButton } from '../DownloadFigure'

import Link from '../../Link'

import versionData from './GeneticAncestryGroupsByVersionData.json'

import {
  renderNumberOrDash,
  StatsTable,
  StatsTableCaption,
  StatsTableHeaderRow,
  StatsTableSubHeaderRow,
  StatsTableBody,
  StatsTableFooter,
} from './TableStyles'
import { populationName } from '@gnomad/dataset-metadata/gnomadPopulations'

const GeneticAncestryGroupsByVersionTable = () => {
  const elementId = 'genetic-ancestry-group-size-by-version-table'

  return (
    <div>
      <StatsTable id={elementId}>
        <thead>
          <StatsTableHeaderRow>
            <th>&nbsp;</th>
            <th>OurDNA v1.0</th>
            {/* <th colSpan={5}>gnomAD v4*</th> */}
          </StatsTableHeaderRow>
          <StatsTableSubHeaderRow>
            <th className="rb">&nbsp;</th>
            <th className="rb">Sample count</th>
          </StatsTableSubHeaderRow>
        </thead>
        <StatsTableBody>
          {versionData.data
            .filter((tableRow) => tableRow.geneticAncestryGroup !== 'total')
            .map((tableRow) => {
              return (
                <tr>
                  <td className="rb">{`${populationName(tableRow.geneticAncestryGroup)}${
                    tableRow.optionalSymbol
                  }`}</td>
                  <td>{renderNumberOrDash(tableRow.OurDNAv1.sampleCount)}</td>
                </tr>
              )
            })}
        </StatsTableBody>
        <StatsTableFooter>
          {versionData.data
            .filter((tableRow) => tableRow.geneticAncestryGroup === 'total')
            .map((tableRow) => {
              return (
                <tr>
                  <td>Total</td>
                  <td>{renderNumberOrDash(tableRow.OurDNAv1.sampleCount)}</td>
                </tr>
              )
            })}
        </StatsTableFooter>
        <StatsTableCaption>
          <div>
            <p>
              * Individuals that fall below a 0.8 probability threshold of being assigned to any of
              the named continent-level ancestry clusters, based on their genetic data. For more
              details, please see our <Link to="/news">blog posts.</Link>
            </p>
          </div>
        </StatsTableCaption>
      </StatsTable>
      <div>
        <DownloadElementAsPNGButton elementId={elementId} />
      </div>
    </div>
  )
}

export default GeneticAncestryGroupsByVersionTable
