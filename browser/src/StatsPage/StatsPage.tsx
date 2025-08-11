import React from 'react'
import styled from 'styled-components'

import ourdnaAgeDistribution from '@gnomad/dataset-metadata/datasets/ourdna-v1/ageDistribution.json'
import { ExternalLink, PageHeading } from '@gnomad/ui'

// @ts-ignore - TS2307 Cannot fine module ... or its corresponding type declarations.
import BrowserPageviews from '../../about/stats/browser_pageviews.png'
// @ts-ignore - TS2307 Cannot fine module ... or its corresponding type declarations.
import BrowserWorld from '../../about/stats/browser_world.png'
// @ts-ignore - TS2307 Cannot fine module ... or its corresponding type declarations.
import DiversityBadge from '../../about/stats/diversity_badge.png'
// @ts-ignore - TS2307 Cannot fine module ... or its corresponding type declarations.
import SnvsPerBPAvg from '../../about/stats/snvs_per_bp_avg.png'

import DocumentTitle from '../DocumentTitle'
import Histogram from '../Histogram'
import { SectionHeading } from '../help/HelpPage'
import InfoPage from '../InfoPage'
import Link from '../Link'

import ourdnaExomeGenomeCountsByVersion from './BarGraphData/ourdnaExomeGenomeCountsByVersion.json'
import ourdnaV1GeneticAncestryCounts from './BarGraphData/ourdnaV1GeneticAncestryCounts.json'
import ourdnaV1GeneticDiversityCounts from './BarGraphData/ourdnaV1GeneticDiversityCounts.json'
import NumberOfVariantsInOurDNAList, { SectionList } from './NumberOfVariantsInOurDNAList'
import StackedBarGraph from './StackedBarGraph'
import GeneticAncestryGroupsByVersionTable from './StatsPageTables/GeneticAncestryGroupsByVersionTable'
import V4GeneticAncestryTable from './StatsPageTables/V4GeneticAncestryTable'
import StudyDiseasesInGnomadTable from './StatsPageTables/StudyDiseasesInGnomadTable'

import {
  InferredSexAllV4Table,
  InferredSexNonUKBV4Table,
} from './StatsPageTables/InferredSexPerGeneticAncestryTables'

const TwoColumnLayout = styled.div`
  display: flex;
  justify-content: space-around;

  @media (max-width: 992px) {
    display: block;
  }
`

const ResponsiveHalfWidthColumn = styled.div`
  width: 50%;

  @media (max-width: 992px) {
    width: 100%;
  }
`

const ResponsiveGnomadSamplesContainer = styled.div`
  width: 70%;

  @media (max-width: 992px) {
    width: 100%;
  }
`

const DiversityBarGraphContainer = styled.div`
  display: flex;
  justify-content: space-around;

  @media (max-width: 992px) {
    display: block;
    width: 100%;
  }
`

const DiversityBarGraph = styled.div`
  width: 70%;

  @media (max-width: 992px) {
    display: block;
    width: 100%;
  }
`

const SexDistributionList = styled.div`
  width: 30%;

  @media (max-width: 992px) {
    width: 100%;
  }
`

const CenteredContainer = styled.div`
  display: flex;
  justify-content: space-around;
`

const ResponsiveTable = styled.div`
  display: flex;
  justify-content: space-around;

  @media (max-width: 992px) {
    display: block;
  }
`

const StatsSection = styled.div`
  margin-bottom: 5em;
`

const StatsHighlightColorBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  margin: 1em 0 2em 0;
  background-color: ${(props) => props.theme.color};
  color: white;
  border-radius: 1.5em;
  text-align: center;
`

const StatsHighlightTitle = styled.h1`
  margin: 0;
  font-size: 3.75em;
`

const StatsHighlightText = styled.p`
  margin: 0;
  font-size: 1.25em;
`

const CountriesColoredText = styled.span`
  color: #508a14;
  font-weight: bold;
