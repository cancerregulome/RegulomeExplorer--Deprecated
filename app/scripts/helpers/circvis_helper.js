define([
	'd3',
	'json!configurations/circvis.json'
], function( d3, circvisObject ){

	function feature_type(feature) {
		return feature && feature.test_type ? feature.test_type : 'other';
	}

	function clinicalType(feature) {
		return feature && feature.clin_alias && !! ~feature.clin_alias.indexOf(':') ?
			feature.clin_alias.split(':')[1] : 'other';
	}

	function shape(feature) {
		if (feature.test_model in circvisObject.display.shapeMap) return circvisObject.display.shapeMap[feature.test_model];
		return circvisObject.display.shapeMap["other"];
	}

	function clinicalShape(feature) {
		return shape(clinicalType(feature));
	}

	var tickColors = function(data) {
		return typeColor(feature_type(data));
	};

	var typeColor = function(type) {
		return circvisObject.display.colorScale[type] || circvisObject.display.colorScale['other'];
	};

	var fill_style = d3.scale.linear().domain([0, 300]).range(["#A0AEBF", "#C65568"]);

	function heatmapScale(feature) {
		return fill_style(feature['mutation_count']);
	}

	var types = Object.keys(circvisObject.display.labelMap);

	var hovercardItemsConfig = {
		Gene : 'gene',
		Transcript : 'transcript',
		Location: function(feature) {
			return 'Chr ' + feature.chr + ' ' + feature.start;
		},
		'Trio Member' : 'fm',
		Target: 'phenotype',
		Test: 'test',
		'Score': 'v'
	};

	var links = [{
			label: 'Sample Summary',
			key: 'seqpeek',
			url: 'http://vis.systemsbiology.net/seqpeek/index.html',
			uri: '#sample_summary',
			href: function(feature) {
				return 'http://vis.systemsbiology.net/seqpeek/index.html#sample_summary/chr' + 
				feature.chr + '/' + feature.start + '/' + encodeURIComponent(targetMap[feature.target_label]);
			}
		}, //ucsc_genome_browser
		{
			label: 'Family Summary',
			key: 'seqpeek',
			url: 'http://vis.systemsbiology.net/seqpeek/index.html',
			uri: '#sample_summary',
			href: function(feature) {
				return 'http://vis.systemsbiology.net/seqpeek/index.html#family_summary/chr' + 
				feature.chr + '/' + feature.start + '/' + encodeURIComponent(targetMap[feature.target_label]);
			}
		}
	];

	var hovercardLinksConfig = {};
	var chromosomeKeys = circvisObject.data.genome.chromosomeKeys;
	var chromosomeAttributes = circvisObject.data.genome.chromosomeAttributes;
	var cytoband = circvisObject.data.genome.cytoband;

	_.each(links, function(item) {
		hovercardLinksConfig[item.label] = item;
	});

	var div = document.body;

	var config = function() {
		return {
			DATATYPE: "vq.models.CircVisData",
			CONTENTS: {
				DATA: {
					features: [],
					edges: [],
					hash: function(feature) {
						return feature.chr + '_' + feature.start + '_' + feature.target_label + '_' + feature.test_type;
					}
				},
				PLOT: {
					container: div,
					width: 900,
					height: 900,
					vertical_padding: 10,
					horizontal_padding: 10,
					enable_pan: false,
					enable_zoom: false,
					show_legend: false
				},

				GENOME: {
					DATA: {
						key_order: chromosomeKeys,
						key_length: _.map(chromosomeKeys, function(key) {
							return {
								chr_name: key,
								chr_length: chromosomeAttributes[key].length
							};
						})
					},
					OPTIONS: {
						radial_grid_line_width: 2,
						label_layout_style: 'clock',
						label_font_style: '16px helvetica',
						gap_degrees: 2
					}
				},

				WEDGE: [],
				TICKS: {
					OPTIONS: {
						wedge_height: 15,
						wedge_width: 0.7,
						overlap_distance: 10000000, //tile ticks at specified base pair distance
						height: 90,
						fill_style: tickColors,
						tooltip_items: hovercardItemsConfig,
						tooltip_links: hovercardLinksConfig
					}
				},
				NETWORK: {
					DATA: {
						data_array: [] //
					},
					OPTIONS: {
						render: false,
						outer_padding: 10,
						tile_nodes: Boolean(true),
						node_overlap_distance: 3e7,
						node_radius: 6,
						node_fill_style: tickColors,
						link_stroke_style: "#CA949F",
						link_line_width: 8,
						link_alpha: 0.6,
						node_highlight_mode: 'isolate',
						node_key: function(node) {
							return node.label;
						},
						node_tooltip_items: hovercardItemsConfig,
						node_tooltip_links: hovercardLinksConfig,
						link_tooltip_items: {
							'Target': function(link) {
								var label = link.source.label.split(':');
								return '<span style="color:' + tickColors(link.source) + '">' +
									circvisObject.display.labelMap[label[1]] + '</span> ' + label[2];
							},
							'Target Location': function(link) {
								return 'Chr ' + link.source.chr + ' ' + link.source.start +
									(link.source.end ? '-' + link.source.end : '');
							},
							'Predictor': function(link) {
								var label = link.target.label.split(':');
								return '<span style="color:' + tickColors(link.target) + '">' +
									circvisObject.display.labelMap[label[1]] + '</span> ' + label[2];
							},
							'Predictor Location': function(link) {
								return 'Chr ' + link.target.chr + ' ' + link.target.start +
									(link.target.end ? '-' + link.target.end : '');
							},
							Importance: 'assoc_value1'
						}
					}
				}
			}
		};
	}

	var ring = function(pair) {
		return {
			PLOT: {
				height: 40,
				type: 'glyph'
			},
			DATA: {
				value_key: pair.key,

				},
			OPTIONS: {
				tile_height: 10,
				tile_padding: 4,
				tile_overlap_distance: 100000000,
				tile_show_all_tiles: true,
				fill_style: tickColors,
				stroke_style: null,
				line_width: 3,
				legend_label: pair.label,
				shape: shape,
				radius: 9,
				legend_description: pair.label,
				listener: function() {
					return null;
				},
				outer_padding: 5,
				tooltip_items: hovercardItemsConfig,
				tooltip_links: hovercardLinksConfig
			}
		}
	};

	var config_obj = config();

	var CircvisObj = {
		reset: function() {
			config_obj = config();
		},
		config: function() {
			return config_obj;
		},
		container: function(div) {
			config_obj.CONTENTS.PLOT.container = div;
			return this;
		},
		rings: function(test_pairs) {
			config_obj.CONTENTS.WEDGE = test_pairs.map(ring);
			return this;
		},
		size: function(diameter) {
			config_obj.CONTENTS.PLOT.width = config_obj.CONTENTS.PLOT.height = diameter;
			return this;
		},
		data: function(data) {
			config_obj.CONTENTS.DATA.features = data;
			return this;
		},

	};

	return CircvisObj;

});