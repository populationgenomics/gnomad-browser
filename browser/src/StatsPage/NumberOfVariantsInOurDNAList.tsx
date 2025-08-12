import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin-left: 2rem;
`

const Section = styled.div`
  margin-bottom: 1em;
`

const SectionHeader = styled.div`
  font-size: 1.1em;
  font-weight: bold;
`

export const SectionList = styled.ul`
  margin-top: 0.5em;

  li {
    margin-bottom: 0.5em;
  }
`

const NumberOfVariantsInOurDNAList = () => {
  return (
    <Container>
      <Section>
        <SectionHeader>Short variants</SectionHeader>
        <SectionList>
          {/* <li>Total SNVs: 786,500,648</li>
              <li>Total INDELs: 122,583,462</li> */}
          <li>
            Variant type* counts
            <SectionList>
              <li>Synonymous: 719,413</li>
              <li>Missense: 1,321,931</li>
              <li>Nonsense: 35,735</li>
              <li>Frameshift: 36,991</li>
              <li>Canonical splice site: 33,237</li>
            </SectionList>
          </li>
        </SectionList>
        <div style={{ fontSize: '0.75em' }}>
          <i>
            *This is only a subset of commonly asked for variant types from the dataset. Variants
            are filtered to unique observations and passing all quality filters.
          </i>
        </div>
      </Section>
      {/* <Section>
          <SectionHeader>Structural variants</SectionHeader>
          <SectionList>
          <li>
          1,199,117 genome SVs
          <SectionList>
          <li>627,947 Deletions</li>
          <li>258,882 Duplications</li>
          <li>711 CNVs</li>
          <li>296,184 Insertions</li>
          <li>2,185 Inversions</li>
          <li>13,116 Complex</li>
          <li>92 Canonical reciprocal translocations</li>
          </SectionList>
          </li>
          <li>
          {`66,903 rare (<1% site frequency (SF)) exome CNVs`}
          <SectionList>
          <li>30,877 Deletions</li>
          <li>36,026 Duplications</li>
          </SectionList>
          </li>
          </SectionList>
          </Section>
          <Section>
          <SectionHeader>Average number of variants per person</SectionHeader>
          <SectionList>
          <li>
          SNVs per person (<i>coming soon</i>)
          </li>
          <li>{`1 rare (<1% SF) coding CNV per individual`}</li>
          <li>11,844 SVs per genome</li>
          </SectionList>
          </Section> */}
    </Container>
  )
}

export default NumberOfVariantsInOurDNAList
