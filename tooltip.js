(function(nx, global) {
    var topologyData = {
        nodes: [{
            "id": 0,
            "x": 410,
            "y": 100,
            "name": "12K-1"
        }, {
            "id": 1,
            "x": 410,
            "y": 280,
            "name": "12K-2",
            "data": [{
                "nodeName": "node3",
                "packets": "12",
                "bytes": "154",
                "bytes": "4"
            }, {
                "nodeName": "node5",
                "packets": "12",
                "bytes": "154",
                "bytes": "4"
            }, {
                "nodeName": "node1",
                "packets": "13",
                "bytes": "121",
                "bytes": "5"
            }]
        }, {
            "id": 2,
            "x": 660,
            "y": 280,
            "name": "Of-9k-03"
        }, {
            "id": 3,
            "x": 660,
            "y": 100,
            "name": "Of-9k-02"
        }, {
            "id": 4,
            "x": 180,
            "y": 190,
            "name": "Of-9k-01"
        }],
        links: [{
            "source": 0,
            "target": 1
        }, {
            "source": 1,
            "target": 2
        }, {
            "source": 1,
            "target": 3
        }, {
            "source": 4,
            "target": 1
        }, {
            "source": 2,
            "target": 3
        }, {
            "source": 2,
            "target": 0
        }, {
            "source": 3,
            "target": 0
        }, {
            "source": 3,
            "target": 0
        }, {
            "source": 3,
            "target": 0
        }, {
            "source": 0,
            "target": 4
        }, {
            "source": 0,
            "target": 4
        }, {
            "source": 0,
            "target": 3
        }]
    };
    var mainModel = {
        username: 'root'
    };
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
                                content: "{packets}"
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
    nx.define('Tooltip.Node', nx.ui.Component, {
        view: {
            content: {
                name: 'topo',
                type: 'nx.graphic.Topology',
                props: {
                    adaptive: true,
                    nodeConfig: {
                        label: 'model.id'
                    },
                    linkConfig: {
                        linkType: 'curve'
                    },
                    tooltipManagerConfig: {
                        nodeTooltipContentClass: 'MyNodeTooltip'
                    },
                    showIcon: true,
                    data: topologyData
                }
            }
        },
        methods: {
            attach: function(args) {
                this.inherited(args);
                this.model(mainModel);
            }
        }
    });
	
	    /**
     * define application
     */
    var Shell = nx.define(nx.ui.Application, {
        methods: {
            start: function () {
                //your application main entry

                // initialize a topology
                var topo = new Tooltip.Node({
                    // set the topology view's with and height
                    width: 580,
                    height: 580,
                    // node config
                    nodeConfig: {
                        // label display name from of node's model, could change to 'model.id' to show id
                        label: 'model.name'
                    },
                    // link config
                    linkConfig: {
                        // multiple link type is curve, could change to 'parallel' to use parallel link
                        linkType: 'curve'
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
})(nx, nx.global);

