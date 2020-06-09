import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import * as Highcharts from 'highcharts';
import Sankey from 'highcharts/modules/sankey';
//import HighchartsOrganization from 'highcharts/modules/organization';
//import HighchartsExporting from 'highcharts/modules/exporting';

/*Highcharts.wrap(Highcharts["seriesTypes"]["sankey"]["prototype"], 'createNodeColumn', function (p) {
    var column = p.apply(this, Array.prototype.slice.call(arguments, 1));

    column.top = function (factor) {
        return 0;
    }

    return column
});*/


//Highcharts["seriesTypes"].sankey.prototype.pointAttribs = function (point, state) {
//    var opacity = this.options.linkOpacity,
//        color = point.color;

//    if (state) {
//        opacity = this.options.states[state].linkOpacity || opacity;
//        color = this.options.states[state].color || point.color;
//    }

//    return {
//        fill: point.isNode ?
//            color : {
//                linearGradient: {
//                    x1: 0,
//                    x2: 1,
//                    y1: 0,
//                    y2: 0
//                },
//                stops: [
//                    [0, Highcharts.color(color).setOpacity(opacity).get()],
//                    [1, Highcharts.color(point.toNode.color).setOpacity(opacity).get()]
//                ]
//            }
//    };
//}

Sankey(Highcharts);
//HighchartsOrganization(Highcharts);
//HighchartsExporting(Highcharts);

//https://stackoverflow.com/questions/58240336/highchart-org-chart-type-error-with-ionic-application

//https://github.com/highcharts/highcharts/issues/10026
// could be usefull to give the links some info
// but might not be needed

// GRADIENTS
// https://stackoverflow.com/questions/54455765/gradient-on-sankey-diagram

// HIGHLIGHT ALL PATHS
// https://stackoverflow.com/questions/48211979/highcharts-sankey-highlight-all-paths-of-a-given-category
// HIGHLIGHT LINKS ACROSS NODES
// https://github.com/highcharts/highcharts/issues/8067

// HOW SANKEY CALCULATES THE WEIGHT
//https://stackoverflow.com/questions/51082744/how-to-calculate-the-weights-in-a-sankey-chart

///////////

