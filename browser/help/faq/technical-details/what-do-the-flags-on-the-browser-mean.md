---
question: 'What do the flags on the browser mean?'
---

Flags that will appear on variant pages:

- AC0: The allele count is zero after filtering out low-confidence genotypes (GQ < 20; DP < 10; and AB < 0.2 for het calls)
- AS-VQSR: Failed GATK Allele-Specific Variant Quality Recalibration (AS-VQSR)
- InbreedingCoeff: The Inbreeding Coefficient is < -0.3
- No variant: Variant was not called in the specified data type, i.e., no samples in that data type had a non-reference genotype call. Currently, we do not distinguish between sites where genotype calls were made but all individuals were homozygous reference, and sites where no call could be made; this information will be incorporated in a upcoming release. 

Flags that will appear in the variant table on gene/region pages:

- Monoallelic: All samples are homozygous alternate for the variant in the given datatype
- Only heterozygous: All samples are heterozygous for the variant
- LCR: Found in a low complexity region
- LC pLoF: Low-confidence pLoF, variant determined by [LOFTEE](https://github.com/konradjk/loftee) to be likely not LoF for the transcript
- pLoF Flag: Flagged by [LOFTEE](https://github.com/konradjk/loftee), a warning provided by LOFTEE to use caution when interpreting the transcript or variant
- NC Transcript: Marked in a putative LoF category by VEP (essential splice, stop-gained, or frameshift) but appears on a non-protein-coding transcript
- SEGDUP: Found in a region overlapping a segmental duplication
