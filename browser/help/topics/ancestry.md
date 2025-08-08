---
id: ancestry
title: 'Genetic Ancestry in AGDD'
---

### Genetic ancestry Groups
In our next release, we will have a blog post on genetic ancestry that will explain our process in more detail, and provide additional commentary on the benefits and limitations of using genetically-derived ancestry.

In AGDD we provide the following genetic ancestry groups:

#### OurDNA
Individuals in OurDNA recruited following participatory community engagement.
- Australian Filipino

#### Genetic ancestry regions

- Middle Eastern and North African
- East and South East Asian
- European
- Central and South Asian
- African, African American, and African Caribbean
- Unclassified

These labels/groupings correspond to the harmonised labels proposed by Koenig et. al, but modified in accordance with our attempts to minimise misinformation regarding genetic ancestry.

We emphasise that each of these genetic ancestry groups should be thought of as a grouping of *ancestries*, and that these groupings could be either too broad or too narrow with respect to the particular scientific question relevant to an analyst.

### Genetic ancestry identification


To define a set of high quality sites, we:
- restricted to sites that pass filtering in gnomAD v4.1 genomes
- were callable across WES and WGS AGDD datasets

Using the [`hwe_normalized_pca` function in Hail](https://hail.is/docs/0.2/methods/genetics.html#hail.methods.hwe_normalized_pca) we computed the 25 first principal components (PCs) on well-behaved bi-allelic autosomal QC SNVs on all unrelated samples.

For each subset, WES or WGS, PCA is run on the entire dataset at once, excluding first and second degree relatives. We then train a random forest classifier on samples with provided ancestry labels using the PCs as features, including the number of principal components that maximises hold-out test set accuracy and probability of group assignment. For this release, we used 12 PCs for WES ancestry assignment, and 14 PCs for WGS ancestry assignment.

We assigned an ancestry label when the probability of group assignment was >= 0.8.

Any samples that we were unable to cluster using these probabilities were grouped into "Unclassified".

We have not performed genetic ancestry sub-group clustering at this time.
