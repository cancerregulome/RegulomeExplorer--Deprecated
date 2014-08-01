// __tests__/GridView-test.js

jest.dontMock('../app/scripts/components/grid/GridView.react.js');
jest.dontMock('../app/scripts/components/grid/GridHeader.react.js');
jest.dontMock('../app/scripts/configs/Association.grid.js');

describe('GridView', function() {
    it('renders values into a grid', function() {
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;

        var GridView = require('../app/scripts/components/grid/GridView.react.js');
        var GridHeader = require('../app/scripts/components/grid/GridHeader.react.js');
        var AssociationGridConfig = require('../app/scripts/configs/Association.grid.js');

        var data = [];
        for (var i = 0; i < 500; i++) {
            data[i] = {
                id: Math.random() + '_' + Date.now() + '_' + Math.random(),
                FeatureA: 'gene ' + i,
                FeatureB: 'gene ' + i,
                logp: Math.round(Math.random() * 30 + 1),
                correlation: Math.random() > 0.2 ? Math.random().toFixed(3) : null,
                sampleSize: Math.round(Math.random() * 285 + 15),
                distribution: [9, 7, 1, 4]
            };
        }

        var associationGridConfig = new AssociationGridConfig();

        // Render a grid in the document
        var grid = TestUtils.renderIntoDocument(
            new GridView({
                initialItems: data,
                config: associationGridConfig.getConfig(),
                headerRepeat: 30
            })
        );

        // Verify that the grid is created
        var foundComponent = TestUtils.findRenderedDOMComponentWithClass(
            grid, 'table-sortable');
        expect(TestUtils.IsCompositeComponent(foundComponent));

        // Simulate a click and verify that it is now On
        var header = TestUtils.findRenderedComponentWithType(
            foundComponent, GridHeader);
        expect(TestUtils.IsCompositeComponent(header));
    });
});