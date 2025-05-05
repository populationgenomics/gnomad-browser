import React from 'react'

import { ExternalLink, Link, PageHeading } from '@gnomad/ui'

import DocumentTitle from './DocumentTitle'
import InfoPage from './InfoPage'

export default () => (
  <InfoPage>
    <DocumentTitle title="Contact" />
    <PageHeading>Contact</PageHeading>

    <p>
      Report OurDNA browser errors via GitHub{' '}
      <ExternalLink href="https://github.com/populationgenomics/ourdna-browser/issues">
        GitHub.
      </ExternalLink>
    </p>

    <p>
      For questions about the OurDNA dataset, please see our{' '}
      <Link href="/news">blog</Link>.
    </p>

    <p>
      Follow us on Instagram{' '}
      <ExternalLink href="https://www.instagram.com/ourdna_australia/">@ourdna_australia</ExternalLink>.
     and{' '}
      <ExternalLink href="@ourdna_australia">Facebook</ExternalLink>.
    </p>

    <br/>
    <p>
      For all other questions, please email us. 
    </p>
  </InfoPage>
)
