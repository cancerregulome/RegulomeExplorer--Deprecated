const CONFIG = {
    sort: {
        column: 'logp',
        order: 'desc'
    },
    columns: {
        FeatureA: {
            name: 'Feature 1',
            filterText: '',
            defaultSortOrder: 'asc'
        },
        FeatureB: {
            name: 'Feature 2',
            filterText: '',
            defaultSortOrder: 'asc'
        },
        logp: {
            name: '-log10(p)',
            filterText: '>= 2',
            defaultSortOrder: 'desc'
        },
        correlation: {
            name: 'Correlation',
            filterText: '',
            defaultSortOrder: 'desc'
        },
        sampleSize: {
            name: 'Sample Size',
            filterText: '>= 0',
            defaultSortOrder: 'desc',
            hidden: true
        },
        distribution: {
            name: 'Distribution',
            filterText: '',
            defaultSortOrder: 'desc',
            graph: true,
            graphType: 'bar'
        }
    }
};
// Genomic Grid Config
export class AssociationGridConfig {

    getConfig() {
        return CONFIG;
    }
}