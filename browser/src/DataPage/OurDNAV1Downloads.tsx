import React from 'react'

import { ListItem } from '@gnomad/ui'

import {
  Column,
  ColumnsWrapper,
  DownloadLinks,
  DownloadsSection,
  FileList,
  SectionTitle,
  StyledParagraph,
} from './downloadsPageStyles'

const exomeChromosomeVcfs = [
  { chrom: '1', size: '968.42 MiB', md5: 'qMrxnP88pCAarPzAZGysDg==' },
  { chrom: '2', size: '753.9 MiB', md5: 'JiFN2aCMvdk8C0tBDANgSg==' },
  { chrom: '3', size: '599.85 MiB', md5: '7Sn7PXxCzCXxF1tmGXCQGA==' },
  { chrom: '4', size: '405.63 MiB', md5: 'trt7+USRJhKnG29QItRf9w==' },
  { chrom: '5', size: '453.08 MiB', md5: 'z9hVKSEMokzx/KNJZQZbLQ==' },
  { chrom: '6', size: '470.79 MiB', md5: '3HoE5RFGPo6GDapEtxPr/Q==' },
  { chrom: '7', size: '510.54 MiB', md5: 'fm7UyEWDnho0Igu9h3X0CA==' },
  { chrom: '8', size: '387.74 MiB', md5: 'DTYgdD4TFNXLCbvwv8HbZw==' },
  { chrom: '9', size: '396.95 MiB', md5: 'bJvx/Sauky7BW15+y5wtVA==' },
  { chrom: '10', size: '388.09 MiB', md5: 'nLL6+YpvpxxZPgC3Ri8qtg==' },
  { chrom: '11', size: '605.96 MiB', md5: 'YEQMyFuIAGQJmxpdq+8HYg==' },
  { chrom: '12', size: '564.59 MiB', md5: 'Bzw+HSFp5RflbdLMuUT9kg==' },
  { chrom: '13', size: '184.33 MiB', md5: 'XtkNGwxtS0Y25FFkmnhSyQ==' },
  { chrom: '14', size: '368.6 MiB', md5: 'a7weiXFKvbP5yFZeTGU11A==' },
  { chrom: '15', size: '399.41 MiB', md5: '6lqdHy9siDGlhnqhK5uSeg==' },
  { chrom: '16', size: '548.08 MiB', md5: 'CMC9TB1Scao6YfYD/IHxbw==' },
  { chrom: '17', size: '658.62 MiB', md5: 'oBrYC52XIuOOiEbS8ksCnQ==' },
  { chrom: '18', size: '185.52 MiB', md5: 'o3zgDRo4xVgnukynkcfBuw==' },
  { chrom: '19', size: '708.75 MiB', md5: 'PsfGeYi4L8GWl85KjYYujA==' },
  { chrom: '20', size: '248.51 MiB', md5: 'VWZgx7sxekiUPoSB8pwK/w==' },
  { chrom: '21', size: '124.59 MiB', md5: 'ketDHVrYayzekc9mIdDPww==' },
  { chrom: '22', size: '271.52 MiB', md5: 'zBhbwO7VPwB+iDcXBGxYZQ==' },
  { chrom: 'X', size: '307.99 MiB', md5: 'KGXJBum9Uuwrejf2dvp56w==' },
  { chrom: 'Y', size: '11.07 MiB', md5: 'vvu7H477zN1lw1xpPQz3zA==' },
  { chrom: 'M', size: '5931.42 KiB', md5: '+y0+Dhd/QYui/r2E6E5HyA==' },
]

