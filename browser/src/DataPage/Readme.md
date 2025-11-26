# OurDNA v1 Data Downloads README

## Overview

The OurDNA small variant frequency callset is available for download as Variant Call Format (VCF) `v4.2` files created using Hail `v0.2.134-2bb197d63afd`. We provide 3 separate sets of data; genomes, exomes, and joint frequency containing the merged set of the two. URLs are provided for each chromosome and can be downloaded from our requester-pays bucket. See our Data page for instructions on how to use this.

Information about the contigs, assembly and fields contained in the VCF can be examined using `bcftools`, for example:

```bash
bcftools view -h chr21_variants.vcf.bgz
```

This will provide the names and detailed descriptions of each field / column.

This README is intended to assist you in integrating the OurDNA callsets into your existing workflows, providing details where our data differs to gnomAD's v4.1 small variant frequency callsets.

Alternatively, for assistance getting started using VCF callsets, please refer to the gnomAD team's blog and Terra demo workspace for some example workflows at <https://terra.bio/a-demo-workspace-for-working-with-gnomad-data-in-terra/>. Note that OurDNA does not currently have a Terra demo workspace.

## Population and ancestry groups

The following ancestry labels are used:

| Label | Full name                |
| ----- | ------------------------ |
| CSA   | Central/South Asian      |
| EAS   | East and Southeast Asian |
| EUR   | Euroean                  |
| FIL   | Filipino                 |
| NA    | Unclassified.            |

Note that these ancestry labels differ to gnomAD's lowercase groups of `afr`, `ami`, `amr`, `asj`, `eas`, `fin`, `mid`, `nfe` and `sas`.

## Annotations

Variant Effect Predictor (VEP) annotations are provided using VEP's standard string format. The following fields are included:

```bash
Allele
Consequence
IMPACT
SYMBOL
Gene
Feature_type
Feature
BIOTYPE
EXON
INTRON
HGVSc
HGVSp
cDNA_position
CDS_position
Protein_position
Amino_acids
Codons
ALLELE_NUM
DISTANCE
STRAND
FLAGS
VARIANT_CLASS
SYMBOL_SOURCE
HGNC_ID
CANONICAL
MANE_SELECT
MANE_PLUS_CLINICAL
TSL
APPRIS
CCDS
ENSP
UNIPROT_ISOFORM
SOURCE
DOMAINS
miRNA
HGVS_OFFSET
PUBMED
MOTIF_NAME
MOTIF_POS
HIGH_INF_POS
MOTIF_SCORE_CHANGE
TRANSCRIPTION_FACTORS
LoF
LoF_filter
LoF_flags
LoF_info
EXISTING_UORFS
EXISTING_INFRAME_OORFS
EXISTING_OUTOFFRAME_OORFS
5UTR_CONSEQUENCE
5UTR_ANNOTATION
AM_CLASS
AM_PATHOGENICITY
```

Note that the gnomAD v4.1 data contains separate, additional columns for some in silico predictors such as `CADD`, `REVEL`, `SIFT`, `PolyPhen`, `SpliceAI`, `Pangolin`, `PhyloP` and GA4GH Variation Representation Specification (VRS) IDs.

## Assembly and contigs

OurDNA's callsets were processed using the full ALT-aware GRCh38 analysis set.

## Differences between the joint, genome and exome callsets

The joint callset includes separate columns for the AC, AF and AN for each of `_genomes`, `_exomes` and `_joint` sets.

VQSR is not able to be run on the joint callset and so the joint callset does not include `AS_VQSR` and `AS_lowqual` columns. We instead include columns for `BOTH_FILTERED`, `EXOMES_FILTERED` and `GENOMES_FILTERED` for each variant. `AS_VQSR` and `AS_lowqual` are moved to the `genomes_filters` and `exomes_filters` strings.

Both the joint and exome callsets include the `outside_capture_region` and `outside_calling_region` flags corresponding to whether a variant falls within exome capture regions.

## Other differences to gnomAD

Note that the column named `inbreeding_coeff` in the OurDNA data is named `InbreedingCoeff` in gnomAD v4.1.

The OurDNA data includes an `AS_lowqual` column flagging any variants that fall below a low quality threshold that is not present in gnomAD v4.1.
