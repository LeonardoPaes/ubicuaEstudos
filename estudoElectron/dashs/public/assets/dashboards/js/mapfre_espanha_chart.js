$(document).ready(function () {
    //
    $("#date_range").on("change", async function () {
        //$('.loading').toggleClass("d-none")
        $("#chart_area").css("display", "grid")
        $("#base_export_smi").removeClass("d-none")
        $("#date_range").val("--- Periodo ---")

        var chart1 = chart1Container(); 
        var chart2 = chart2Container();
        var chart3 = chart3Container();
        var teste = await getChart1Data();
    })
    function getChart1Data(){
  
            return new Promise(function (resolve, reject) {
                $.ajax({
                  url: "http://10.85.169.232/report_aviva_m0",
                  type: "GET",
                  data: { query: "SELECT * from tab_files" },
        
                  success: function (res) {
                    console.log("Mailing total")
                    console.log(res);
        
                    resolve(res[0].total)
                  }
                })
              })
    }
    
    function getChart2Data(){
        return new Promise(function(resolve, reject) {
            /*
            let res = await $.ajax({
                url: "/query_sanofiBot",
                type: "GET",
                data: {
                    select: ""
                },
            
                success: function (res) {
                    return res
                }
            })
            resolve(teste);
            */
        })
    }

    function getChart3Data(){
        return new Promise(function(resolve, reject) {
            /*
            let res = await $.ajax({
                url: "/query_sanofiBot",
                type: "GET",
                data: {
                    select: ""
                },
            
                success: function (res) {
                    return res
                }
            })
            resolve(teste);
            */
        })
    }

    async function chart1Container() {
        var chart = am4core.create("chartdiv1", am4charts.XYChart);

       // chart.data = await getChart1Data();

        chart.data = [{
        "data": "01/12/2019",
        "qtd_enviada": getRandomInt(0,200),
        "qtd_entregues": getRandomInt(0,100),
        }, {
        "data": "02/12/2019",
        "qtd_enviada": getRandomInt(0,200),
        "qtd_entregues": getRandomInt(0,100),
        }, {
        "data": "03/12/2019",
        "qtd_enviada": getRandomInt(0,200),
        "qtd_entregues": getRandomInt(0,100),
        }, {
        "data": "04/12/2019",
        "qtd_enviada": getRandomInt(0,200),
        "qtd_entregues": getRandomInt(0,100),
        }, {
        "data": "05/12/2019",
        "qtd_enviada": getRandomInt(0,200),
        "qtd_entregues": getRandomInt(0,100),
        }, {
        "data": "06/12/2019",
        "qtd_enviada": getRandomInt(0,200),
        "qtd_entregues": getRandomInt(0,100),
        }, {
        "data": "07/12/2019",
        "qtd_enviada": getRandomInt(0,200),
        "qtd_entregues": getRandomInt(0,100),
        }, {
        "data": "08/12/2019",
        "qtd_enviada": getRandomInt(0,200),
        "qtd_entregues": getRandomInt(0,100),
        }, {
        "data": "09/12/2019",
        "qtd_enviada": getRandomInt(0,200),
        "qtd_entregues": getRandomInt(0,100),
        }, {
        "data": "10/12/2019",
        "qtd_enviada": getRandomInt(0,200),
        "qtd_entregues": getRandomInt(0,100),
        },]

        chart.exporting.menu = new am4core.ExportMenu();
        chart.exporting.menu.items = [
            {
                "label": "...",
                "menu": [
                    {
                        "label": "Imagem",
                        "menu": [
                            { "type": "png", "label": "PNG" },
                            { "type": "jpg", "label": "JPG" },
                            { "type": "pdf", "label": "PDF" }
                        ]
                    }
                ]
            }
        ]
        chart.exporting.filePrefix = "disparo/dia";

        // Create axes
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "data";
        categoryAxis.tooltip.disabled = true;
        categoryAxis.renderer.minGridDistance = 1;
        categoryAxis.renderer.labels.template.rotation = 320;
        categoryAxis.renderer.labels.template.hideOversized = false;
        categoryAxis.renderer.labels.template.horizontalCenter = "right";
        categoryAxis.renderer.labels.template.verticalCenter = "middle";
        categoryAxis.renderer.grid.template.disabled = true;

        var interAxis = chart.yAxes.push(new am4charts.ValueAxis());
        interAxis.renderer.opposite = true;
        interAxis.tooltip.disabled = true;
        interAxis.min = 0;
        interAxis.max = 100;
        interAxis.renderer.labels.template.adapter.add("text", (label, target) => {
            return label + "%";
        });
        interAxis.renderer.grid.template.disabled = true;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.grid.template.disabled = true;

        // Column Series
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "qtd_enviada";
        series.dataFields.categoryX = "data";
        series.name = "Quantidades enviadas";
        series.tooltipText = "Enviadas: [bold]{valueY}[/]";
        series.columns.template.stroke = am4core.color("#327ABB")
        series.columns.template.fill = am4core.color("#327ABB")
        series.columns.template.fillOpacity = 0.8;
        series.columns.template.strokeOpacity = 1;
        series.yAxis = valueAxis

        // Add label
        var labelBullet = series.bullets.push(new am4charts.LabelBullet());
        labelBullet.label.text = "{valueY}";
        
        labelBullet.label.fill = am4core.color("#000");

        // % Em sucesso
        var series2 = chart.series.push(new am4charts.LineSeries());
        series2.dataFields.valueY = "qtd_entregues";
        series2.dataFields.categoryX = "data";
        series2.name = "Quantidades entregues";
        series2.tooltipText = "Entregues: [bold]{valueY}%[/]";
        series2.stroke = am4core.color("#ED7D31")
        series2.fill = am4core.color("#ED7D31")
        series2.yAxis = interAxis;

        // Add label
        var labelBullet2 = series2.bullets.push(new am4charts.LabelBullet());
        labelBullet2.label.text = "{valueY}%";
        labelBullet2.locationY = 0;
        labelBullet2.locationX = 0;
        labelBullet2.label.fill = am4core.color("#000");

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.lineY.opacity = 0;    
        
        chart.legend = new am4charts.Legend();
    }

    async function chart2Container() {
        var chart2 = am4core.create("chartdiv2", am4charts.XYChart);

        //chart2.data = await getChart2Data();

        chart2.data = [{
        "hora": "00h",
        "qtd_enviada": getRandomInt(0,200),
        "qtd_entregues": getRandomInt(0,100),
        }, {
        "hora": "1h",
        "qtd_enviada": getRandomInt(0,200),
        "qtd_entregues": getRandomInt(0,100),
        }, {
        "hora": "2h",
        "qtd_enviada": getRandomInt(0,200),
        "qtd_entregues": getRandomInt(0,100),
        }, {
        "hora": "3h",
        "qtd_enviada": getRandomInt(0,200),
        "qtd_entregues": getRandomInt(0,100),
        }, {
        "hora": "4h",
        "qtd_enviada": getRandomInt(0,200),
        "qtd_entregues": getRandomInt(0,100),
        }, {
        "hora": "5h",
        "qtd_enviada": getRandomInt(0,200),
        "qtd_entregues": getRandomInt(0,100),
        }, {
        "hora": "6h",
        "qtd_enviada": getRandomInt(0,200),
        "qtd_entregues": getRandomInt(0,100),
        }, {
        "hora": "7h",
        "qtd_enviada": getRandomInt(0,200),
        "qtd_entregues": getRandomInt(0,100),
        }, {
        "hora": "8h",
        "qtd_enviada": getRandomInt(0,200),
        "qtd_entregues": getRandomInt(0,100),
        }, {
        "hora": "9h",
        "qtd_enviada": getRandomInt(0,200),
        "qtd_entregues": getRandomInt(0,100),
        },]

        chart2.exporting.menu = new am4core.ExportMenu();
        chart2.exporting.menu.items = [
            {
                "label": "...",
                "menu": [
                    {
                        "label": "Imagem",
                        "menu": [
                            { "type": "png", "label": "PNG" },
                            { "type": "jpg", "label": "JPG" },
                            { "type": "pdf", "label": "PDF" }
                        ]
                    }
                ]
            }
        ]
        chart2.exporting.filePrefix = "disparo/hora";

        // Create axes
        var categoryAxis = chart2.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "hora";
        categoryAxis.tooltip.disabled = true;
        categoryAxis.renderer.labels.template.hideOversized = false;
        categoryAxis.renderer.grid.template.disabled = true;

        var interAxis = chart2.yAxes.push(new am4charts.ValueAxis());
        interAxis.renderer.opposite = true;
        interAxis.tooltip.disabled = true;
        interAxis.min = 0;
        interAxis.max = 100;
        interAxis.renderer.labels.template.adapter.add("text", (label, target) => {
            return label + "%";
        });
        interAxis.renderer.grid.template.disabled = true;

        var valueAxis = chart2.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.grid.template.disabled = true;

        // Column Series
        var series = chart2.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "qtd_enviada";
        series.dataFields.categoryX = "hora";
        series.name = "Quantidades enviadas";
        series.tooltipText = "Enviadas: [bold]{valueY}[/]";
        series.columns.template.stroke = am4core.color("#327ABB")
        series.columns.template.fill = am4core.color("#327ABB")
        series.columns.template.fillOpacity = 0.8;
        series.columns.template.strokeOpacity = 1;
        series.yAxis = valueAxis

        // Add label
        var labelBullet = series.bullets.push(new am4charts.LabelBullet());
        labelBullet.label.text = "{valueY}";
        labelBullet.locationY = 0;
        labelBullet.locationX = 0;
        labelBullet.label.fill = am4core.color("#000");

        // % Em sucesso
        var series2 = chart2.series.push(new am4charts.LineSeries());
        series2.dataFields.valueY = "qtd_entregues";
        series2.dataFields.categoryX = "hora";
        series2.name = "Quantidades entregues";
        series2.tooltipText = "Entregues: [bold]{valueY}%[/]";
        series2.stroke = am4core.color("#ED7D31")
        series2.fill = am4core.color("#ED7D31")
        series2.yAxis = interAxis;

        // Add label
        var labelBullet2 = series2.bullets.push(new am4charts.LabelBullet());
        labelBullet2.label.text = "{valueY}%";
        labelBullet2.locationY = 0;
        labelBullet2.locationX = 0;
        labelBullet2.label.fill = am4core.color("#000");

        chart2.cursor = new am4charts.XYCursor();
        chart2.cursor.lineY.opacity = 0;   
        
        chart2.legend = new am4charts.Legend();
    }

    async function chart3Container() {
        var chart = am4core.create("chartdiv3", am4maps.MapChart);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
        chart.numberFormatter.numberFormat = "#.###,##";

        chart.chartContainer.wheelable = false;

        chart.geodata = am4geodata_brazilLow;
        chart.projection = new am4maps.projections.Miller();

        var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

        //polygonSeries.data = await getChart3Data();

        polygonSeries.data = [{
            "id": "BR-SP",
            "name": "São Paulo",
            "value": 525,
            "percent": 25.2
        }]

        polygonSeries.useGeodata = true;
        polygonSeries.calculatePercent = true;
        polygonSeries.mapPolygons.template.strokeOpacity = 0.4;

        var polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}: {value}";
        polygonTemplate.nonScalingStroke = true;
        polygonTemplate.strokeWidth = 0.5;
        polygonTemplate.fill = am4core.color("#92c7fc");
        
        var labelSeries = chart.series.push(new am4maps.MapImageSeries());

        var labelTemplate = labelSeries.mapImages.template.createChild(am4core.Label);
        labelTemplate.horizontalCenter = "middle";
        labelTemplate.verticalCenter = "middle";
        labelTemplate.fontSize = 10;
        labelTemplate.nonScaling = true;
        labelTemplate.interactionsEnabled = false;

        polygonSeries.events.on("inited", function() {
            polygonSeries.mapPolygons.each(polygon => {
                value = polygon.dataItem.dataContext.percent;
                var label = labelSeries.mapImages.create();
                var state = (value != undefined ? value + "%" : 0 + "%");
                label.latitude = polygon.visualLatitude;
                label.longitude = polygon.visualLongitude;
                label.children.getIndex(0).text = state;
            });
        });

        chart.zoomControl = new am4maps.ZoomControl();
        chart.zoomControl.valign = "top";
    }


    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
})