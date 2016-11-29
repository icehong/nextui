nx.define('MyNodeTooltip', nx.ui.Component, {
        properties: {
            node: {},
            topology: {}
        },
        view: {
            content: [{
                tag: 'h1',
                content: '{#node.id}'
            }, {
                tag: 'p',
                content: [{
                    tag: 'label',
                    content: 'Username'
                }, {
                    tag: 'span',
                    content: '{username}'
                }]
            }, {
                tag: 'p',
                content: '{#topology.width}'
            }, {
                tag: "table",
                props: {
                    class: "col-md-12",
                    border: "1"
                },
                content: [{
                    tag: "thead",
                    content: {
                        tag: "tr",
                        content: [{
                            tag: "td"
                        }, {
                            tag: "td",
                            content: "pkts"
                        }, {
                            tag: "td",
                            content: "bytes"
                        }]
                    }
                }, {
                    tag: "tbody",
                    props: {
                        items: "{#node.model.data}",
                        template: {
                            tag: "tr",
                            content: [{
                                tag: "td",
                                content: "{nodeName}"
                            }, {
                                tag: "td",
                                content: "{packets}",
								props: {
									bgColor: function(data) {
										if(data.get("packets") == 12 ) {
											return 'red'
										} else {
											return 'green'
										}
									}
								}
                            }, {
                                tag: "td",
                                content: "{bytes}"
                            }]
                        }
                    }
                }]
            }]
        }
    });

(function (nx) {
    /**
     * define application
     */
    var Shell = nx.define(nx.ui.Application, {
        methods: {
            start: function () {
                //your application main entry

                // initialize a topology
                var topo = new nx.graphic.Topology({
                    // set the topology view's with and height
                    width: 580,
                    height: 580,
                    // node config
                    nodeConfig: {
                        // label display name from of node's model, could change to 'model.id' to show id
                        label: 'model.id'
                    },
                    // link config
                    linkConfig: {
                        // multiple link type is curve, could change to 'parallel' to use parallel link
                        linkType: 'curve'
                    },
					tooltipManagerConfig: {
                        nodeTooltipContentClass: 'MyNodeTooltip'
                    },
                    // show node's icon, could change to false to show dot
                    showIcon: true
                });

                //set data to topology
                topo.data(topologyData);
                //attach topology to document
                topo.attach(this);
            }
        }
    });

    /**
     * create application instance
     */
    var shell = new Shell();

    /**
     * invoke start method
     */
    shell.start();
})(nx);