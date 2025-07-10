import React from 'react'
import styled from 'styled-components'

// TODO: images to be updated
// @ts-ignore - TS2307 Cannot fine module ... or its corresponding type declarations.
import image1 from './OurDNA_Browser_Header.png'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 30px;
  background-color: black;
  color: white;

  a {
    color: white;
    text-decoration: none;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    padding: 10px;
  }
`

const ImageWrapper = styled.div`
  @media (max-width: 900px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin-bottom: 5px;
  }
`

const Footer = () => {

  return (
    <Wrapper>
      <ImageWrapper>
        <svg width="200" viewBox="0 0 1500 300">
          <image href={image1} />
        </svg>
        <svg width="200" viewBox="0 0 1500 300">
          <image href={image1} />
        </svg>
        <svg width="200" viewBox="0 0 1500 300">
          <image href={image1} />
        </svg>
      </ImageWrapper>
      <p>
      CPG acknowledges the First Australian peoples on whose traditional lands we live and work across the country and pay our respects to their elders past and present.
      </p>
    </Wrapper>
  )
}

export default Footer