const genomeChromosomeVcfs = [
  { chrom: '1', size: '2731.69 MiB', md5: 'dkqotpeVVnqxuxxL+P8lNw==' },
  { chrom: '2', size: '2708.51 MiB', md5: 'P6UdPDl+qdAAue9T7g5dIA==' },
  { chrom: '3', size: '2233.76 MiB', md5: 'YPoUkDb/F6nnG7ljdwWrZA==' },
  { chrom: '4', size: '2098.6 MiB', md5: 'yRUoBPp7tt/z/QBbjDXCUQ==' },
  { chrom: '5', size: '1918.65 MiB', md5: '8BDSjLwL9fYL+7aOUd60+w==' },
  { chrom: '6', size: '1909.14 MiB', md5: 'XH8aMq+FDnhToCGdE5y61g==' },
  { chrom: '7', size: '1895.58 MiB', md5: 'm+77XWOqRm9Mb0Iixd6IYQ==' },
  { chrom: '8', size: '1703.07 MiB', md5: 'nPjSDU7bSu0fMv60RTOBAg==' },
  { chrom: '9', size: '1464.3 MiB', md5: 'EBlL3yndpjrlgnvKhhK09A==' },
  { chrom: '10', size: '1623.78 MiB', md5: 'r+Kd8bloA9Q4BZ1wRRR8sQ==' },
  { chrom: '11', size: '1639.86 MiB', md5: '4GIqnlf9JLwV46xqzvRb5Q==' },
  { chrom: '12', size: '1577.24 MiB', md5: 'pnf3NhaatOUCGx207/Uf4g==' },
  { chrom: '13', size: '1090.28 MiB', md5: 'rbgVkJGEXdo/0L1n611x3A==' },
  { chrom: '14', size: '1041.64 MiB', md5: 'YBq27BAraTKLv1J+vL3Tqg==' },
  { chrom: '15', size: '1016.67 MiB', md5: 'jznujLg5EcMI9K9/32vm6w==' },
  { chrom: '16', size: '1179.59 MiB', md5: '1YTAK/IBuN5MoCmDKe1LfA==' },
  { chrom: '17', size: '1125.67 MiB', md5: 'LxgJHHj73RXLn7dI1V6n5A==' },
  { chrom: '18', size: '910.39 MiB', md5: '9Xkqe3nWw2L2l2eVdEr4fg==' },
  { chrom: '19', size: '922.15 MiB', md5: 'qpPgp8GOf7F7wK/XxvanQw==' },
  { chrom: '20', size: '784.25 MiB', md5: '14bC/MbZkCZ18mPzrp2rIA==' },
  { chrom: '21', size: '506.98 MiB', md5: 'JIPLC7I9PfBmLnfnBx7f3w==' },
  { chrom: '22', size: '574.21 MiB', md5: 'UtGJQOxwalqD42V1R/vUAQ==' },
  { chrom: 'X', size: '1508.61 MiB', md5: '2UwtCIJZs59200GFT3tmtg==' },
  { chrom: 'Y', size: '127.87 MiB', md5: 'bqnsg/dGRR2McWuYGCSPig==' },
  { chrom: 'M', size: '24.43 KiB', md5: 'ctJeBrEBvUPI/BrFvRrRiQ==' },
]

