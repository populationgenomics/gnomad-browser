import React from 'react'
import styled from 'styled-components'

import { ExternalLink, PageHeading } from '@gnomad/ui'

import Link from '../Link'

import DocumentTitle from '../DocumentTitle'
import InfoPage from '../InfoPage'

import { SectionTitle, StyledParagraph, CodeBlock } from './downloadsPageStyles'

import DataPageTableOfContents from './TableOfContents'

// @ts-expect-error
import styles from './DataPage.module.css'

import GnomadV4Downloads from './GnomadV4Downloads'

const TextSection = styled.div`
  width: 70%;

  @media (max-width: 900px) {
    width: 100%;
  }
`

const _TableOfContentsSection = styled.div`
  /* stylelint-disable-next-line value-no-vendor-prefix */
  position: -webkit-sticky;
  position: sticky;
  top: 1rem;
  width: 25%;
  float: right;
  padding-bottom: 1rem;
  border-left: 1px solid lightgrey;

  @media (max-width: 900px) {
    display: none;
  }
`
const DataPage = () => {
  // Load stylesheet to make smooth scroll behavior active
  const _style = styles.html

  return (
    <InfoPage>
      <DocumentTitle title="Data" />
      <PageHeading>Data</PageHeading>

      {/* <TableOfContentsSection>
        <DataPageTableOfContents />
      </TableOfContentsSection> */}

      <div
        style={{
          margin: '0px 0',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderLeft: '4px solid #0066cc',
          borderRadius: '4px',
          fontStyle: 'italic',
        }}
      >
        <p>
          Please note that the OurDNA browser is a resource intended for clinicians and researchers
          with formal training in genetics and genomics who understand the limitations of population
          genetic data. If you are part of one of our OurDNA communities and you would like to learn
          more about the program, please see the{' '}
          {/* @ts-expect-error TS(2786) FIXME: 'ExternalLink' cannot be used as a JSX component. */}
          <ExternalLink href="https://www.ourdna.org.au">OurDNA website.</ExternalLink>
        </p>
      </div>

      <TextSection>
        <div>
          <StyledParagraph>
            OurDNA data are available for download through a requester pays Google Cloud bucket
            maintained by the Centre for Population Genomics. We recommend using{' '}
            <ExternalLink href="https://hail.is/">Hail</ExternalLink> and{' '}
            <ExternalLink href="https://github.com/populationgenomics/gnomad_methods">
              the Centre for Population Genomics' fork of gnomad_methods
            </ExternalLink>{' '}
            to work with OurDNA data.
          </StyledParagraph>
          <p>
            Data can be browsed and downloaded from Google Cloud Storage using{' '}
            <ExternalLink href="https://cloud.google.com/sdk/gcloud/reference/storage">
              gcloud storage
            </ExternalLink>
            .
          </p>

          <p>
            <CodeBlock>gcloud storage ls gs://cpg-public-data--gnomad/release/</CodeBlock>
          </p>
        </div>

        <hr />

        <GnomadV4Downloads />
      </TextSection>
    </InfoPage>
  )
}

export default DataPage
