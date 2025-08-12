## OurDNA v1 data contributors

The OurDNA v1 release shown in this browser combines DNA sequencing data from several Australian cohorts:
- 10,671 exomes generated as part of [Mackenzie's Mission](https://www.mackenziesmission.org.au/) (led by Martin Delatycki, Edwin Kirk, and Nigel Laing)
- 1,254 genomes from the BioHEART cohort (led by Gemma Figtree), generated and analysed by the Centre for Population Genomics
- 868 genomes from the Tasmanian Ophthalmic Biobank (led by Alex Hewitt), generated and analysed by the Centre for Population Genomics
- 89 genomes from members of the Australian Filipino community recruited as part of the [OurDNA program](https://www.ourdna.org.au) (led by Daniel MacArthur)
<br />
<br />

## The Centre for Population Genomics

The OurDNA program is led by the [The Centre for Population Genomics](https://populationgenomics.org.au) (CPG), a not-for-profit research initiative jointly based at the Garvan Institute of Medical Research and the Murdoch Children’s Research Institute that is working with Australian communities to build a more equitable future for genomic medicine. 

For links to some of our [publications](https://populationgenomics.org.au/about-us/resources/publications/), some [talks](https://populationgenomics.org.au/about-us/resources/talks/) by our team members, and for information on the CPG’s open source [software tools](https://populationgenomics.org.au/about-us/resources/software-tools-2/) that support our work, please see the [Centre for Population Genomics](https://populationgenomics.org.au) website.
<br />
<br />

## The OurDNA program

The OurDNA program, led by the Centre for Population Genomics, is designed to increase the genomic representation for diverse Australian communities. The OurDNA program aims to aggregate and share genetic variation data from over 20,000 Australians, including 8,000 new high-quality whole genome sequences from participants from genomically underrepresented groups recruited following participatory community engagement.

The OurDNA program is currently producing three key resources:

- **OurDNA Samples** - a lab that stores participants’ donated blood and cells for future health and medical research according to participants’ consent

- **OurDNA Data** - a controlled-access repository of participants’ individual-level genomic information for future research according to participants’ consent

- **OurDNA Browser** - an open access genetic variation reference database for use by clinicians and researchers to guide disease prediction, diagnosis and treatment

To read more, please see the [program website](https://www.ourdna.org.au) and the [CPG Zenodo Community](https://zenodo.org/communities/populationgenomics/records).

The OurDNA program is overseen by the director of the Centre for Population Genomics, Daniel MacArthur. To learn more about program governance and institutional support, please see the information on the Centre's Funding below and our Team page.
<br />
<br />

## The OurDNA Browser

### Overview

The OurDNA browser provides access to key summary statistics and allele frequency information from from the OurDNA program and contributing projects. It contains data from healthy individuals that self-identify as having ancestry from Australian multicultural communities represented in the OurDNA program. Data from the OurDNA browser is designed to integrate with clinical pipelines to support researchers and doctors to find disease-causing genes, understand diversity and improve medical treatments for Australians of diverse backgrounds.

The current browser release (August 2025) contains data from OurDNA participants who self-identify as having Australian Filipino ancestry only. Version 1 of the OurDNA dataset is composed of:

- 2,211 genomes
- 10,671 exomes

[See our stats page](/stats) for additional summary statistics.

### Community Engagement

Community engagement and participation have been central to building the OurDNA Browser. Some of our approaches to partnering with communities are described on the [OurDNA website](https://ourdna.org.au/ourdna-communities/partnering-with-communities), and a detailed report on the process and outcomes of Multicultural Community Consultation specifically relating to this browser can be found [here](https://zenodo.org/records/16757504).

We also strongly encourage all users to read our [Policies and Expectations for Data Use](/policies) page for more information.

### Methods

All of the raw data from OurDNA and other contributing projects have been (re)processed through CPG's pipelines to create a harmonised callset. Short-read sequencing data was processed according to the DRAGEN-GATK Best Practices guidelines, which includes alignment to GRCh38 using the open-source DRAGEN mapper, DRAGMAP, and variant calling with GATK HaplotypeCaller to discover single-nucleotide variants (SNVs) and insertion-deletions (indels). All samples were aggregated using the hail gVCF Combiner, and then sample and variant quality control was performed on the joint call set in line with gnomAD best practices.

For full details on dataset releases, including methodologies for annotation and QC, please refer to the OurDNA Browser [blog](/news). For details on the software releases that support the browser, please see the browser’s [GitHub page](https://github.com/populationgenomics/gnomad-browser). Further description of methodologies will be included in a forthcoming flagship paper.

Aggregate data download is currently under development. Please check back for a release date.

### Ethics approval

The aggregation and release of summary data from the exomes and genomes included in this browser has been approved by [the Royal Children's Hospital Human Research Ethics Committee](/ethics-contact) (HREC/84612/RCHM-2022, HREC/91986/RCHM-2023).
<br />
<br />

## Funding

The [Garvan Institute of Medical Research](https://www.garvan.org.au/) and [Murdoch Children’s Research Institute](https://www.mcri.edu.au/) have contributed substantially to the development of this resource via their significant funding support for the Centre for Population Genomics, enabled by the generosity of donors.

Funding for this research has also been provided by the Australian Government’s Medical Research Future Fund (MRFF) grant 2015969 (CIA Daniel MacArthur; 2022-2027) from the Genomics Health Futures Mission and by  National Health and Medical Research Council (NHMRC) investigator grant 2009982 (CIA Daniel MacArthur; 2022-2026).

The contents of this published material are solely the responsibility of the authors and do not reflect the views of the Commonwealth of Australia or the NHMRC.

The OurDNA program also receives support from Google’s [Digital Future Initiative](https://blog.google/intl/en-au/company-news/googles-digital-future-initiative/).
