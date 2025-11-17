import React, { useState } from 'react'
import styled from 'styled-components'

import { Button, ExternalLink, List, Modal, PrimaryButton, TextButton } from '@gnomad/ui'

import { withAnchor } from '../AnchorLink'
import { logButtonClick } from '../analytics'

export const FileList = styled(List)`
  li {
    line-height: 1.25;
  }
`

const BaseSectionTitle = styled.h2`
  font-size: ${(props) =>
    // eslint-disable-next-line no-nested-ternary
    props.theme.type === 'release'
      ? '2.25rem'
      : props.theme.type === 'datasets'
      ? '1.88rem'
      : '1.5rem'};
`

export const SectionTitle = styled(withAnchor(BaseSectionTitle))``

export const StyledParagraph = styled.p`
  padding-bottom: 1rem;
`

export const ColumnsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`

export const Column = styled.div`
  flex-basis: calc(50% - 25px);

  @media (max-width: 900px) {
    flex-basis: 100%;
  }

  > h3 {
    margin-top: 0;
  }
`

export const DownloadsSection = styled.section`
  margin-bottom: 5rem;
`

type ShowURLButtonProps = {
  label: string
  url: string
  logClicks: boolean
}

const ShowURLButton = ({ label, url, logClicks, ...otherProps }: ShowURLButtonProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <>
      <TextButton
        {...otherProps}
        onClick={() => {
          if (logClicks) {
            logButtonClick(`User showed or copied URL for ${label}`)
          }
          setIsExpanded(true)
        }}
      />
      {isExpanded && (
        <Modal
          size="large"
          title={label}
          footer={
            <>
              <Button
                onClick={() => {
                  setIsExpanded(false)
                }}
              >
                Ok
              </Button>
              {navigator.clipboard && navigator.clipboard.writeText && (
                <PrimaryButton
                  onClick={() => {
                    navigator.clipboard.writeText(url)
                  }}
                  style={{ marginLeft: '1em' }}
                >
                  Copy URL
                </PrimaryButton>
              )}
            </>
          }
          onRequestClose={() => {
            setIsExpanded(false)
          }}
        >
          {url}
        </Modal>
      )}
    </>
  )
}

const renderDownloadOptions = (elements: any) => {
  return elements
    .filter((el: any) => el)
    .flatMap((el: any) => [' / ', el])
    .slice(1)
}

type OwnGetUrlButtonsProps = {
  gcsBucket?: string
  label: string
  path: string
  size?: string
  md5?: string
  crc32c?: string
  includeGCP?: boolean
  logClicks?: boolean
}

// @ts-expect-error TS(2456) FIXME: Type alias 'GetUrlButtonsProps' circularly referen... Remove this comment to see the full error message
type GetUrlButtonsProps = OwnGetUrlButtonsProps & typeof GetUrlButtons.defaultProps

// @ts-expect-error TS(7022) FIXME: 'GetUrlButtons' implicitly has type 'any' because ... Remove this comment to see the full error message
export const GetUrlButtons = ({
  gcsBucket,
  label,
  path,
  size,
  md5,
  includeGCP,
  logClicks = false,
}: GetUrlButtonsProps) => {
  return (
    <>
      <span>{label}</span>
      <br />
      {size && md5 && (
        <>
          <span>
            {size}, MD5:&nbsp;{md5}
          </span>
          <br />
        </>
      )}
      Show URL for{' '}
      {renderDownloadOptions([
        includeGCP(
          // @ts-expect-error TS(2322) FIXME: Type '{ children: string; key: string; "aria-label... Remove this comment to see the full error message
          <ShowURLButton
            key="gcp"
            aria-label={`Show Google URL for ${label}`}
            label={label}
            url={`gs://${gcsBucket}${path}`}
            logClicks={logClicks}
          >
            Google
          </ShowURLButton>
        ),
      ])}
      {navigator.clipboard && navigator.clipboard.writeText && (
        <>
          <br />
          Copy URL for{' '}
          {renderDownloadOptions([
            includeGCP(
              <TextButton
                key="gcp"
                aria-label={`Copy Google URL for ${label}`}
                onClick={() => {
                  if (logClicks) {
                    logButtonClick(`User showed or copied URL for ${label}`)
                  }
                  navigator.clipboard.writeText(`gs://${gcsBucket}${path}`)
                }}
              >
                Google
              </TextButton>
            ),
          ])}
        </>
      )}
    </>
  )
}

GetUrlButtons.defaultProps = {
  gcsBucket: 'cpg-public-data--gnomad',
  size: undefined,
  md5: undefined,
  includeGCP: true,
}

type DownloadLinksProps = {
  label: string
  path: string
  size?: string
  md5?: string
  crc32c?: string
  gcsBucket?: string
  includeGCP?: boolean
  associatedFileType?: string
  logClicks?: boolean
}

export const DownloadLinks = ({
  label,
  path,
  size,
  md5,
  crc32c,
  gcsBucket = 'cpg-ourdna-browser-public-australia-southeast1',
  includeGCP = true,
  associatedFileType,
  logClicks = false,
}: DownloadLinksProps) => {
  return (
    <>
      <span>{label}</span>
      <br />
      {size && md5 && (
        <>
          <span>
            {size}, MD5:&nbsp;{md5}
          </span>
          <br />
        </>
      )}
      {size && crc32c && (
        <>
          <span>
            {size}, CRC32C:&nbsp;{crc32c}
          </span>
          <br />
        </>
      )}
      <span>
        Download from{' '}
        {renderDownloadOptions([
          includeGCP && (
            // @ts-expect-error TS(2786) FIXME: 'ExternalLink' cannot be used as a JSX component.
            <ExternalLink
              key="gcp"
              aria-label={`Download ${label} from Google`}
              href={`https://storage.googleapis.com/${gcsBucket}${path}`}
              onClick={() => {
                if (logClicks) {
                  logButtonClick(`User downloaded ${label} from Google`)
                }
              }}
            >
              Google
            </ExternalLink>
          ),
        ])}
      </span>
      {associatedFileType && (
        <>
          <br />
          <span>
            Download {associatedFileType.toUpperCase()} from{' '}
            {renderDownloadOptions([
              includeGCP && (
                // @ts-expect-error TS(2786) FIXME: 'ExternalLink' cannot be used as a JSX component.
                <ExternalLink
                  key="gcp"
                  aria-label={`Download ${associatedFileType.toUpperCase()} file for ${label} from Google`}
                  href={`https://storage.googleapis.com/${gcsBucket}${path}.${associatedFileType.toLowerCase()}`}
                >
                  Google
                </ExternalLink>
              ),
            ])}
          </span>
        </>
      )}
    </>
  )
}

export const CodeBlock = styled.code`
  display: block;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  padding: 0.5em 1em;
  border-radius: 0.25em;
  background: #333;
  color: #fafafa;
  font-family: monospace;
  line-height: 1.6;
  white-space: nowrap;

  &::before {
    content: '$ ';
  }
`
