import React, { Suspense, lazy, useEffect, useState } from 'react'
import { hot } from 'react-hot-loader/root'
import { BrowserRouter as Router, Route, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import Delayed from './Delayed'
import ErrorBoundary from './ErrorBoundary'

import Notifications, { showNotification } from './Notifications'
import StatusMessage from './StatusMessage'
import userPreferences from './userPreferences'
import { PageHeading } from '@gnomad/ui'

import OurDNALogo from './OurDnaLogo'


const HeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 1em;
`

const Banner = styled.div`
  padding: 0.75em 0.5em;
  background: rgb(0, 0, 0);
  color: #fff;
  text-align: center;

  a {
    color: #8ac8f4 !important;
    text-decoration: underline;
  }
`
const BANNER_CONTENT = (
  <>
    OurDNA Browser is currently offline{' '}
  </>
)

const AppOffline = () => {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    userPreferences.loadPreferences().then(
      () => {
        setIsLoading(false)
      },
      (error: any) => {
        setIsLoading(false)
        showNotification({
          title: 'Error',
          message: error.message,
          status: 'error',
        })
      }
    )
  }, [])

  return (
    <div>
    <HeadingContainer>
      <OurDNALogo width="60%" />
    </HeadingContainer>

    <Banner>{BANNER_CONTENT}</Banner>
    </div>
  )
}

export default hot(AppOffline)
