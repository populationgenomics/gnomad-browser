const {
  subsets: gnomadV4SubsetSampleCounts,
  ...gnomadV4SampleCounts
} = require('./datasets/gnomad-v4/sampleCounts')

const sampleCounts = [
  { gnomad_sv_r4: { total: 0 } },
  { ourdna: { total: 12882 } },
  { gnomad_cnv_r4: { total: 0 } }, // TODO: should not be called "subset"
  { gnomad_r4: gnomadV4SampleCounts },
  ...Object.keys(gnomadV4SubsetSampleCounts).map((subset) => ({
    [`gnomad_r4_${subset}`]: gnomadV4SubsetSampleCounts[subset],
  })),
].reduce(Object.assign, {})

export default sampleCounts
