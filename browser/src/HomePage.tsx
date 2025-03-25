import queryString from 'query-string'
import React from 'react'
import styled from 'styled-components'

import { ExternalLink, List, ListItem } from '@gnomad/ui'

import DocumentTitle from './DocumentTitle'
import InfoPage from './InfoPage'
import Link from './Link'
import Searchbox from './Searchbox'
// import GnomadLogo from './GnomadLogo'

import OurDNALogo from './OurDnaLogo'

const HomePage = styled(InfoPage)`
  max-width: 740px;
  margin-top: 90px;
`

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 1em;
`

const Heading = styled.h1`
  padding-top: 0;
  padding-bottom: 0;
  font-size: 1.2em;
  font-weight: normal;
  letter-spacing: 2px;
  text-align: center;
`

export default () => (
  <HomePage>
    <DocumentTitle />
    <HeadingContainer>
      {/* <GnomadLogo width="60%" /> */}
      <OurDNALogo width="60%" />
      <Heading>OurDNA Browser Is Under Construction</Heading>
    </HeadingContainer>

  </HomePage>
)