///////////

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

    showSidepanel: boolean = false;
    selectedTitle: string;
    legend: { name: string, color: string }[] = [];
    nodeAnchor: number;
    isExtended: boolean = false;
    //linkColor: "#66D3DDEB";
    linkColor: "rgba(211, 221, 235, 0.4)";
    //linkColor:"transparent linear-gradient(270deg, #D3DDEB 0%, #BCCCE2 100%)"

    chartData = [
        { nodeColor: "red", color: this.linkColor, from: "344 Personnel", to: "21 Agent Interaction", weight: 70 },
        { nodeColor: "red", color: this.linkColor, from: "344 Personnel", to: "3 Assistance", weight: 20 },
        { nodeColor: "red", color: this.linkColor, from: "344 Personnel", weight: 10 },
        { nodeColor: "green", color: this.linkColor, from: "144 Product", to: "6 Account", weight: 15 },
        { nodeColor: "green", color: this.linkColor, from: "144 Product", to: "7 Loans", weight: 7 },
        { nodeColor: "green", color: this.linkColor, from: "144 Product", to: "10 Delivery", weight: 3 },
        { nodeColor: "blue", color: this.linkColor, from: "78 Price", to: "7 To", weight: 10 },
        { nodeColor: "blue", color: this.linkColor, from: "78 Price", to: "5 Digital", weight: 1 },
        { nodeColor: "red", color: this.linkColor, from: "21 Agent Interaction", to: "4 Availability", weight: 10 },
        { nodeColor: "red", color: this.linkColor, from: "4 Availability", to: "7 To", weight: 5 },
        { nodeColor: "green", color: this.linkColor, from: "6 Account", to: "4 About", weight: 5 },
        { nodeColor: "red", color: this.linkColor, from: "4 Availability", to: "4 About", weight: 5 }
    ]

    chartDataAdd = [
        { nodeColor: "red", color: this.linkColor, from: "7 To", to: "2 Product", weight: 5 },
        { nodeColor: "red", color: this.linkColor, from: "7 To", to: "9 Hotel", weight: 5 },
    ]

    chartDataFiltered = [
        { nodeColor: "red", color: this.linkColor, from: "344 Personnel", to: "21 Agent Interaction", weight: 70 },
        { nodeColor: "red", color: this.linkColor, from: "344 Personnel", to: "3 Assistance", weight: 20 },
        { nodeColor: "red", color: this.linkColor, from: "344 Personnel", weight: 10 },
        { nodeColor: "green", color: this.linkColor, from: "144 Product", to: "6 Account", weight: 15 },
        { nodeColor: "green", color: this.linkColor, from: "144 Product", to: "7 Loans", weight: 7 },
        { nodeColor: "green", color: this.linkColor, from: "144 Product", to: "10 Delivery", weight: 3 },
    ]

    @ViewChild("container") public chartEl: ElementRef;
    chart;
    Highcharts = Highcharts;
    chartConstructor = "chart";
    chartOptions: any;

    constructor() {
        // TOP ALIGNMENT OF COLUMNS
        // https://github.com/highcharts/highcharts/issues/8653
        this.Highcharts.wrap(this.Highcharts["seriesTypes"]["sankey"].prototype, "createNodeColumn", function (p) {
            let column = p.apply(this, Array.prototype.slice.call(arguments, 1));
            column.top = function (factor) {
                return 0;
            }
            return column;
        })
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        let self = this;
        this.chartOptions = {
            chart: {
                marginRight: "60"
            },
            title: {
                //text: 'Highcharts Sankey Diagram'
            },
            /*accessibility: {
                point: {
                    valueDescriptionFormat: '{index}. {point.from} to {point.to}, {point.weight}.'
                }
            },*/
            tooltip: {
                useHTML: true,
                borderWidth: 0,
                backgroundColor: 0,
                borderRadius: 100,
                nodeFormatter: function () {
                    return "";
                },
                headerFormat: undefined,
                footerFormat: undefined,
                pointFormatter: function () {
                    return `<div class='sankey-tooltip'>
                            <p class='title'>`+ "Product" + `<span>(` + this.options.weight + `)</span></p>
                            <table>
                                <tr>
                                    <td>Very positive</td>
                                    <td class='very-pos'>44</td>
                                    <td>(30%)</td>
                                </tr>
                                <tr>
                                    <td>Positive</td>
                                    <td class='pos'>20</td>
                                    <td>(14%)</td>
                                </tr>
                                <tr>
                                    <td>Unknown</td>
                                    <td class='unknown'>20</td>
                                    <td>(14%)</td>
                                </tr>
                                <tr>
                                    <td>Negative</td>
                                    <td class='neg'>30</td>
                                    <td>(21%)</td>
                                </tr>
                                <tr>
                                    <td>Very negative</td>
                                    <td class='very-neg'>20</td>
                                    <td>(14%)</td>
                                </tr>
                            </table>
                        </div>`;
                }
            },
            //legend: {
            //    useHTML: true,
            //    labelFormatter: function () {
            //        //let items = this;
            //        setTimeout(() => {
            //            let forLegend = [];
            //            let myItems = this;
            //            for (let node of myItems.nodeColumns[0]) {

            //                forLegend.push({ color:node.color, name: node.name });

            //            }
            //            //console.log(forLegend);
            //        }, 500)
            //    }
            //},
            plotOptions: {
                // FORMATTING THE DATALABELS: http://jsfiddle.net/w9pzhug6/
                // https://stackoverflow.com/questions/52475863/how-to-align-the-labels-of-sankey-diagram
                sankey: {
                    nodeWidth: 40,
                    colorByPoint: false,
                    dataLabels: {
                        enabled: true,
                        useHTML: true,
                        color: "black",
                        allowOverlap: true,
                        rotation: 270,
                        visible: true,
                        nodeFormatter: function (point) {
                            //console.log(this, point);
                            let item = this.key.split(" ");
                            return `<div class='info-wrap'>
                                <div class='info-block'>` + item[0] + `</div>
                                <div class='info-block'>
                                <span class='clickme' data-item='`+ item[1] + `'>` + item[1] + `</span>
                                </div>
                                </div>`
                        }
                    }
                }
            },
            series: [{
                colors: ["gold", "blue", "silver"],
                keys: ["color", 'from', 'to', 'weight'],
                nodes: [],
                point: {
                    events: {
                        /*click: function () {
                            if (!this.isNode) {
                                console.log("skljfkl");
                            }
                        }*/

                        click: function (point) {
                            //event.preventDefault();
                            //let pointy = point;
                            //let item = this;
                            //console.log("I've been clicked: " + point.point.name);
                            /*if (this.isNode) {
                                if (point.point.name === "7 To" || point.point.name === "4 About") {
                                    if (!self.isExtended) {
                                        self.extendData();
                                        self.isExtended = true;
                                    } else {
                                        let newData = self.chartData;
                                        let nodes = self.prepNodes(self.chartData);
                                        self.chartOptions.series[0].nodes = nodes;
                                        self.chart.series[0].setData(newData);
                                        self.isExtended = false;
                                    }
                                }
                            } else {
                                self.Highcharts.each(this.series.data, function (link) {
                                    link.setState(''); // reset old states
                                });
                                //self.setStateRecursiveBackward(this);
                                self.setStateRecursiveForward(this);
                            }*/


                            //if (point.point.name === "7 To" || point.point.name === "4 About") {
                            //    if (!self.isExtended) {
                            //        self.extendData();
                            //        self.isExtended = true;
                            //    } else {
                            //       let newData = self.chartData;
                            //        let nodes = self.prepNodes(self.chartData);
                            //        self.chartOptions.series[0].nodes = nodes;
                            //        self.chart.series[0].setData(newData);
                            //        self.isExtended = false;
                            //    }
                            //} else {
                            if (this.isNode) {
                                //self.returnStates();
                                /*self.Highcharts.each(this.series.data, function (link) {
                                    link.setState(''); // reset old states
                                });*/
                                self.setStateRecursiveBackward(this);
                                self.setStateRecursiveForward(this);
                                self.initialiseSidepanelEvents();
                            }
                            //}
                        },
                        mouseOut: function () {
                            event.preventDefault();
                            event.stopPropagation();
                            event.stopImmediatePropagation();
                        }
                    }
                },
                //showInLegend: true,
                data: [],
                states: {
                    /*select: {
                        color: "gold"
                    },*/
                    hover: {
                        //color:"#a4edba"
                        /*color: {
                            linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
                            stops: [
                                //[0, "#D3DDEB66"],
                                //[1, "#BCCCE266"]
                                [0, 'rgba(1,138,255,0.40378158099177175)'], // start
                                [0.5, 'rgba(76,188,251,0.4009804605435925)'], // middle
                                [1, 'rgba(175,244,255,0.4009804605435925)'] // end
                            ]
                        }*/
                    },
                    /*normal: {
                        color: {
                            linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
                            stops: [
                                [0, "#D3DDEB66"],
                                [1, "#BCCCE266"]
                            ]
                        }
                    }*/
                },
                type: 'sankey',
                name: 'Sankey demo series'
            }]

        }

        this.initChart();
        this.initialiseSidepanelEvents();
    }

    private initChart() {
        this.chartOptions.chart.renderTo = this.chartEl.nativeElement;
        this.chartOptions.series[0].data = this.chartData;
        let nodes = this.prepNodes(this.chartData);
        this.chartOptions.series[0].nodes = nodes;
        this.chart = new Highcharts.Chart(this.chartOptions);
    }

    //////

    uiClicked(name: string) {
        event.preventDefault();
        event.stopPropagation();
        console.log(name);
        if (name === "To" || name === "About") {
            if (!this.isExtended) {
                this.extendData();
                this.isExtended = true;
            } else {
                let newData = this.chartData;
                let nodes = this.prepNodes(this.chartData);
                this.chartOptions.series[0].nodes = nodes;
                this.chart.series[0].setData(newData);
                this.isExtended = false;
            }
        } else {
            this.selectedTitle = name;
            this.showSidepanel = true;
        }
    }

    appOnClosePanelEmit(state: boolean) {
        this.showSidepanel = false;
        this.selectedTitle = undefined;
    }

    /**
     * /
     * @param high
     * @param low
     *
     * what is important here is that the existing chart can be updated by using 'setData'
     */
    uiSetRangeClicked(high: number, low: number) {
        if (high === 400 && low === 300) {
            let newData = this.chartDataFiltered;
            let nodes = this.prepNodes(this.chartDataFiltered);
            this.chartOptions.series[0].nodes = nodes;
            this.chart.series[0].setData(newData);
        } else {
            let newData = this.chartData;
            let nodes = this.prepNodes(this.chartData);
            this.chartOptions.series[0].nodes = nodes;
            this.chart.series[0].setData(newData);
        }
        this.initialiseSidepanelEvents();
    }
    //////
    private initialiseSidepanelEvents() {
        let children = document.getElementsByClassName("clickme");
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            child.addEventListener("click", (event: Event) => {
                this.uiClicked(child.getAttribute("data-item"));
            });
        }
    }

    private prepNodes(data) {
        let catLevels: { name: string, level: number, color: string }[] = [];

        // determines the levels for the nodes
        for (let item of data) {
            let level: number = 0
            let color: string = "";

            let fromResult = catLevels.find(lvl => lvl.name === item.from);
            if (fromResult === undefined) {
                catLevels.push({ name: item.from, level: level, color: item.nodeColor });
                color = item.nodeColor;
            } else {
                level = fromResult.level;
                color = fromResult.color;
            }

            let toResult = catLevels.find(lvl => lvl.name === item.to);
            if (toResult == undefined) {
                catLevels.push({ name: item.to, level: level + 1, color: color });
            }
        }

        // filter out the nodes without destination
        catLevels = catLevels.filter(item => item.name !== undefined);

        // determine highest level of nodes
        let highestLevel: number = 0;
        for (let item of catLevels) {
            if (item.level > highestLevel) {
                highestLevel = item.level;
            }
        }
        //console.log(catLevels);

        // set special nodes to their end level
        let toResult = catLevels.find(item => item.name === "7 To");
        if (toResult !== undefined) {
            toResult.level = highestLevel + 1;
            this.nodeAnchor = toResult.level;
        }
        let aboutResult = catLevels.find(item => item.name === "4 About");
        if (aboutResult !== undefined) {
            aboutResult.level = highestLevel + 1;
        }

        // sort
        catLevels.sort((a, b) => (a.level > b.level) ? 1 : -1);
        //console.log(catLevels);

        // set colors to node and create node objects for chart
        let nodes = [];
        for (let item of catLevels) {
            let color = "";

            if (item.name === "7 To" || item.name === "4 About") {
                color = "#BBC6D6";
            } else {
                color = item.color;
            }

            let node = {
                id: item.name,
                column: item.level,
                color: color
            }

            nodes.push(node);
        }

        // determine content of legend
        this.legend = [];
        for (let node of nodes) {
            if (node.column === 0) {
                this.legend.push({ name: node.id, color: node.color });
            }
        }
        return nodes;
    }

    private prepNewNodes(data) {
        let catLevels: { name: string, level: number, color: string }[] = [];

        // determines the levels for the nodes
        for (let item of data) {
            let level: number = 0
            let color: string = "";

            let fromResult = catLevels.find(lvl => lvl.name === item.from);
            if (fromResult === undefined) {
                catLevels.push({ name: item.from, level: this.nodeAnchor + level, color: item.nodeColor });
                color = item.nodeColor;
            } else {
                level = fromResult.level;
                color = fromResult.color;
            }

            let toResult = catLevels.find(lvl => lvl.name === item.to);
            if (toResult == undefined) {
                catLevels.push({ name: item.to, level: this.nodeAnchor + level + 1, color: color });
            }
        }

        // filter out the nodes without destination
        catLevels = catLevels.filter(item => item.name !== undefined);

        // clear special nodes to prevent duplicates
        let toResult = catLevels.find(item => item.name === "7 To");
        if (toResult !== undefined) {
            let index = catLevels.findIndex(item => item.name === "7 To");
            if (index !== -1) {
                catLevels.splice(index, 1);
            }
        }
        let aboutResult = catLevels.find(item => item.name === "4 About");
        if (aboutResult !== undefined) {
            let index = catLevels.findIndex(item => item.name === "4 About");
            if (index !== -1) {
                catLevels.splice(index, 1);
            }
        }

        catLevels.sort((a, b) => (a.level > b.level) ? 1 : -1);

        let nodes = [];
        for (let item of catLevels) {
            let color = "";
            color = "#003161";

            let node = {
                id: item.name,
                column: item.level,
                color: color
            }

            nodes.push(node);
        }

        console.log(nodes);
        return nodes;
    }

    private extendData() {
        let newData = this.chartData.concat(this.chartDataAdd);
        let nodes = this.prepNewNodes(this.chartDataAdd);
        this.chartOptions.series[0].nodes = this.chartOptions.series[0].nodes.concat(nodes);

        this.chart.series[0].setData(newData);
        this.initialiseSidepanelEvents();
    }

    private setStateRecursiveBackward(node: any) {
        let self = this;
        this.Highcharts.each(node.linksTo, function (link) {
            if (!self.chart.series[0].data.find(item => item.from === link.from).isColorUpdated) {
                //let color = self.chart.series[0].data.find(item => item.from === link.from).nodeColor
                self.chart.series[0].data.find(item => item.from === link.from).update({ color: "gold", isColorUpdated: true });
            } else {
                self.chart.series[0].data.find(item => item.from === link.from).update({ color: self.linkColor, isColorUpdated: false });
            }
            //link.setState("select");
            if (link.fromNode.linksTo.length > 0) {
                self.setStateRecursiveBackward(link.fromNode);
            }
        })
    }

    private setStateRecursiveForward(node: any, toRight: boolean = false/*, color?: string*/) {
        //let newColor: string;
        let self = this;
        /*if (color !== undefined) {
            newColor = color;
        }*/

        if (node !== undefined) {
            let nodes = node.linksFrom.filter(item => item.to !== undefined && item.to !== null && item.to !== "");
            //console.log(...nodes);
            this.Highcharts.each(nodes, function (link) {
                let result = self.chart.series[0].data.find(item => item.from === link.from && item.to === link.to);

                //if (!result.hasPassed) {
                if (!result.isColorUpdated) {
                    /*if (color === undefined) {
                        newColor = self.chart.series[0].data.find(item => item.from === link.from && item.to === link.to).nodeColor;
                    }*/
                    result.update({ color: "gold", isColorUpdated: true });
                } else {
                    result.update({ color: self.linkColor, isColorUpdated: false });
                }
                //}
                //link.setState("select");
                if (link.toNode.linksFrom.length > 0) {
                    toRight = true;
                    if (toRight) {
                        console.log(link.fromNode.linksFrom);
                        for (let item of link.fromNode.linksFrom) {
                            self.setStateRecursiveForward(item.toNode, true);
                        }
                    }
                }
            })
        }

    }

    private returnStates() {
        let self = this;
        let data = self.chart.series[0].data;
        for (let item of data) {
            item.update({ color: self.linkColor, isColorUpdated: false });
        }
    }
}