const jointChromosomeVcfs = [
  { chrom: '1', size: '5943.94 MiB', md5: 'eqh5o0QsG0/VEjBa6zWrgA==' },
  { chrom: '2', size: '5314.12 MiB', md5: 'lUfJVfbu8priXXUtsJlafA==' },
  { chrom: '3', size: '4254.68 MiB', md5: 'gyHiVB7vXg6ru5EdUQlGMA==' },
  { chrom: '4', size: '3907.17 MiB', md5: 'w/j6DPmHc4wCkiGTXXwqtw==' },
  { chrom: '5', size: '3747.62 MiB', md5: 'V81rkIrTe8HkLsySaC4K+A==' },
  { chrom: '6', size: '3699.4 MiB', md5: 'RjDcEfcplogcKzUOyAk/PQ==' },
  { chrom: '7', size: '3802.94 MiB', md5: 'a6ZYNDvAVUxxXgy/5DtlzQ==' },
  { chrom: '8', size: '3209.58 MiB', md5: '2dwrBVTlkL6y0HuBA/Vc6Q==' },
  { chrom: '9', size: '3014.9 MiB', md5: 'h1yPm83h4f7j6p9okFZ0tQ==' },
  { chrom: '10', size: '3158.09 MiB', md5: 'fy58ostabi8WQDRMYtdVYQ==' },
  { chrom: '11', size: '3537.3 MiB', md5: 'NPryDT878StGseTCokDz9Q==' },
  { chrom: '12', size: '3394.59 MiB', md5: '/smULhvqnYpkFZwbab1UmA==' },
  { chrom: '13', size: '2174.47 MiB', md5: 'VLk1Wr8sZP8fSuXKtCGUrQ==' },
  { chrom: '14', size: '2141.59 MiB', md5: 'f4ajs/4RPlM85+erG/3FiQ==' },
  { chrom: '15', size: '2197.61 MiB', md5: 'dv5TJNzod/LwpteC8idxtA==' },
  { chrom: '16', size: '2588.23 MiB', md5: 'WWzMZTc4SNFSU9mYAZzSsA==' },
  { chrom: '17', size: '2650.43 MiB', md5: 'i4jbdLx/Ds4RQxhX31oRKg==' },
  { chrom: '18', size: '1799.89 MiB', md5: 'DQf0f801NB0sHqR4Gkg1GA==' },
  { chrom: '19', size: '2479.3 MiB', md5: '6KBMF6NUfgIZ570L6ATd+Q==' },
  { chrom: '20', size: '1672.86 MiB', md5: 'UkhN/opsJulTygdbv6Gnsg==' },
  { chrom: '21', size: '945.08 MiB', md5: '+wHI2ajB5O97cZPwKmjuzA==' },
  { chrom: '22', size: '1321.32 MiB', md5: 'UErVvGB3K8KiK8YI5ajdWg==' },
  { chrom: 'X', size: '3333.5 MiB', md5: 'uNJSk/++SM1nKTJwZAkDGw==' },
  { chrom: 'Y', size: '227.55 MiB', md5: 'qRg9i50uc7hyQ8aPKd/NWw==' },
  { chrom: 'M', size: '7245.44 KiB', md5: 'SwGVj5O6ao+9mYYAi4bxKw==' },
]

const GnomadV4Downloads = () => {
  return (
    <>
      <SectionTitle id="v1" theme={{ type: 'release' }}>
        Downloads
      </SectionTitle>
      <StyledParagraph>
        The OurDNA v1 dataset contains data from 2,211 whole genomes and 10,671 exomes, all mapped
        to the GRCh38 reference sequence.
      </StyledParagraph>

      <DownloadsSection>
        <SectionTitle id="v1-variants">Variants</SectionTitle>
        <ColumnsWrapper>
          <Column>
            <h3>Exomes</h3>
            <FileList>
              {exomeChromosomeVcfs.map(({ chrom, size, md5 }) => (
                // @ts-expect-error TS(2769) FIXME: No overload matches this call.
                <ListItem key={chrom}>
                  <DownloadLinks
                    label={`chr${chrom} sites VCF`}
                    path={`/release/1.0/vcf/exomes/chr${chrom}_variants.vcf.bgz`}
                    size={size}
                    md5={md5}
                    associatedFileType="CSI"
                    logClicks
                  />
                </ListItem>
              ))}
            </FileList>
          </Column>

          <Column>
            <h3>Genomes</h3>
            <FileList>
              {genomeChromosomeVcfs.map(({ chrom, size, md5 }) => (
                // @ts-expect-error TS(2769) FIXME: No overload matches this call.
                <ListItem key={chrom}>
                  <DownloadLinks
                    label={`chr${chrom} sites VCF`}
                    path={`/release/1.0/vcf/genomes/chr${chrom}_variants.vcf.bgz`}
                    size={size}
                    md5={md5}
                    associatedFileType="CSI"
                    logClicks
                  />
                </ListItem>
              ))}
            </FileList>
          </Column>
        </ColumnsWrapper>
      </DownloadsSection>

      <DownloadsSection>
        <SectionTitle id="v1-joint-freq-stats">Joint Frequency</SectionTitle>
        <FileList>
          {jointChromosomeVcfs.map(({ chrom, size, md5 }) => (
            // @ts-expect-error TS(2769) FIXME: No overload matches this call.
            <ListItem key={chrom}>
              <DownloadLinks
                label={`chr${chrom} sites VCF`}
                path={`/release/1.0/vcf/joint/chr${chrom}_variants.vcf.bgz`}
                size={size}
                md5={md5}
                associatedFileType="CSI"
                logClicks
              />
            </ListItem>
          ))}
        </FileList>
      </DownloadsSection>
    </>
  )
}

export default GnomadV4Downloads
