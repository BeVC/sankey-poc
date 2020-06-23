import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';

HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);


//https://stackoverflow.com/questions/40146741/gauge-chart-with-steps-of-colors

@Component({
    selector: 'app-ces-gauge',
    templateUrl: './ces-gauge.component.html',
    styleUrls: ['./ces-gauge.component.scss']
})
export class CesGaugeComponent implements OnInit, AfterViewInit {

    rawData: number = 55;
    data = this.getData(this.rawData);

    @ViewChild("container") public chartEl: ElementRef;
    chart;
    Highcharts = Highcharts;
    chartOptions: any;

    constructor() { }

    ngOnInit(): void {       
    }

    ngAfterViewInit() {
        let self = this;
        this.chartOptions = {
            chart: {
                type: 'solidgauge',
                marginTop: 10
            },

            title: {
                text: ''
            },

            subtitle: {
                text: self.rawData,
                style: {
                    'font-size': '60px'
                },
                y: 200,
                zIndex: 7
            },

            tooltip: {
                enabled: false
            },

            pane: [{
                startAngle: -120,
                endAngle: 120,
                background: [{ // Track for Move
                    outerRadius: '100%',
                    innerRadius: '80%',
                    backgroundColor: this.Highcharts.color(this.Highcharts.getOptions().colors[0]).setOpacity(0.3).get(),  //Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.3).get(),
                    borderWidth: 0,
                    shape: 'arc'
                }],
                size: '120%',
                center: ['50%', '65%']
            }, {
                startAngle: -120,
                endAngle: 120,
                size: '95%',
                center: ['50%', '65%'],
                background: []
            }],

            yAxis: [{
                min: 0,
                max: 100,
                lineWidth: 2,
                lineColor: 'white',
                tickInterval: 10,
                labels: {
                    enabled: false
                },
                minorTickWidth: 0,
                tickLength: 50,
                tickWidth: 5,
                tickColor: 'white',
                zIndex: 6,
                stops: [
                    [0, '#fff'],
                    [0.101, '#0f0'],
                    [0.201, '#2d0'],
                    [0.301, '#4b0'],
                    [0.401, '#690'],
                    [0.501, '#870'],
                    [0.601, '#a50'],
                    [0.701, '#c30'],
                    [0.801, '#e10'],
                    [0.901, '#f03'],
                    [1, '#f06']
                ]
            }, {
                linkedTo: 0,
                pane: 1,
                lineWidth: 5,
                lineColor: 'white',
                tickPositions: [],
                zIndex: 6
            }],

            series: [{
                animation: false,
                dataLabels: {
                    enabled: false
                },
                borderWidth: 0,
                color: Highcharts.getOptions().colors[0],
                radius: '100%',
                innerRadius: '80%',
                data: self.data
            }]
        }

        /*this.chartOptions = {
            chart: {
                type: 'solidgauge'
            },
            title: null,
            pane: {
                center: ["50%", "85%"],
                size: "100%",
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor: "grey",
                    innerRadius: "60%",
                    outRadius: "100%",
                    shape: "arc"                    
                }
            },
            exporting: {
                enabled: false
            },

            tooltip: {
                enabled: false
            },
            yAxis: {
                min: 0,
                max: 6,
                stops: [
                    [0.00, '#FF1E5D'], //14,29
                    [0.12, '#FF775D'],
                    [0.28, '#FFC468'],
                    [0.42, '#FDFB7D'],
                    [0.56, '#C8F167'],
                    [0.70, '#87F167'],
                    [0.84, '#15B700']
                ],
                lineWidth: 0,
                tickWidth: 0,
                minorTickInterval: null,
                tickAmount: 2,
                title: {
                    y: -70
                },
                labels: {
                    y: 16
                }
            },
            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        y: 5,
                        borderWidth: 0,
                        useHTML: true
                    }
                }
            }
        }*/

        this.initChart();
    }


    private initChart() {
        this.chart = Highcharts.chart("container", this.chartOptions);


        //this.chartOptions.chart.renderTo = this.chartEl.nativeElement;
        //this.chartOptions.series[0].data = this.chartData;
        //let nodes = this.prepNodes(this.chartData);
        //this.chartOptions.series[0].nodes = nodes;
        //this.chart = Highcharts.chart("container", Highcharts.merge(this.chartOptions, {
        /*yAxis: {
            min: 0,
            max: 7,
            title:null
        },*/

        // series: [{
        //     name: 'CES',
        //     data: [2.75],
        /*dataLabels: {
            format:
                '<div style="text-align:center">' +
                '<span style="font-size:25px">{y:.1f}</span><br/>' +
                '<span style="font-size:12px;opacity:0.4">' +
                '* 1000 / min' +
                '</span>' +
                '</div>'
        },
        tooltip: {
            valueSuffix: ' revolutions/min'
        }*/
        //   }]

        //}));
    }

    private getData(rawData): { y: number }[] {
        let data: { y: number }[] = [];
        let start = Math.round(Math.floor(rawData / 10) * 10);
        data.push(rawData);
        for (let i = start; i > 0; i -= 10) {
            data.push({
                y: i
            });
        }

        console.log(data);
        return data;
    }
}
