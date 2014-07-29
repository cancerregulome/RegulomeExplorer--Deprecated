const CONFIG = {
    sort: {
        column: 'logp',
        order: 'desc'
    },
    rows: {
        createKey: (x) => x.FeatureA + '_' + x.FeatureB
    },
    columns: {
        id: {
            name:'id',
            filter: {
                text: ''
            },
            hidden: true
        },
        FeatureA: {
            name: 'Feature 1',
            filter: {
                text: ''
            },
            defaultSortOrder: 'asc'
        },
        FeatureB: {
            name: 'Feature 2',
            filter: {
                text: ''
            },
            defaultSortOrder: 'asc'
        },
        logp: {
            name: '-log10(p)',
            type : Number,
            filter: {
                text: '>= 2'
            },
            defaultSortOrder: 'desc'
        },
        correlation: {
            name: 'Correlation',
            filter: {
                text: ''
            },
            defaultSortOrder: 'desc'
        },
        sampleSize: {
            name: 'Sample Size',
            type : Number,
            filter: {
                text: '>= 0'
            },
            defaultSortOrder: 'desc',
            hidden: true
        },
        distribution: {
            name: 'Distribution',
            filter: {
                text: ''
            },
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