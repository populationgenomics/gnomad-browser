import React from 'react'
import styled from 'styled-components'
import { ExternalLink, PageHeading } from '@gnomad/ui'

// @ts-expect-error
import aboutContent from '../about/about.md'
// import gcbrContent from '../about/contributors/gcbr/gcbr.md'

import DocumentTitle from './DocumentTitle'
import InfoPage from './InfoPage'
import MarkdownContent from './MarkdownContent'

const Contributors = styled.div`
  line-height: 1.5;

  ul {
    padding-left: 0;
    margin: 0;
    list-style-type: none;
  }

  ul ul {
    padding-left: 20px;
    margin: 0.5em 0;
  }
`

const _PrincipalInvestigators = styled(Contributors)`
  columns: 2;

  @media (max-width: 992px) {
    columns: 1;
  }
`

export default () => (
  <InfoPage>
    <DocumentTitle title="About OurDNA Browser" />
    <PageHeading
      // @ts-expect-error

      id="about-gnomad"
    >
      About the OurDNA Browser
    </PageHeading>

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
        Please note that the OurDNA browser is a resource intended for clinicians and researchers.
        If you are part of one of our OurDNA communities and you would like to learn more about the
        program, please see the{' '}
        {/* @ts-expect-error TS(2786) FIXME: 'ExternalLink' cannot be used as a JSX component. */}
        <ExternalLink href="https://www.ourdna.org.au">OurDNA website.</ExternalLink>
      </p>
    </div>

    {/* Import about blurb from .md file */}
    <MarkdownContent dangerouslySetInnerHTML={{ __html: aboutContent.html }} />
  </InfoPage>
)
