const CONFIG = {
    sort: {
        column: 'Gene',
        order: 'asc'
    },
    columns: {
        Gene: {
            name: 'Gene',
            filterText: '',
            defaultSortOrder: 'asc'
        },
        Chr: {
            name: 'Chr',
            filterText: '',
            defaultSortOrder: 'asc'
        },
        Position: {
            name: 'Position',
            filterText: '>= 0',
            defaultSortOrder: 'asc'
        }
    }
};
// Genomic Grid Config
class _GenomicGridConfig {

    getConfig() {
        return CONFIG;
    }
}

export const GenomicGridConfig = new _GenomicGridConfig();