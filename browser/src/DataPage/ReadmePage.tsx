import React from 'react'
import styled from 'styled-components'

// @ts-expect-error
import readmeContent from './Readme.md'
import DocumentTitle from '../DocumentTitle'
import InfoPage from '../InfoPage'
import MarkdownContent from '../MarkdownContent'

const ReadmePage = styled(InfoPage)`
  h2 {
    font-size: 1.5em;
    font-weight: bold;
  }

  h2:not(:first-child) {
    padding-top: 1.5rem;
  }
`

export default () => (
  <ReadmePage>
    <DocumentTitle title="Data Readme" />
    <MarkdownContent dangerouslySetInnerHTML={{ __html: readmeContent.html }} />
  </ReadmePage>
)