`

const DiversityBarGraphTooltip = (row: any) => {
  return (
    <>
      <b>{row.label}</b>
      {/* eslint-disable dot-notation */}
      <div>{row['European'].toLocaleString()} European</div>
      <div>{row['Unclassified'].toLocaleString()} Unclassified</div>
      <div>{row['Australian Filipino'].toLocaleString()} Australian Filipino</div>
      <div>{row['Central and South American'].toLocaleString()} Central and South American</div>
      <div>
        {row['African, African American and African Caribbean'].toLocaleString()} African, African
        American and African Caribbean
      </div>
      <div>
        {row['Middle Eastern and North African'].toLocaleString()} Middle Eastern and North African
      </div>
      <div>{row['East and South East Asian'].toLocaleString()} East and South East Asian</div>
      <div>{row['Central and South Asian'].toLocaleString()} Central and South Asian</div>
      {/* eslint-enable dot-notation */}
    </>
  )
}

const StatsHighlightBlock = ({
  title,
  text,
  color,
}: {
  title: string
  text: string
  color: string
}) => {
  return (
    <StatsHighlightColorBlock theme={{ color }}>
      <div>
        <StatsHighlightTitle>{title}</StatsHighlightTitle>
        <StatsHighlightText>{text}</StatsHighlightText>
      </div>
    </StatsHighlightColorBlock>
  )
}

const ourdnaOrange = '#F05436'
const ourdnaPurple = '#3646A8'

const barGraphTooltip = (row: any) => (
  <>
    <b>{row.label}</b>
    <div>{row.Exomes.toLocaleString()} exomes</div>
    <div>{row.Genomes.toLocaleString()} genomes</div>
  </>
)

const StatsPage = () => {
  return (
    <InfoPage>
      <DocumentTitle title="Stats" />
      {/* @ts-expect-error */}
      <PageHeading id="OurDNA-stats">What&apos;s in OurDNA</PageHeading>
      <div>
        <StatsSection style={{ marginTop: '2em' }}>
          <TwoColumnLayout>
            <div>
              <h2>OurDNA v1 includes 12,885 individuals</h2>
              <SectionList>
                <li>
                  10,671 <span style={{ color: ourdnaOrange }}>exomes</span>
                  <SectionList>
                    <li>Lorem ipsum</li>
                  </SectionList>
                </li>
                <li>
                  2,214 <span style={{ color: ourdnaPurple }}>genomes</span>
                </li>
              </SectionList>
              <h2>OurDNA v1 variants</h2>
              <NumberOfVariantsInOurDNAList />
            </div>
            <ResponsiveHalfWidthColumn>
              <div style={{ marginTop: '4em', marginBottom: '7em', minWidth: '550px' }}>
                <StackedBarGraph
                  title="Sample size across major OurDNA releases"
                  barColors={ourdnaExomeGenomeCountsByVersion.colors}
                  barValues={ourdnaExomeGenomeCountsByVersion.data}
                  height={400}
                  formatTooltip={barGraphTooltip}
                  xLabel=""
                  yLabel="Number of samples"
                  displayNumbers
                />
              </div>
            </ResponsiveHalfWidthColumn>
          </TwoColumnLayout>
        </StatsSection>

        <StatsSection>
          <SectionHeading id="age-and-sex-distribution">
            What is the age and sex distribution in OurDNA?
          </SectionHeading>
          <TwoColumnLayout>
            <ResponsiveGnomadSamplesContainer>
              <h3>Age</h3>
              <TwoColumnLayout>
                <ResponsiveHalfWidthColumn>
                  <p>Exomes</p>
                  <Histogram
                    // @ts-expect-error TS(2322) FIXME: Type '{ binEdges: any; binValues: any; nSmaller: a... Remove this comment to see the full error message
                    binEdges={ourdnaAgeDistribution.exome.bin_edges}
                    binValues={ourdnaAgeDistribution.exome.bin_freq}
                    nSmaller={ourdnaAgeDistribution.exome.n_smaller}
                    nLarger={ourdnaAgeDistribution.exome.n_larger}
                    barColor={ourdnaOrange}
                    xLabel="Age"
                    yLabel="Individuals"
                    formatTooltip={(bin: any) =>
                      `${bin.label}: ${bin.value.toLocaleString()} individuals`
                    }
                  />
                </ResponsiveHalfWidthColumn>
                <ResponsiveHalfWidthColumn>
                  <p>Genomes</p>
                  <Histogram
                    // @ts-expect-error TS(2322) FIXME: Type '{ binEdges: any; binValues: any; nSmaller: a... Remove this comment to see the full error message
                    binEdges={ourdnaAgeDistribution.genome.bin_edges}
                    binValues={ourdnaAgeDistribution.genome.bin_freq}
                    nSmaller={ourdnaAgeDistribution.genome.n_smaller}
                    nLarger={ourdnaAgeDistribution.genome.n_larger}
                    barColor={ourdnaPurple}
                    xLabel="Age"
                    yLabel="Individuals"
                    formatTooltip={(bin: any) =>
                      `${bin.label}: ${bin.value.toLocaleString()} individuals`
                    }
                  />
                </ResponsiveHalfWidthColumn>
              </TwoColumnLayout>
            </ResponsiveGnomadSamplesContainer>
            <SexDistributionList>
              <h3>Sex</h3>
              <ul>
                <li>6,404 XX individuals</li>
                <li>6,481 XY individuals</li>
              </ul>
            </SexDistributionList>
          </TwoColumnLayout>
          {/* <p style={{ marginTop: '5em' }}>
                          To learn more about how we calculate the sex and age distribution please see our{' '}
                          <Link to="/help">FAQs</Link>
                          </p> */}
        </StatsSection>

        {/* <StatsSection>
                          <SectionHeading id="samples">Where do gnomAD samples come from?</SectionHeading>
                          <div style={{ width: '100%' }}>
                          <TwoColumnLayout>
                          <StatsHighlightBlock color={ourdnaOrange} title="308" text="Data Contributors" />
                          <StatsHighlightBlock
                          color={ourdnaPurple}
                          title=">100"
                          text="Studies from around the world"
                          />
                          </TwoColumnLayout>
                          </div>
                          <p>
                          The gnomAD project brings in samples recruited for various studies based around the
                          world. We are not always provided information about where samples are obtained, but we
                          are often provided the country of the study&apos;s institutional review board (IRB).{' '}
                          </p>
                          <p>
                          Version 4 of gnomAD contains samples with IRBs based in at least 25 different countries,
                          including:{' '}
                          <CountriesColoredText>
                          Australia, Bangladesh, Belgium, Canada, China, England, Finland, France, Germany,
                          Israel, Italy, Japan, Kenya, Korea, Lithuania, Mexico, Netherlands, Pakistan,
                          Scotland, Singapore, Spain, Sweden, United Arab Emirates, United States, Wales.
                          </CountriesColoredText>
                          </p>
                          <p>
                          To see a list of studies included in gnomAD and data contributors please visit our{' '}
                          <Link to="/about">about page</Link>.
                          </p>
                          </StatsSection> */}

        <StatsSection>
          <SectionHeading id="diversity">Diversity in OurDNA</SectionHeading>

          <h3 style={{ marginBottom: '2em' }}>Genetic ancestry groups in OurDNA by version</h3>

          {/* <TwoColumnLayout style={{ marginBottom: '5em' }}>
              <img
              alt="2.9x increase in non-European individuals"
              src={DiversityBadge}
              width="275px"
              />
              <ResponsiveHalfWidthColumn>
              <p>
              We continue to improve the diversity of the genetic ancestry groups within gnomAD.
              While v4 does have some improvements we continue to strive to increase
              representation of historically underrepresented populations.
              </p>
              <p>
              To learn more about how we determine genetic ancestry groups please see our{' '}
              <Link to="help/ancestry">help page</Link> and{' '}
              <ExternalLink href="https://gnomad.broadinstitute.org/news/2023-11-genetic-ancestry">
              blog post
              </ExternalLink>{' '}
              on genetic ancestry.
              </p>
              </ResponsiveHalfWidthColumn>
              </TwoColumnLayout>
            */}

          <ResponsiveTable style={{ marginBottom: '3em' }}>
            <GeneticAncestryGroupsByVersionTable />
          </ResponsiveTable>

          <DiversityBarGraphContainer style={{ marginBottom: '0.5em', width: '100%' }}>
            <DiversityBarGraph style={{ marginTop: '1em', marginBottom: '1em' }}>
              <StackedBarGraph
                title="Per genetic ancestry group count of samples in gnomAD releases"
                barColors={ourdnaV1GeneticAncestryCounts.colors}
                barValues={ourdnaV1GeneticAncestryCounts.data}
                height={400}
                formatTooltip={DiversityBarGraphTooltip}
                xLabel=""
                yLabel="Number of samples"
                displayNumbers={false}
              />
            </DiversityBarGraph>
          </DiversityBarGraphContainer>

          <DiversityBarGraphContainer style={{ marginBottom: '6em' }}>
            <DiversityBarGraph style={{ marginTop: '1em', marginBottom: '0' }}>
              <StackedBarGraph
                title="Per genetic ancestry group count of non-synonymous coding variants in canonical transcripts with a overall AF > 0.1"
                barColors={ourdnaV1GeneticDiversityCounts.colors}
                barValues={ourdnaV1GeneticDiversityCounts.data}
                height={400}
                formatTooltip={DiversityBarGraphTooltip}
                xLabel=""
                yLabel="Number of samples"
                displayNumbers={false}
              />
            </DiversityBarGraph>
          </DiversityBarGraphContainer>

          {/* <h3 style={{ marginBottom: '2em' }}>
                          Inferred sex in gnomAD v4 per genetic ancestry group
                          </h3>

                          <h4 style={{ marginBottom: '2em' }}>gnomAD v4</h4>
                          <ResponsiveTable style={{ marginBottom: '6em' }}>
                          <InferredSexAllV4Table />
                          </ResponsiveTable> */}
        </StatsSection>

        {/* <StatsSection>
                          <SectionHeading id="study-provided-labels">
                          Study-provided labels and genetic ancestry groups
                          </SectionHeading>

                          <p>
                          The following table is provided in order to present how our inferred genetic ancestry
                          groups correspond to descriptors provided by each contributing
                          <Link to="/about"> study</Link>. The table below lists the total number of individuals
                          in each genetic ancestry group and the percentage of samples per group with each
                          study-provided descriptor.{' '}
                          </p>
                          <p>
                          It is of note that imputed ancestry groups are genetically derived, while the
                          study-provided labels are either self-reported or researcher assigned. As such, these
                          values have no equivalency.
                          </p>

                          <ResponsiveTable>
                          <V4GeneticAncestryTable />
                          </ResponsiveTable>
                          </StatsSection>
                        */}
        {/* <StatsSection>
                          <SectionHeading id="study-diseases">Study Diseases in gnomAD</SectionHeading>

                          <p style={{ marginBottom: '2em' }}>
                          During the sample aggregation phase of v4 we began collecting study-disease of interest
                          and case/control status at the individual level. This enabled us to provide a better
                          sense of the phenotype breakdown in gnomAD (see table below). While we are provided high
                          level study phenotype and case/control status for some exome samples,{' '}
                          <b>we do not have comprehensive phenotype metadata for gnomAD samples</b> and many
                          samples are now derived from large biobanks which can include individuals with disease.{' '}
                          </p>

                          <ResponsiveTable style={{ marginBottom: '3em' }}>
                          <StudyDiseasesInGnomadTable />
                          </ResponsiveTable>
                          </StatsSection> */}

        {/* <StatsSection>
                          <SectionHeading id="browser">gnomAD Browser Stats</SectionHeading>
                          <p>{`The gnomAD browser averages ~200,000 page views per week and had >377,000 unique users in the last year`}</p>
                          <TwoColumnLayout>
                          <ResponsiveHalfWidthColumn>
                          <img alt="Browser weekly pageviews" src={BrowserPageviews} width="100%" />
                          </ResponsiveHalfWidthColumn>
                          <ResponsiveHalfWidthColumn>
                          <img alt="Browser users location" src={BrowserWorld} width="100%" />
                          </ResponsiveHalfWidthColumn>
                          </TwoColumnLayout>
                          </StatsSection> */}
      </div>
    </InfoPage>
  )
}

export default StatsPage
