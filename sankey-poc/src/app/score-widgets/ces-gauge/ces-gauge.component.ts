import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';

HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);


//https://stackoverflow.com/questions/40146741/gauge-chart-with-steps-of-colors
//https://www.highcharts.com/forum/viewtopic.php?t=39688

@Component({
    selector: 'app-ces-gauge',
    templateUrl: './ces-gauge.component.html',
    styleUrls: ['./ces-gauge.component.scss']
})
export class CesGaugeComponent implements OnInit, AfterViewInit {

    rawData: number = 89;
    data = this.getData(this.rawData);

    @ViewChild("container") public chartEl: ElementRef;
    chart;
    Highcharts = Highcharts;
    chartOptions: any;

    constructor() {
        //http://jsfiddle.net/d6gzyqfj/15/
        //this.Highcharts.wrap(this.Highcharts["seriesTypes"]["gauge"].prototype, 'translate', function (proceed) {
        //    var series = this,
        //        yAxis = series.yAxis,
        //        options = series.options,
        //        center = yAxis.center;

        //    series.generatePoints();

        //    Highcharts.each(series.points, function (point) {

        //        var dialOptions = Highcharts.merge(options.dial, point.dial),
        //            radius = (parseInt(Highcharts.pick(dialOptions.radius, 100)) * center[2]) / 200,
        //            baseLength = (parseInt(Highcharts.pick(dialOptions.baseLength, 100)) * radius) / 100,
        //            rearLength = (parseInt(Highcharts.pick(dialOptions.rearLength, -50)) * radius) / 100,
        //            baseWidth = dialOptions.baseWidth || 1,
        //            topWidth = dialOptions.topWidth || 1,
        //            overshoot = options.overshoot,
        //            rotation = yAxis.startAngleRad + yAxis.translate(point.y, null, null, null, true);

        //        // Handle the wrap and overshoot options
        //        if (Highcharts.isNumber(overshoot)) {
        //            overshoot = overshoot / 180 * Math.PI;
        //            rotation = Math.max(yAxis.startAngleRad - overshoot, Math.min(yAxis.endAngleRad + overshoot, rotation));

        //        } else if (options.wrap === false) {
        //            rotation = Math.max(yAxis.startAngleRad, Math.min(yAxis.endAngleRad, rotation));
        //        }

        //        rotation = rotation * 180 / Math.PI;
        //        console.log(rearLength, baseWidth, topWidth, baseLength, radius)
        //        point.shapeType = 'path';
        //        point.shapeArgs = {
        //            d: dialOptions.path || [
        //                'M', -rearLength, -baseWidth / 2,
        //                baseLength, baseWidth / 2, -rearLength, baseWidth / 2,

        //            ],
        //            translateX: center[0],
        //            translateY: center[1],
        //            rotation: rotation
        //        };

        //        point.plotX = center[0];
        //        point.plotY = center[1];
        //    });
        //});
    }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        let self = this;
        this.chartOptions = {
            chart: {
                type: 'solidgauge',
                marginTop: 10,
                /*events: {
                    load: function () {
                        this.series[0].data[0].graphic.attr({
                            fill: "none",
                            stroke: "black",
                            "stroke-width": 1
                        })
                    }
                },*/
            },

            title: {
                text: ""
            },

            subtitle: {
                y: 45,
                zIndex: 7,
                verticalAlign: "middle",
                useHTML: true,
                text: "<div class='solidgauge-score-wrapper'>" +
                    "<div class='solidgauge-score'>" +
                    "<p class='metric'>CES</p>" +
                    "<p class='score'>" + self.rawData + "</p>" +
                    "</div>" +
                    "<div class='thingy'></div>" +
                    "</div>"
            },

            tooltip: {
                enabled: false
            },

            pane: [{
                startAngle: -90,
                endAngle: 90,
                background: [{ // Track for Move
                    outerRadius: '100%',
                    innerRadius: '70%',
                    backgroundColor: this.Highcharts.color(this.Highcharts.getOptions().colors[0]).setOpacity(0.3).get(),  //Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.3).get(),
                    borderWidth: 0,
                    shape: 'arc'
                }],
                size: '120%',
                center: ['50%', '65%']
            }, {
                startAngle: -90,
                endAngle: 90,
                size: '80%',
                center: ['50%', '65%'],
                background: []
            }],

            yAxis: [{
                min: 0,
                max: 100,
                lineWidth: 2,
                lineColor: 'white',
                tickInterval: 14.3,
                labels: {
                    enabled: false
                },
                minorTickWidth: 0,
                tickLength: 70,
                tickWidth: 3,
                tickColor: 'white',
                zIndex: 6,
                stops: [
                    [0, '#fff'],
                    [0.143, "#FF1E5D"],
                    [0.286, "#FF775D"],
                    [0.429, "#FFC468"],
                    [0.572, "#FDFB7D"],
                    [0.715, "#C8F167"],
                    [0.858, "#87F167"],
                    [1, "#15B700"]
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
                    enabled: false,
                    /*useHTML: true,
                    formatter: function (point) {                        
                        return "<div class='solidgauge-score'>" +
                            "<p class='metric'>CES</p>" +
                            "<p class='score'>" + self.rawData + "</p>" +
                            "</div>"
                    },
                    verticalAlign:"bottom"*/
                },
                borderWidth: 0,
                color: Highcharts.getOptions().colors[0],
                radius: '100%',
                innerRadius: '70%',
                data: self.data
            }]
        }

        this.initChart();
    }


    private initChart() {
        this.chart = Highcharts.chart("container", this.chartOptions);
    }

    private getData(rawData): { y: number }[] {
        let data: { y: number }[] = [];
        let border = 14.3;
        let test = Math.round(rawData / border);
        data.push(rawData);

        for (let i = test; i > 0; i--) {
            if (i * border < rawData) {
                data.push({ y: (i * border) });
            }
        }


        //let start = Math.round(Math.floor(rawData / 10)*10 );
        //data.push(rawData);
        /*for (let i = start; i > 0; i -= 10) {
            data.push({
                y: i
            });
        }*/

        console.log(data);
        return data;
    }
}
