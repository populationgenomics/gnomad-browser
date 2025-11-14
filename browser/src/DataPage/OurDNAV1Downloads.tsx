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
  { chrom: '1', size: '17.5 GiB', md5: '848be4d85c953bc73a8e4f0c97026a72' },
  { chrom: '2', size: '13.3 GiB', md5: 'e2f5d891a3374e88d1c3136f94bed0ea' },
  { chrom: '3', size: '10.79 GiB', md5: 'a35b949b32453b4b5abd7b1de42e298a' },
  { chrom: '4', size: '7.18 GiB', md5: 'c7c7008a73acbb8fea68b82951842832' },
  { chrom: '5', size: '7.91 GiB', md5: 'c1016f56be62deb2e947fed4d31302dd' },
  { chrom: '6', size: '8.5 GiB', md5: 'f96bc8711ed085d63b8bd5396664adbc' },
  { chrom: '7', size: '9.01 GiB', md5: 'c41cd52571b001cf7d3e388a668e4dff' },
  { chrom: '8', size: '6.78 GiB', md5: 'a47777fe141c01876cb170f2c2f2e6b6' },
  { chrom: '9', size: '7.49 GiB', md5: 'c5abd4d8aff12f2bf8b4ec844769782f' },
  { chrom: '10', size: '7.32 GiB', md5: '4befc8dc50ead888e8af24f556c9fdd6' },
  { chrom: '11', size: '10.84 GiB', md5: '3833ce3ab046afe92c9b55df93a61ec8' },
  { chrom: '12', size: '9.9 GiB', md5: 'e530a9ed203cdcc914621ab7430774bb' },
  { chrom: '13', size: '3.3 GiB', md5: 'af1eab40c8be47c8c7c04dc73e0333e4' },
  { chrom: '14', size: '6.21 GiB', md5: 'd0e0fa71d94bf016a061ba4dc0bd869f' },
  { chrom: '15', size: '6.87 GiB', md5: '01b116e34b3815cfd1d3afa53a29a41b' },
  { chrom: '16', size: '9.1 GiB', md5: '44137843b2df39c8a654427181bda919' },
  { chrom: '17', size: '11.19 GiB', md5: 'c61978218ab3eaa07b571eb9959f39d2' },
  { chrom: '18', size: '3.16 GiB', md5: '1ec708d5cae9657ccee0626763ed9946' },
  { chrom: '19', size: '11.75 GiB', md5: '50a37cfa9a9a3e030388bcf15bdabb79' },
  { chrom: '20', size: '4.43 GiB', md5: '605680cd99e469bdf5f0045bd22359c9' },
  { chrom: '21', size: '2.1 GiB', md5: '7ca6d51a42425b857eddb46d7bc5832d' },
  { chrom: '22', size: '4.71 GiB', md5: 'dcf191563e69054a71bd4dc77862799a' },
  { chrom: 'X', size: '5.35 GiB', md5: '5b7b17d3d4cff22c20480a908c861a28' },
  { chrom: 'Y', size: '108.3 MiB', md5: 'd500cf5a73c53f02d1b95f1e092f2e49' },
  { chrom: 'M', size: '108.3 MiB', md5: 'd500cf5a73c53f02d1b95f1e092f2e49' },
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
  { chrom: '1', size: '67.11 GiB', md5: '11c62331b0a654fce6a9cd43838de648' },
  { chrom: '2', size: '64.64 GiB', md5: '563a8fe6f148621169b0215ac9f19602' },
  { chrom: '3', size: '52.28 GiB', md5: 'c44f1661bafc15685f1eee593b4886ea' },
  { chrom: '4', size: '48.04 GiB', md5: 'e6d438b84539c6adad5bc67d6febb33b' },
  { chrom: '5', size: '46.04 GiB', md5: 'd226db0e0055b5e87e72f4b63158664a' },
  { chrom: '6', size: '44.57 GiB', md5: '2820f13a2439ebbdf55066a0c320cdb5' },
  { chrom: '7', size: '44.26 GiB', md5: 'd1d50e4fa082246a5787eee76c036189' },
  { chrom: '8', size: '39.26 GiB', md5: '195f2825e94c9b5e43b34bb2b1ab5c7b' },
  { chrom: '9', size: '35.19 GiB', md5: '1c739fb01fd9de816e3fddc958668627' },
  { chrom: '10', size: '36.48 GiB', md5: 'e2f174f150b5d709d5d7349ac241c438' },
  { chrom: '11', size: '39.79 GiB', md5: 'b8651f2e5a0aafa23d7fc3406b35bc69' },
  { chrom: '12', size: '38.53 GiB', md5: '62795bafd326eae566ef49781a26bc91' },
  { chrom: '13', size: '23.84 GiB', md5: '92244327bee6d45973f6077a8134ccd9' },
  { chrom: '14', size: '25.82 GiB', md5: 'f7a8344b03a4162cb71cdb628dd1e15b' },
  { chrom: '15', size: '25.58 GiB', md5: '40c8ab829f973688d2ef891ce5acabb7' },
  { chrom: '16', size: '29.46 GiB', md5: '58a5f920fc191b2069126c41278cc077' },
  { chrom: '17', size: '29.64 GiB', md5: 'aa48657f45d8db7711c69fbf71a25cdc' },
  { chrom: '18', size: '19.08 GiB', md5: '80dd729bc61be464c964d3a3bfb0f41a' },
  { chrom: '19', size: '27.07 GiB', md5: '1853ca4993ceb25bd6f3a4554173f7cf' },
  { chrom: '20', size: '18.11 GiB', md5: '09263d3c29b822760c61607c6398f5c4' },
  { chrom: '21', size: '11.03 GiB', md5: '2ec2d9876d61fc9c5b1e84ab6841b62e' },
  { chrom: '22', size: '14.57 GiB', md5: 'df15a5ea8ae2e3090eae112f548c74ef' },
  { chrom: 'X', size: '35.49 GiB', md5: 'a5288ced0c2fe893fcfae4d2022b9cd9' },
  { chrom: 'Y', size: '777.46 MiB', md5: '7b882f00919d582139acbc116a7a559f' },
  { chrom: 'M', size: '108.3 MiB', md5: 'd500cf5a73c53f02d1b95f1e092f2e49' },
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
                    path={`/release/4.1/vcf/exomes/gnomad.exomes.v4.1.sites.chr${chrom}.vcf.bgz`}
                    size={size}
                    md5={md5}
                    associatedFileType="TBI"
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
                path={`/release/4.1/vcf/joint/gnomad.joint.v4.1.sites.chr${chrom}.vcf.bgz`}
                size={size}
                md5={md5}
                associatedFileType="TBI"
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
