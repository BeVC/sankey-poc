import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import * as Highcharts from 'highcharts';
import Sankey from 'highcharts/modules/sankey';
//import HighchartsOrganization from 'highcharts/modules/organization';
//import HighchartsExporting from 'highcharts/modules/exporting';

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

// HOW SANKEY CALCULATES THE WEIGHT
//https://stackoverflow.com/questions/51082744/how-to-calculate-the-weights-in-a-sankey-chart

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

    showSidepanel: boolean = false;
    selectedTitle: string;
    linkColor: "#66D3DDEB";
    //linkColor: "rgba(211, 221, 235, 0.4)";

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

    @ViewChild("container") public chartEl: ElementRef;
    chart;
    Highcharts = Highcharts;
    chartConstructor = "chart";
    chartOptions: any = {
        chart: {},
        title: {
            text: 'Highcharts Sankey Diagram'
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
            //colors: ["red", "green", "blue"],
            keys: ["color", 'from', 'to', 'weight'],
            nodes: [
                /*{
                    id: "7 To",
                    column: 3,
                    color: "grey"
                },
                {
                    id: "4 About",
                    column: 3,
                    color: "grey"
                }*/
            ],
            data: [],
            /*data: [
                { color: "red", from: "344 Personnel", to: "21 Agent Interaction", weight: 20 },
                { color: "red", from: "344 Personnel", to: "3 Assistance", weight: 5 },
                { color: "green", from: "144 Product", to: "6 Account", weight: 15},
                { color: "green", from: "144 Product", to: "7 Loans", weight: 7},
                { color: "green", from: "144 Product", to: "5 Assistance", weight: 3},
                { color: "blue", from: "78 Price", to: "7 To", weight: 10},
                { color: "blue", from: "78 Price", to: "3 Assistance", weight: 1},
                { color: "red", from: "21 Agent Interaction", to: "4 Availability", weight: 10 },
                { color: "red", from: "4 Availability", to: "7 To", weight: 5},
                { color: "green", from: "6 Account", to: "4 About", weight: 5},
                { color: "red", from: "4 Availability", to: "4 About", weight: 5}  

            ],*/
            type: 'sankey',
            name: 'Sankey demo series'
        }]

    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.initChart();

        let children = document.getElementsByClassName("clickme");
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            child.addEventListener("click", (event: Event) => {
                this.uiClicked(child.getAttribute("data-item"));
            });
        }
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
        //console.log(name);
        this.selectedTitle = name;
        this.showSidepanel = true;
    }

    appOnClosePanelEmit(state: boolean) {
        this.showSidepanel = false;
        this.selectedTitle = undefined;
    }
    //////
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

        // set special nodes to their end level
        let toResult = catLevels.find(item => item.name === "7 To");
        toResult.level = highestLevel + 1;
        let aboutResult = catLevels.find(item => item.name === "4 About");
        aboutResult.level = highestLevel + 1;

        // sort
        catLevels.sort((a, b) => (a.level > b.level) ? 1 : -1);
        console.log(catLevels);

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
        return nodes;
    }
}
