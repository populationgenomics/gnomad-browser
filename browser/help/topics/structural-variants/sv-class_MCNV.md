---
id: sv-class_MCNV
title: 'SV class: multiallelic CNV'
---

Classification: _Unbalanced canonical<sup>*</sup> SV_

![Multiallelic CNV (MCNV)](OurDNA_browser.SV_schematics_MCNV.png)

Multiallelic CNVs are regions of the genome with common CNVs that exist at numerous distinct copy states. This includes sites with identical deletion and duplication alleles, or duplication alleles of multiple copies. For additional detail on MCNVs, see [Handsaker et al., 2015](https://www.ncbi.nlm.nih.gov/pubmed/25621458).

In OurDNA, we defined a site as an MCNV if at least four copy states were observed, each which included at least 1% of all samples. MCNVs in OurDNA are not resolved per haplotype; thus, the copy number frequencies provided here represent the fraction of samples with N total copies of a given locus when summed between both homologues.

\* Note: in OurDNA, MCNVs are considered as a class of canonical SV despite sometimes involving both deletion and duplication signatures. Some MCNVs are likely more complex than detailed in OurDNA.
