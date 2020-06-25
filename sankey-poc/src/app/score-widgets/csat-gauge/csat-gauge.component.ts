import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';

HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);

@Component({
    selector: 'app-csat-gauge',
    templateUrl: './csat-gauge.component.html',
    styleUrls: ['./csat-gauge.component.scss']
})
export class CsatGaugeComponent implements OnInit, AfterViewInit {

    @ViewChild("container1") public chartEl: ElementRef;
    chart;
    Highcharts = Highcharts;
    chartOptions: any;

    constructor() { }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        let self = this;
        //this.chartOptions = {
        //    chart: {
        //        type: 'solidgauge'
        //    },
        //    title: null,
        //    pane: {
        //        center: ['50%', '85%'],
        //        size: '140%',
        //        startAngle: -90,
        //        endAngle: 90,
        //        background: {
        //            backgroundColor: (Highcharts["theme"] && Highcharts["theme"]["background2"]) || '#EEE',
        //            innerRadius: '60%',
        //            outerRadius: '100%',
        //            shape: 'arc'
        //        }
        //    },
        //    tooltip: {
        //        enabled: false
        //    },
        //    // the value axis
        //    yAxis: {
        //        lineWidth: 0,
        //        minorTickInterval: null,
        //        tickPixelInterval: 400,
        //        tickWidth: 0,
        //        title: {
        //            y: -70,
        //            text: "speed"
        //        },
        //        labels: {
        //            y: 16
        //        },
        //        min: 0,
        //        max: 200,
        //        plotBands: [{
        //            from: 0,
        //            to: 100,
        //            visible: true,
        //            color: {
        //                linearGradient: [0, 0, 300, 0],
        //                stops: [
        //                    [0.2, '#c7002b'], // green
        //                    [0.55, '#fdff00'], // yellow
        //                    [0.99, '#03a100'] // red
        //                ]
        //            },
        //            innerRadius: '70%',
        //            outerRadius: '100%'
        //        }]
        //    },
        //    plotOptions: {
        //        solidgauge: {
        //            dataLabels: {
        //                y: -30,
        //                borderWidth: 0,
        //                useHTML: true
        //            }
        //        }
        //    },
        //    credits: {
        //        enabled: false
        //    },
        //    series: [{
        //        name: 'Speed',
        //        data: [{
        //            /*color: {
        //                linearGradient: [0, 0, 300, 0],
        //                stops: [
        //                    [0.1, '#55BF3B'], // green
        //                    [0.5, '#DDDF0D'], // yellow
        //                    [0.9, '#DF5353'] // red
        //                ]
        //            },*/
        //            y: 200
        //        }],
        //        dataLabels: {
        //            format: '<div style="text-align:center"><span style="font-size:25px;color:' +
        //                ((Highcharts["theme"] && Highcharts["theme"]["contrastTextColor"]) || 'black') + '">{y}</span><br/>' +
        //                '<span style="font-size:12px;color:silver">km/h</span></div>'
        //        },
        //        tooltip: {
        //            valueSuffix: ' km/h'
        //        }
        //    }]
        //}


