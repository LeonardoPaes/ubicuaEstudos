
$(document).ready(function () {
  $("#date_range").val("--Periodo--")
  $("#date_range, #select_disparo, #select_cobr").on("change", async function (e) {
    $('.loading').toggleClass("d-none")
    $("#chart_area").css("display", "none")

    $("#SMS").addClass("d-none")
    $("#WPP").addClass("d-none")

    $("#sms").addClass("d-none")
    $("#wpp").addClass("d-none")

    $("#funell_sms").addClass("d-none")
    $("#funell_wpp").addClass("d-none")
    $("#pie_sms").addClass("d-none")
    $("#pie_wpp").addClass("d-none")

    var date = $("#date_range").val()
    date = date.split("-")

    var date_start = date[0].split("/")
    date_start = new Date(date_start[2], (date_start[1] - 1), date_start[0], 0, 0, 0, 0).toISOString()
    date_start = date_start.split("T")
    date_start = date_start[0] + " 00:00:00"
    var date_end = date[1].split("/")
    date_end = new Date(date_end[2], (date_end[1] - 1), date_end[0], 0, 0, 0, 0).toISOString()
    date_end = date_end.split("T")
    date_end = date_end[0] + " 23:59:59"

    console.log(date_start, date_end);


    var meio_disp = $("#select_disparo").val()
    var faixa_cobr = $("#select_cobr").val()

    async function check_tab_aviva_m0(phone, d1, d3) {
      return new Promise(function (resolve, reject) {
        $.ajax({
          url: "http://10.85.169.232/db_wsb",
          type: "POST",
          data: {
            select: "mobile from tab_aviva_m0 ",
            where: "status_disp = 1 and status_zap = 1 and campanha = 'wsf' and status != '2' AND ",
            group: "",
            filter: "dtremessa BETWEEN '" + d1 + "' AND '" + d3 + "'"
          },
          success: function (res) {
            //console.log(res);
            if (res.length > 0) {
              resolve(res)
            } else {
              resolve([])
            }
          }
        })
      })
    }

    //SMS FUNCTIONS
    async function check_total_mailing_sms() {
      return new Promise(function (resolve, reject) {
        $.ajax({
          url: "http://10.85.169.232/report_aviva_m0",
          type: "GET",
          data: { query: "SELECT sent_to as mobile from tab_retsms_aviva_m0 where status in ('3','5') and schedule BETWEEN '" + date_start + "' and '" + date_end + "'" },

          success: function (res) {
            console.log("Mailing total")
            console.log(res);

            resolve(res)
          }
        })
      })
    }

    async function get_total_mailing_sms() {
      return new Promise(function (resolve, reject) {
        $.ajax({
          url: "http://10.85.169.232/report_aviva_m0",
          type: "GET",
          data: { query: "SELECT SUM(quantidade) as total from tab_files where campanha = 'aviva_m0' and dt BETWEEN '" + date_start + "' and '" + date_end + "'" },

          success: function (res) {
            console.log("Mailing total")
            console.log(res);

            resolve(res[0].total)
          }
        })
      })
    }
    async function get_mailing_valido_sms() {
      return new Promise(function (resolve, reject) {
        $.ajax({
          url: "http://10.85.169.232/report_aviva_m0",
          type: "GET",
          data: { query: "SELECT count(*) as total from tab_retsms_aviva_m0 where schedule BETWEEN '" + date_start + "' and '" + date_end + "'" },
          success: function (res) {
            console.log("Get Mailing Valido");
            console.log(res);

            resolve(res[0].total)
          }
        })
      })
    }
    async function get_enviados_sucesso_sms() {
      return new Promise(function (resolve, reject) {
        $.ajax({
          url: "http://10.85.169.232/report_aviva_m0",
          type: "GET",
          data: { query: "SELECT count(*) as total from tab_retsms_aviva_m0 where status in ('3','5')  and schedule BETWEEN '" + date_start + "' and '" + date_end + "'" },
          success: function (res) {
            console.log("Enviados Sucesso");
            console.log(res);

            resolve(res[0].total)
          }
        })
      })
    }
    async function get_nao_enviados_sms() {
      return new Promise(function (resolve, reject) {
        $.ajax({
          url: "http://10.85.169.232/report_aviva_m0",
          type: "GET",
          data: { query: "SELECT count(*) as total from tab_retsms_aviva_m0 where status in ('9','12')  and schedule BETWEEN '" + date_start + "' and '" + date_end + "'" },
          success: function (res) {
            console.log("Nao enviados");
            console.log(res);

            resolve(res[0].total)
          }
        })
      })
    }
    async function get_acessos_worst() {
      return new Promise(function (resolve, reject) {
        //Acessos
        $.ajax({
          url: "http://10.85.169.232/aviva_cobr_querys",
          type: "POST",
          data: {
            select: "SUBSTRING(CAST(mobile as VARCHAR(20)),3) as mobile from tab_encerrain ",
            where: "",
            group: "",
            filter: "dtin BETWEEN '" + date_start + " 00:00:00' AND '" + date_end + " 23:59:59'"
          },
          success: async function (res) {
            console.log("dir sms");
            console.log(res);

            check_total = await check_total_mailing_sms()

            let clear = _.differenceWith(res, check_total, _.isEqual)
            console.log(clear);


            resolve(res.length - clear.length)
          }
        })
      })
    }

    async function get_acessos() {
      return new Promise(async function (resolve, reject) {
        //Acessos
        check_tab_aviva = await check_total_mailing_sms('0', date_start, date_end)

        var tupleArr = ""

        if (check_tab_aviva.length > 0) {
          tupleArr = "("
          for (let i = 0; i < check_tab_aviva.length; i++) {
            const element = check_tab_aviva[i];

            if ((check_tab_aviva.length - 1) == i) {
              tupleArr += ("'" + element["mobile"] + "')")
            } else {
              tupleArr += ("'" + element["mobile"] + "',")
            }
          }
        } else {
          tupleArr = "('none')"
        }

        let d1 = new Date(date_start).toISOString()

        let d2 = new Date(date_end)
        d2.setDate(d2.getDate() + 3)
        d2 = d2.toISOString()

        console.log(d1, d2);

        $.ajax({
          url: "http://10.85.169.232/aviva_cobr_querys",
          type: "POST",
          data: {
            select: "count(*) as dirfront from tab_encerrain ",
            where: "mobile in " + tupleArr,
            group: "",
            filter: "and dtin BETWEEN '" + d1 + "' AND '" + date_end + "'"
          },
          success: async function (res) {
            console.log(res);

            resolve(res[0].dirfront)
          }
        })
      })
    }

    //WPP FUNCTIONS
    async function get_total_mailing_wpp() {
      return new Promise(function (resolve, reject) {
        $.ajax({
          url: "http://10.85.169.232/db_wsb",
          type: "POST",
          data: {
            select: "SUM(quantidade) as total from tab_files ",
            where: "",
            group: "",
            filter: " campanha = 'aviva_m0' and dt BETWEEN '" + date_start + " 00:00:00' AND '" + date_end + " 23:59:59'"
          },
          success: function (res) {
            ///console.log(res);
            if (res.length > 0) {
              resolve(res[0].total)
            } else {
              resolve(0)
            }
          }
        })
      })
    }
    async function get_mailing_valido_wpp() {
      return new Promise(function (resolve, reject) {
        $.ajax({
          url: "http://10.85.169.232/db_wsb",
          type: "POST",
          data: {
            select: "count(*) as total from tab_aviva_m0  ",
            where: "campanha = 'wsf' and status = '0' AND ",
            group: "",
            filter: "dtremessa BETWEEN '" + date_start + " 00:00:00' AND '" + date_end + " 23:59:59'"
          },
          success: function (res) {
            console.log(res);
            if (res.length > 0) {
              resolve(res[0].total)
            } else {
              resolve(0)
            }
          }
        })
      })
    }
    async function get_enviados_sucesso_wpp() {
      return new Promise(function (resolve, reject) {
        $.ajax({
          url: "http://10.85.169.232/db_wsb",
          type: "POST",
          data: {
            select: "count(*) as total from tab_aviva_m0 ",
            where: "status_disp = 1 and status_zap = 1 and campanha = 'wsf' and status = '0' AND ",
            group: "",
            filter: "dtremessa BETWEEN '" + date_start + " 00:00:00' AND '" + date_end + " 23:59:59'"
          },
          success: function (res) {
            ///console.log(res);
            if (res.length > 0) {
              resolve(res[0].total)
            } else {
              resolve(0)
            }
          }
        })
      })
    }
    async function get_sem_wpp() {
      return new Promise(function (resolve, reject) {
        $.ajax({
          url: "http://10.85.169.232/db_wsb",
          type: "POST",
          data: {
            select: "count(*) as total from tab_aviva_m0 ",
            where: "status_zap = 2 and campanha = 'wsf' and status = '0' AND ",
            group: "",
            filter: "dtremessa BETWEEN '" + date_start + " 00:00:00' AND '" + date_end + " 23:59:59'"
          },
          success: function (res) {
            ///console.log(res);
            if (res.length > 0) {
              resolve(res[0].total)
            } else {
              resolve(0)
            }
          }
        })
      })
    }
    async function get_nao_enviados_wpp() {
      return new Promise(function (resolve, reject) {
        $.ajax({
          url: "http://10.85.169.232/db_wsb",
          type: "POST",
          data: {
            select: "count(*) as total from tab_aviva_m0 ",
            where: "status_disp = 0 and campanha = 'wsf' and status = '0' AND ",
            group: "",
            filter: "dtremessa BETWEEN '" + date_start + " 00:00:00' AND '" + date_end + " 23:59:59'"
          },
          success: function (res) {
            ///console.log(res);
            if (res.length > 0) {
              resolve(res[0].total)
            } else {
              resolve(0)
            }
          }
        })
      })
    }

    async function get_dir_front2() {
      return new Promise(async function (resolve, reject) {
        check_tab_aviva = await check_tab_aviva_m0('0', date_start, date_end)

        var tupleArr = ""

        if (check_tab_aviva.length > 0) {
          tupleArr = "("
          for (let i = 0; i < check_tab_aviva.length; i++) {
            const element = check_tab_aviva[i];

            if ((check_tab_aviva.length - 1) == i) {
              tupleArr += ("'" + element["mobile"] + "')")
            } else {
              tupleArr += ("'" + element["mobile"] + "',")
            }
          }
        } else {
          tupleArr = "('none')"
        }

        let d1 = new Date(date_start).toISOString()

        let d2 = new Date(date_end)
        d2.setDate(d2.getDate() + 3)
        d2 = d2.toISOString()

        console.log(d1, d2);


        $.ajax({
          url: "http://10.85.169.232/aviva_cobr_querys",
          type: "POST",
          data: {
            select: "count(*) as dirfront from tab_encerrain ",
            where: "mobile in " + tupleArr,
            group: "",
            filter: "and dtin BETWEEN '" + d1 + "' AND '" + date_end + "'"
          },
          success: async function (res) {
            console.log(res);

            resolve(res[0].dirfront)
          }
        })
      })
    }

    async function get_penetracao_sucess(enviados_sucesso, mailing_valido) {
      return new Promise(function (resolve, reject) {
        let penetracao = isNaN(Math.round((enviados_sucesso / mailing_valido) * 100)) ? "0%" : Math.round((enviados_sucesso / mailing_valido) * 100) + "%"
        resolve(penetracao)
      })
    }
    function export_csv(array, name) {
      var options = {
        encoding: "utf-8",
        delimeter: ",",
      }
      var csv = Papa.unparse(array, options);

      var csvData = new Blob([csv], { type: 'text/xls;charset=utf-8;' });
      var csvURL = null;
      if (navigator.msSaveBlob) {
        csvURL = navigator.msSaveBlob(csvData, 'download.csv');
      }
      else {
        csvURL = window.URL.createObjectURL(csvData);
      }
      var tempLink = document.createElement('a');
      tempLink.href = csvURL;
      tempLink.setAttribute('download', name + '.csv');
      tempLink.click();
    }

    //SMS vars
    var total_mailing_sms = await get_total_mailing_sms()
    var mailing_valido_sms = await get_mailing_valido_sms()
    var enviados_sucesso_sms = await get_enviados_sucesso_sms()
    var nao_enviados_sms = await get_nao_enviados_sms()
    var acessos_sms = await get_acessos()

    //Wpp vars
    var total_mailing_wpp = await get_total_mailing_wpp()
    var mailing_valido_wpp = await get_mailing_valido_wpp()
    var enviados_sucesso_wpp = await get_enviados_sucesso_wpp()
    var nao_enviados_wpp = await get_nao_enviados_wpp()
    var acessos_wpp = await get_dir_front2()
    var sem_wpp = await get_sem_wpp()

    var dir_front = 0
    var penetracao_sucesso = 0
    var total_mailing = 0
    var mailing_valido = 0
    var enviados_sucesso = 0
    var nao_enviados = 0
    var penetracao_sucesso = 0

    if (meio_disp == "'SMS'") {
      $("#funell_sms").toggleClass("d-none")
      $("#funnel_container").addClass("chart_container1")
      $("#funnel_container").removeClass("chart_container2")

      document.getElementById("chartdiv").style.margin = "0 15%"

      $("#pie_sms").toggleClass("d-none")
      $("#pie_container").addClass("chart_container1")
      $("#pie_container").removeClass("chart_container2")

      sem_wpp = 0
      dir_front = acessos_sms
      total_mailing = total_mailing_sms
      mailing_valido = mailing_valido_sms
      enviados_sucesso = enviados_sucesso_sms
      nao_enviados = nao_enviados_sms
      penetracao_sucesso = await get_penetracao_sucess(enviados_sucesso, mailing_valido)

    } else if (meio_disp == "'WPP'") {
      $("#funell_wpp").toggleClass("d-none")
      $("#funnel_container").addClass("chart_container1")
      $("#funnel_container").removeClass("chart_container2")

      document.getElementById("chartdiv2").style.margin = "0 15%"

      $("#pie_wpp").toggleClass("d-none")
      $("#pie_container").addClass("chart_container1")
      $("#pie_container").removeClass("chart_container2")

      dir_front = acessos_wpp
      total_mailing = total_mailing_wpp
      mailing_valido = mailing_valido_wpp
      enviados_sucesso = enviados_sucesso_wpp
      nao_enviados = nao_enviados_wpp + sem_wpp
      penetracao_sucesso = await get_penetracao_sucess(enviados_sucesso, mailing_valido)

    } else {
      $("#funnel_container").addClass("chart_container2")
      $("#funnel_container").removeClass("chart_container1")
      $("#funell_sms").toggleClass("d-none")
      $("#funell_wpp").toggleClass("d-none")

      document.getElementById("chartdiv").style.margin = "0"
      document.getElementById("chartdiv2").style.margin = "0"

      $("#pie_container").addClass("chart_container2")
      $("#pie_container").removeClass("chart_container1")
      $("#pie_sms").toggleClass("d-none")
      $("#pie_wpp").toggleClass("d-none")

      dir_front = acessos_sms + acessos_wpp
      total_mailing = total_mailing_sms + total_mailing_wpp
      mailing_valido = mailing_valido_sms + mailing_valido_wpp
      enviados_sucesso = enviados_sucesso_sms + enviados_sucesso_wpp
      nao_enviados = nao_enviados_sms + nao_enviados_wpp + sem_wpp
      penetracao_sucesso = await get_penetracao_sucess(enviados_sucesso, mailing_valido)
    }

    if (total_mailing_sms == 0 && total_mailing_wpp == 0) {
      setTimeout(() => {
        Swal.fire({
          type: 'info',
          title: 'Alerta',
          text: "Sem dados neste Periodo",
        }).then(result => {
          $('.loading').toggleClass("d-none")
          $("#base_export_smi").addClass("d-none")
        })
      }, 2000)
    } else {
      //SMS Cards
      $("#total_mailing").text(total_mailing)
      $("#mailing_valido").text(mailing_valido)
      $("#enviados_sucesso").text(enviados_sucesso)
      $("#sem_wpp").text(sem_wpp)
      $("#nao_enviados").text(nao_enviados)
      $("#dir_front").text(dir_front)
      $("#penetracao_base").text(penetracao_sucesso)
      //WPP Cards

      am4core.disposeAllCharts()
      am4core.ready(async function () {
        $("#panel_container").removeClass("chart_container1")
        $("#panel_container").addClass("chart_container2")
        $("#SMS").toggleClass("d-none")
        $("#WPP").toggleClass("d-none")
        $("#sms").toggleClass("d-none")
        $("#wpp").toggleClass("d-none")

        // Themes begin

        am4core.useTheme(am4themes_dataviz)
        am4core.useTheme(am4themes_animated);
        // Themes end

        let chart = am4core.create("chartdiv", am4charts.SlicedChart);
        chart.numberFormatter.numberFormat = "#.###,##";

        chart.responsive.enabled = true;
        chart.numberFormatter.numberFormat = "#.";
        chart.data = [{
          "name": "Mailing Recebido",
          "value": total_mailing_sms,
          "value_fake": 40,
          "label": total_mailing_sms
        }, {
          "name": "Mailing Válido",
          "value": mailing_valido_sms,
          "value_fake": 30,
          "label": isNaN(Math.floor((mailing_valido_sms * 100) / total_mailing_sms)) ? 0 : Math.floor((mailing_valido_sms * 100) / total_mailing_sms) + "%"
        }, {
          "name": "Entregues",
          "value": enviados_sucesso_sms,
          "value_fake": 20,
          "label": isNaN(Math.floor((enviados_sucesso_sms * 100) / total_mailing_sms)) ? 0 : Math.floor((enviados_sucesso_sms * 100) / total_mailing_sms) + "%"
        }, {
          "name": "Acessou link",
          "value": acessos_sms,
          "value_fake": 10,
          "label": isNaN(Math.floor((acessos_sms * 100) / enviados_sucesso_sms)) ? 0 : Math.floor((acessos_sms * 100) / enviados_sucesso_sms) + "%",
        }];

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
        chart.exporting.filePrefix = "Funil_sms";

        let series = chart.series.push(new am4charts.PyramidSeries());
        series.dataFields.value = "value_fake";
        series.dataFields.valueX = "label"
        series.dataFields.valueY = "value"
        series.dataFields.category = "name";
        series.calculatePercent = true;
        series.slices.template.height = am4core.percent(25);
        series.slices.template.fillOpacity = 0.8;
        series.topWidth = am4core.percent(80);
        series.bottomWidth = am4core.percent(25);

        series.colors.list = [
          am4core.color("#02B78C"),
          am4core.color("#F6545F"),
          am4core.color("#F7A503"),
          am4core.color("#20404A"),
        ]

        var hs = series.slices.template.states.getKey("hover");
        hs.properties.scale = 1;
        hs.properties.fillOpacity = 0.5;

        series.alignLabels = true;

        series.labels.template.text = "{category}: [bold]{valueX}[/]";
        series.slices.template.tooltipText = "{category} [bold]{valueY}[/]";

        // Chart2

        let chart2 = am4core.create("chartdiv2", am4charts.SlicedChart);
        chart2.numberFormatter.numberFormat = "#.";
        chart2.data = [{
          "name": "Mailing Recebido",
          "value": total_mailing_wpp,
          "value_fake": 40,
          "label": total_mailing_wpp
        }, {
          "name": "Mailing Válido",
          "value": mailing_valido_wpp,
          "value_fake": 30,
          "label": isNaN(Math.floor((mailing_valido_wpp * 100) / total_mailing_wpp)) ? 0 : Math.floor((mailing_valido_wpp * 100) / total_mailing_wpp) + "%"
        }, {
          "name": "Entregues",
          "value": enviados_sucesso_wpp,
          "value_fake": 20,
          "label": isNaN(Math.floor((enviados_sucesso_wpp * 100) / mailing_valido_wpp)) ? 0 : Math.floor((enviados_sucesso_wpp * 100) / mailing_valido_wpp) + "%"
        }, {
          "name": "Acessou link",
          "value": acessos_wpp,
          "value_fake": 10,
          "label": isNaN(Math.floor((acessos_wpp * 100) / enviados_sucesso_wpp)) ? 0 : Math.floor((acessos_wpp * 100) / enviados_sucesso_wpp) + "%",
        }];

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
        chart2.exporting.filePrefix = "Funil_wpp";

        chart2.responsive.enabled = true;
        let series2 = chart2.series.push(new am4charts.PyramidSeries());
        series2.calculatePercent = true;
        series2.dataFields.value = "value_fake";
        series2.dataFields.valueX = "label";
        series2.dataFields.valueY = "value"
        series2.dataFields.category = "name";
        series2.slices.template.fillOpacity = 0.8;
        series2.topWidth = am4core.percent(80);
        series2.bottomWidth = am4core.percent(25);

        series2.colors.list = [
          am4core.color("#02B78C"),
          am4core.color("#F6545F"),
          am4core.color("#F7A503"),
          am4core.color("#20404A"),
        ]

        var hs2 = series2.slices.template.states.getKey("hover");
        hs2.properties.scale = 1;
        hs2.properties.fillOpacity = 0.5;

        series2.alignLabels = true;
        series2.labels.template.text = "{category}: [bold]{valueX}[/]";
        series2.slices.template.tooltipText = "{category} [bold]{valueY}[/]";

        var chart3 = am4core.create("chartdiv3", am4charts.PieChart3D);
        chart3.numberFormatter.numberFormat = "#.###,##";
        chart3.hiddenState.properties.opacity = 0; // this creates initial fade-in
        chart3.responsive.enabled = true;
        chart3.legend = new am4charts.Legend();
        chart3.innerRadius = am4core.percent(50);
        var series3 = chart3.series.push(new am4charts.PieSeries());
        series3.dataFields.value = "quantidade";
        series3.dataFields.category = "resposta";
        series3.slices.template.fillOpacity = 1;
        series3.alignLabels = false;
        series3.labels.template.text = "{value.percent.formatNumber('#.0')}%";
        series3.colors.list = [
          am4core.color("#015CB8"),
          am4core.color("#004A4D"),
        ]
        var hs3 = series3.slices.template.states.getKey("hover");
        hs3.properties.depth = 50;
        hs3.properties.scale = 1;
        hs3.properties.fillOpacity = 0.95;

        // Chart3 Ajax
        $.ajax({
          url: "http://10.85.169.232/report_aviva_m0",
          type: "GET",
          data: { query: "select (select count(*) from tab_retsms_aviva_m0 where status = '5' and schedule BETWEEN '" + date_start + "' and '" + date_end + "') as entregues, (select count(*) from tab_retsms_aviva_m0 where status = '12' and schedule BETWEEN '" + date_start + "' and '" + date_end + "') as nentregues, (select count(*) from tab_retsms_aviva_m0 where status = '9' and schedule BETWEEN '" + date_start + "' and '" + date_end + "') as cancelados, (select count(*) from tab_retsms_aviva_m0 where status = '3' and schedule BETWEEN '" + date_start + "' and '" + date_end + "') as enviados" },
          success: function (res) {
            console.log("Chart3 Ajax");
            console.log(res);

            let status_data = []
            status_data.push({
              "entregues": res[0].entregues,
              "nao_entregues": res[0].nentregues,
              "cancelados": res[0].cancelados,
              "enviados": res[0].enviados
            })

            var chart3_data = []
            chart3_data.push({
              resposta: 'Enviados',
              quantidade: status_data[0].enviados
            }, {
              resposta: 'Cancelados',
              quantidade: status_data[0].cancelados
            }, {
              resposta: 'Não entregues',
              quantidade: status_data[0].nao_entregues
            }, {
              resposta: 'Entregues',
              quantidade: status_data[0].entregues
            })
            chart3.data = chart3_data
          }
        })

        chart3.exporting.menu = new am4core.ExportMenu();
        chart3.exporting.menu.items = [{
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
        chart3.exporting.filePrefix = "mailing_valido_invalido";

        var chart4 = am4core.create("chartdiv4", am4charts.PieChart3D);
        chart4.numberFormatter.numberFormat = "#.###,##";
        chart4.hiddenState.properties.opacity = 0; // this creates initial fade-in
        chart4.responsive.enabled = true;
        chart4.legend = new am4charts.Legend();
        var series4 = chart4.series.push(new am4charts.PieSeries3D());
        series4.dataFields.value = "quantidade";
        series4.dataFields.category = "resposta";
        series4.slices.template.fillOpacity = 1;
        series4.alignLabels = false;
        series4.labels.template.text = "{value.percent.formatNumber('#.0')}%";
        series4.colors.list = [
          am4core.color("#00ad4e"),
          am4core.color("#5a99d3"),
        ]
        var hs4 = series4.slices.template.states.getKey("hover");
        hs4.properties.depth = 50;
        hs4.properties.scale = 1;
        hs4.properties.fillOpacity = 0.95;

        chart4.data = [{
          resposta: "Possui WPP",
          quantidade: mailing_valido_wpp
        }, {
          resposta: "Não possui WPP",
          quantidade: sem_wpp
        }]

        chart4.exporting.menu = new am4core.ExportMenu();
        chart4.exporting.menu.items = [{
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
        chart4.exporting.filePrefix = "mailing_valido_invalido";

      });

      setTimeout(() => {
        $('.loading').toggleClass("d-none")
        $("#chart_area").css("display", "grid")
        $("#base_export_smi").removeClass("d-none")

        $("#base_export_smi").on("click", function () {
          $.ajax({
            url: "http://10.85.169.232/db_wsb",
            type: "POST",
            data: {
              select: "* from tab_aviva_m0 as b ",
              where: " campanha = 'wsf' and status = '0' and ",
              group: "",
              filter: "b.dtremessa BETWEEN '" + date_start + " 00:00:00' AND '" + date_end + " 23:59:59'"
            },
            success: function (res) {
              //console.log(res);
              var csv_data = []
              for (let index = 0; index < res.length; index++) {
                const element = res[index];
                csv_data.push(element)
              }
              Swal.fire({
                input: 'text',
                type: 'info',
                title: 'Exportar',
                text: "Informe o nome do arquivo",
              }).then(function (result) {
                if (result.value) {
                  export_csv(csv_data, result.value)
                }
              })
            }
          })
        });

        //csv_export_ajax chart1
        $("#chart1_csv").on("click", function () {
          $.ajax({
            url: "/aviva_ws_cob",
            type: "POST",
            data: {
              select: "a.* from disparo_info_sms as a left join disparos as b on (a.nome_disparo = b.nome_disparo) ",
              where: "b.nome_campanha = 'aviva_m2' AND ",
              group: "",
              filter: "a.dtenvio BETWEEN '" + date_start + " 00:00:00' AND '" + date_end + " 23:59:59'"
            },
            success: function (res) {
              ///console.log(res);
              $('.loading').toggleClass("d-none")
              var csv_data = []
              for (let index = 0; index < res.length; index++) {
                const element = res[index];
                csv_data.push(element)
              }
              $('.loading').toggleClass("d-none")
              Swal.fire({
                input: 'text',
                type: 'info',
                title: 'Exportar',
                text: "Informe o nome do arquivo",
              }).then(function (result) {
                if (result.value) {
                  export_csv(csv_data, result.value)
                }
              })
            }
          })
        });
        //csv_export_ajax chart2
        $("#chart2_csv").on("click", function () {
          $.ajax({
            url: "http://10.85.169.232/db_wsb",
            type: "POST",
            data: {
              select: "* from tab_aviva_m0 ",
              where: "campanha = 'wsf' and status = '0' AND ",
              group: "",
              filter: "dtremessa BETWEEN '" + date_start + " 00:00:00' AND '" + date_end + " 23:59:59'"
            },
            success: function (res) {
              $('.loading').toggleClass("d-none")
              var csv_data = []
              for (let index = 0; index < res.length; index++) {
                const element = res[index];
                csv_data.push(element)
              }
              $('.loading').toggleClass("d-none")
              Swal.fire({
                input: 'text',
                type: 'info',
                title: 'Exportar',
                text: "Informe o nome do arquivo",
              }).then(function (result) {
                if (result.value) {
                  export_csv(csv_data, result.value)
                }
              })
            }
          })
        });

        //csv_export_ajax chart2
        $("#chart3_csv").on("click", function () {
          // Chart3 Ajax
          $.ajax({
            url: "http://10.85.169.232/report_aviva_m0",
            type: "GET",
            data: { query: "SELECT * from tab_retsms_aviva_m0 where schedule BETWEEN '" + date_start + "' and '" + date_end + "'" },
            success: function (res) {
              console.log("Chart3 Csv")
              console.log(res);

              //console.log(res);
              var csv_data = []
              for (let index = 0; index < res.length; index++) {
                const element = res[index];
                csv_data.push(element)
              }
              $('.loading').toggleClass("d-none")
              Swal.fire({
                input: 'text',
                type: 'info',
                title: 'Exportar',
                text: "Informe o nome do arquivo",
              }).then(function (result) {
                if (result.value) {
                  export_csv(csv_data, result.value)
                }
              })
            }
          })
        });
        //csv_export_ajax chart2
        $("#chart4_csv").on("click", function () {
          $.ajax({
            url: "http://10.85.169.232/db_wsb",
            type: "POST",
            data: {
              select: "* from tab_aviva_m0  ",
              where: "status_disp = 1 and campanha = 'wsf' and status = '0' AND ",
              group: "order by status_zap asc",
              filter: "dtremessa BETWEEN '" + date_start + " 00:00:00' AND '" + date_end + " 23:59:59' "
            },
            success: function (res) {
              ///console.log(res);
              $('.loading').toggleClass("d-none")
              var csv_data = []
              for (let index = 0; index < res.length; index++) {
                const element = res[index];
                csv_data.push(element)
              }
              $('.loading').toggleClass("d-none")
              Swal.fire({
                input: 'text',
                type: 'info',
                title: 'Exportar',
                text: "Informe o nome do arquivo",
              }).then(function (result) {
                if (result.value) {
                  export_csv(csv_data, result.value)
                }
              })
            }
          })
        });
      }, 2000);
    }
  });
})