import React from 'react'
import styled from 'styled-components'

import { ExternalLink, Link as StyledLink, PageHeading } from '@gnomad/ui'

import DocumentTitle from '../DocumentTitle'
import InfoPage from '../InfoPage'

import { SectionTitle, StyledParagraph, CodeBlock } from './downloadsPageStyles'

import DataPageTableOfContents from './TableOfContents'

// @ts-expect-error
import styles from './DataPage.module.css'

import OurDNAV1Downloads from './OurDNAV1Downloads'

const TextSection = styled.div`
  width: 70%;

  @media (max-width: 900px) {
    width: 100%;
  }
`

const TableOfContentsSection = styled.div`
  /* stylelint-disable-next-line value-no-vendor-prefix */
  position: -webkit-sticky;
  position: sticky;
  top: 1rem;
  width: 25%;
  float: right;
  padding-bottom: 1rem;
  border-left: 1px solid lightgrey;
  margin-left: 1rem;

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

      <TableOfContentsSection>
        <DataPageTableOfContents />
      </TableOfContentsSection>

      <div
        style={{
          margin: '0px 0',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderLeft: '4px solid #0066cc',
          borderRadius: '4px',
          fontStyle: 'italic',
          display: 'flex',
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
          <SectionTitle id="summary" theme={{ type: 'datasets' }}>
            Summary
          </SectionTitle>
          <StyledParagraph>
            OurDNA data are available for download through{' '}
            {/* @ts-expect-error TS(2786) FIXME: 'ExternalLink' cannot be used as a JSX component. */}
            <ExternalLink href="https://cloud.google.com/storage/docs/requester-pays">
              a requester pays Google Cloud bucket
            </ExternalLink>
            .
            <br/>
            {/* @ts-expect-error TS(2769) FIXME: No overload matches this call. */}
            Please see <StyledLink href="/data-readme">README</StyledLink> page for more details.
          </StyledParagraph>
          <StyledParagraph>
            The data are maintained by the Centre for Population Genomics. We recommend using{' '}
            {/* @ts-expect-error TS(2786) FIXME: 'ExternalLink' cannot be used as a JSX component. */}
            <ExternalLink href="https://hail.is/">Hail</ExternalLink> and{' '}
            {/* @ts-expect-error TS(2786) FIXME: 'ExternalLink' cannot be used as a JSX component. */}
            <ExternalLink href="https://github.com/populationgenomics/gnomad_methods">
              the Centre for Population Genomics&apos; fork of gnomad_methods
            </ExternalLink>{' '}
            to work with OurDNA data.
          </StyledParagraph>
          <p>
            Data can be browsed and downloaded from Google Cloud Storage using{' '}
            {/* @ts-expect-error TS(2786) FIXME: 'ExternalLink' cannot be used as a JSX component. */}
            <ExternalLink href="https://cloud.google.com/sdk/gcloud/reference/storage">
              gcloud storage
            </ExternalLink>
            .
          </p>
          <p>
            Replace <b>YOUR_PROJECT_NAME</b> with your nominated Google project name for paying
            egress costs
          </p>

          <p>
            <h4>Command to browse</h4>{' '}
            <CodeBlock>
              gcloud storage ls --billing-project YOUR_PROJECT_NAME \
              <br />
              gs://cpg-ourdna-browser-public-australia-southeast1/release
            </CodeBlock>
          </p>
          <p>
            <h4>Command to download (e.g. chr1 sites VCF)</h4>{' '}
            <CodeBlock>
              gcloud storage cp --billing-project YOUR_PROJECT_NAME \
              <br />
              gs://cpg-ourdna-browser-public-australia-southeast1/release/\
              <br />
              1.0/vcf/exomes/chr1_variants.vcf.bgz .
            </CodeBlock>
          </p>
        </div>

        <hr />

        <OurDNAV1Downloads />
      </TextSection>
    </InfoPage>
  )
}

export default DataPage