        this.chartOptions = {
            chart: {
                type: 'solidgauge'
            },
            title: null,
            pane: {
                center: ['50%', '85%'],
                size: '70%',
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor: (Highcharts["theme"] && Highcharts["theme"]["background2"]) || '#EEE',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc',
                    borderWidth: 0,
                }
            },
            tooltip: {
                enabled: false
            },
            // the value axis
            yAxis: {
                opacity: 0,
                lineWidth: 0,
                minorTickInterval: null,
                tickPixelInterval: 400,
                tickWidth: 0,
                title: {
                    y: -70,

                },
                labels: {
                    enabled: false,
                    y: 16
                },
                min: 0,
                max: 100,
                plotBands: [{
                    from: 0,
                    to: 50,
                    color: {
                        linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                        stops: [
                            [0, '#DDDF0D'], //yellow
                            [1, '#55BF3B'] //green
                        ]
                    },
                    innerRadius: "85%",
                    outerRadius: "100%"
                }, {
                    from: 50,
                    to: 100,
                    color: {
                        linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                        stops: [
                            [0, '#DDDF0D'], //yellow
                            [1, '#DF5353'] //red
                        ]
                    },
                    innerRadius: "85%",
                    outerRadius: "100%"
                }]

            },
            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        y: 5,
                        borderWidth: 0,
                        useHTML: true
                    }
                }
            },
            credits: {
                enabled: false
            },
            series: [{                
                name: 'Speed',
                data: [
                    {
                        y: 50,
                        color: "#ADADAD", /*{
                            radialGradient: { cx:0, cy:1,r:1 },
                            stops: [
                                [0.1, '#55BF3B'], // green
                                [0.5, '#DDDF0D'], // yellow
                                [0.9, '#DF5353'] // red
                            ]
                        },*/
                        radius: "85%"
                    },
                    
                ],
                dataLabels: {
                    enabled: false,
                    format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                        ((Highcharts["theme"] && Highcharts["theme"]["contrastTextColor"]) || 'black') + '">20</span><br/>' +
                        '</div>'
                },
                tooltip: {
                    valueSuffix: ' km/h'
                }
            }]
        }

        //this.chartOptions = {
        //    chart: {
        //        type: 'solidgauge',
        //        marginTop: 10,
        //    },

        //    title: {
        //        text: ""
        //    },
        //    tooltip: {
        //        enabled: false
        //    },
        //    pane: [{
        //        startAngle: -90,
        //        endAngle: 90,
        //        background: [{ // Track for Move
        //            outerRadius: '90%',
        //            innerRadius: '70%',
        //            backgroundColor: "#DEDEDE",
        //            borderWidth: 0,
        //            shape: 'arc'
        //        }],
        //        size: '120%',
        //        center: ['50%', '65%']
        //    }, {
        //        startAngle: -90,
        //        endAngle: 90,
        //        size: '80%',
        //        center: ['50%', '70%'],
        //        background: []
        //    }],
        //    yAxis: {
        //        min: 0,
        //        max: 100,
        //        title: {
        //            text: ''
        //        },
        //        plotBands: [{
        //            from: 0,
        //            to: 50,
        //            color: {
        //                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
        //                stops: [
        //                    [0, '#DDDF0D'], //yellow
        //                    [1, '#55BF3B'] //green

        //                ]
        //            },
        //            innerRadius: "90%",
        //            outerRadius: "100%"
        //        }, {
        //            from: 50,
        //            to: 100,
        //            color: {
        //                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
        //                stops: [
        //                    [0, '#DDDF0D'], //yellow
        //                    [1, '#DF5353'] //red
        //                ]
        //                },                    
        //            innerRadius: "90%",
        //            outerRadius: "100%"
        //        }]
        //    },
        //    series: [{
        //        animation: false,
        //        dataLabels: {
        //            enabled: true,
        //            useHTML: true,
        //            formatter: function () {
        //                return "<div class='solidgauge-score-wrapper'>" +
        //                    "<div class='solidgauge-score'>" +
        //                    "<p class='metric'>CES</p>" +
        //                    "<p class='score'>" +70 + "</p>" +
        //                    "</div>" +
        //                    "<div class='thingy'></div>" +
        //                    "</div>"
        //            },
        //            verticalAlign: "bottom",
        //            borderWidth: 0,
        //            y: 35
        //        },
        //        borderWidth: 0,
        //        color: Highcharts.getOptions().colors[0],
        //        radius: '100%',
        //        innerRadius: '70%',
        //        data: { y: 60 }
        //    },
        //    ]
        //}

        this.initChart();
    }

    private initChart() {
        this.chart = Highcharts.chart("container1", this.chartOptions);
    }
    private update() {
        let point = this.chart.series[0].points[0];
        let newVal;
        let inc = Math.round((Math.random() - 0.5) * 100);

        newVal = point.y + inc;
        if (newVal < 0 || newVal > 200) {
            newVal = point.y - inc;
        }

        point.update(newVal);
    }
}
