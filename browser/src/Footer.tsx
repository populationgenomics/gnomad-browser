import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
// TODO: images to be updated
import image1 from './OurDNA_Browser_Header.png'
import image2 from './OurDNA_Browser_Header.png'
import image3 from './OurDNA_Browser_Header.png'

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
          <image href={image2} />
        </svg>
        <svg width="200" viewBox="0 0 1500 300">
          <image href={image3} />
        </svg>
      </ImageWrapper>
      <p>
      TODO: Acknowledgement of country
      </p>
    </Wrapper>
  )
}

export default Footer
