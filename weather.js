//创建chart 相当于new一个对象
//   var chart = echarts.init(document.querySelector("div"));
var myChart = echarts.init(document.getElementById("detail"));
//图表内容，样式
//配置图表的样式
var option = {
  grid: {
    top: "-10%",
    left: "-3%",
    right: "3%",
    bottom: "-40%",
    containLabel: true,
  },
  legend: {
    selectedMode: false,
  },
  tooltip: {
    trigger: "axis",
    show: false,
  },
  legend: {
    data: ["最高气温", "最低气温"],
  },
  toolbox: {
    show: false,
  },
  xAxis: {
    show: false,
    type: "category",
    boundaryGap: false,
    data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    scale: true,
    max: 6,
  },
  yAxis: {
    show: false,
    type: "value",
    axisLabel: {
      formatter: "{value} °C",
    },
    scale: true,
    min: 0,
    max: 45,
    splitNumber: 10,
  },
  series: [
    {
      type: "line",
      itemStyle: { normal: { label: { show: true } } },
      data: [28, 27, 29, 27, 26, 25, 23],
      smooth: true, //true 为平滑曲线，false为直线
      clickable: false,
    },
    {
      type: "line",
      data: [20, 21, 22, 22, 21, 21, 20],
      itemStyle: { normal: { label: { show: true } } },
      smooth: true, //true 为平滑曲线，false为直线
      clickable: false,
    },
  ],
};
myChart.setOption(option);
option && myChart.setOption(option);

$(document).ready(function () {
  $.ajax({
    url: "https://www.fastmock.site/mock/42299cb93365921b15e4955cdbd2ed7d/weather519/nowweather",
    type: "get",
    dataType: "json",
    success: function (res, status) {
      console.log(res);
      var cityname = res.city;
      // console.log(cityname)
      $("#city").html(cityname + "市");
      $("#city-temperature").html(res.tem + "°");
      $("#city-wea").html(res.wea);
      $("#city-win").html(res.win + res.win_speed);
      $('.maincontent').css("background",'url("/weather-background/'+res.wea_img+'.jpg") no-repeat')
      $('.maincontent').css("background-size",'100% 100%')
    },
  });
});
$(document).ready(function () {
  $.ajax({
    url: "https://www.fastmock.site/mock/42299cb93365921b15e4955cdbd2ed7d/weather519/weathernowandtomorrow",
    type: "get",
    dataType: "json",
    success: function (res, status) {
      console.log(res);
      $("#today-tem").html(
        res.data[0].tem_day + "/" + res.data[0].tem_night + "°"
      );
      $("#today-wea").html(res.data[0].wea);

      $("#today-wea-img").append(
        $(
          `<span><img style="width:30px" src="/${res.data[0].wea_img}.png" alt=""></span>`
        )
      );
      $("#tomorrow-tem").html(
        res.data[1].tem_day + "/" + res.data[1].tem_night + "°"
      );
      $("#tomorrow-wea").html(res.data[1].wea);
      $("#tomorrow-wea-img").append(
        $(
          `<span><img style="width:30px" src="/${res.data[1].wea_img}.png" alt=""></span>`
        )
      );
    },
  });
});
$(document).ready(function () {
  $.ajax({
    url: "https://www.fastmock.site/mock/42299cb93365921b15e4955cdbd2ed7d/weather519/weatherhours",
    type: "get",
    dataType: "json",
    success: function (res, status) {
      console.log(res);
      for (var i = 0; i < 23; i++) {
        $("#list").append(
          $(
            "<li><div>" +
              res.hours[i].time +
              "</div><div>" +
              `<span><img style="width:30px" src="/${res.hours[i].wea_img}.png" alt=""></span>` +
              "</div><div>" +
              res.hours[i].tem +
              "°</div></li>"
          )
        );
      }

      console.log(res);
    },
  });
});
$(document).ready(function () {
  $.ajax({
    url: "https://www.fastmock.site/mock/42299cb93365921b15e4955cdbd2ed7d/weather519/sevenday",
    type: "get",
    dataType: "json",
    success: function (res, status) {
      console.log(res);
      // console.log(res[0].date)
      for (var i = 0; i < 7; i++) {
        console.log(res.data[i].date.slice(4, 6));
        $("#detail-top").append(
          $("<li>" + res.data[i].date.slice(5, 10) + "</li>")
        );
        $("#detail-middle").append(
          $(
            `<span><img style="width:30px;margin-right:36px;margin-left:1px" src="/${res.data[i].wea_img}.png" alt=""></span>`
          )
        );
        $("#detail-win").append($("<li>" + res.data[i].win + "</li>"));
        $("#detail-speed").append($("<li>" + res.data[i].win_speed + "</li>"));
      }
    },
  });
});
$(document).ready(function () {
  $.ajax({
    url: "https://www.fastmock.site/mock/42299cb93365921b15e4955cdbd2ed7d/weather519/live",
    type: "get",
    dataType: "json",
    success: function (res, status) {
      console.log(res);
      $("#lives").append(
        $(`    <li>
                <div style="padding: 10px;width:25.3vw;box-sizing:border-box;border:1px solid #e6e6e6;margin: 0 -1px -1px 0;">
                  <div><img style="width:25px" src="/live/${res.data.chenlian.name}.png" alt=""></div>
                    <div>${res.data.chenlian.level}</div>
                    <div style="color:#999;font-size:12px">${res.data.chenlian.name}</div>
                  </div>
                  <div style="padding: 10px;width:25.3vw;box-sizing:border-box;border:1px solid #e6e6e6;margin: 0 -1px -1px 0;">

                  <div><img style="width:25px" src="/live/${res.data.chuanyi.name}.png" alt=""></div>

                    <div>${res.data.chuanyi.level}</div>
                    <div style="color:#999;font-size:12px">${res.data.chuanyi.name}</div>
                  </div>
            </li>`)
      );
      $("#lives").append(
        $(`    <li>
              <div style="padding: 10px;width:25.3vw;box-sizing:border-box;border:1px solid #e6e6e6;margin: 0 -1px -1px 0;">

                  <div><img style="width:25px" src="/live/${res.data.diaoyu.name}.png" alt=""></div>
                    <div>${res.data.diaoyu.level}</div>
                    <div style="color:#999;font-size:12px">${res.data.diaoyu.name}</div>
                  </div>
                  <div style="padding: 10px;width:25.3vw;box-sizing:border-box;border:1px solid #e6e6e6;margin: 0 -1px -1px 0;">

                  <div><img style="width:25px" src="/live/${res.data.fangshai.name}.png" alt=""></div>

                    <div>${res.data.fangshai.level}</div>
                    <div style="color:#999;font-size:12px">${res.data.fangshai.name}</div>
                  </div>
            </li>`)
      );
      $("#lives").append(
        $(`    <li>
              <div style="padding: 10px;width:25.3vw;box-sizing:border-box;border:1px solid #e6e6e6;margin: 0 -1px -1px 0;">

                  <div><img style="width:25px" src="/live/${res.data.fengzheng.name}.png" alt=""></div>
                  
                    <div>${res.data.fengzheng.level}</div>
                    <div style="color:#999;font-size:12px">${res.data.fengzheng.name}</div>
                  </div>
                  <div style="padding: 10px;width:25.3vw;box-sizing:border-box;border:1px solid #e6e6e6;margin: 0 -1px -1px 0;">

                  <div><img style="width:25px" src="/live/${res.data.ganmao.name}.png" alt=""></div>

                    <div>${res.data.ganmao.level}</div>
                    <div style="color:#999;font-size:12px">${res.data.ganmao.name}</div>
                  </div>
            </li>`)
      );
      $("#lives").append(
        $(`    <li>
              <div style="padding: 10px;width:25.3vw;box-sizing:border-box;border:1px solid #e6e6e6;margin: 0 -1px -1px 0;">

                  <div><img style="width:25px" src="/live/${res.data.ganzao.name}.png" alt=""></div>

                    <div>${res.data.ganzao.level}</div>
                    <div style="color:#999;font-size:12px">${res.data.ganzao.name}</div>
                  </div>
                  <div style="padding: 10px;width:25.3vw;box-sizing:border-box;border:1px solid #e6e6e6;margin: 0 -1px -1px 0;">

                  <div><img style="width:25px" src="/live/${res.data.guangjie.name}.png" alt=""></div>

                    <div>${res.data.guangjie.level}</div>
                    <div style="color:#999;font-size:12px">${res.data.guangjie.name}</div>
                  </div>
            </li>`)
      );
      $("#lives").append(
        $(`    <li>
              <div style="padding: 10px;width:25.3vw;box-sizing:border-box;border:1px solid #e6e6e6;margin: 0 -1px -1px 0;">

                  <div><img style="width:25px" src="/live/${res.data.guomin.name}.png" alt=""></div>

                    <div>${res.data.guomin.level}</div>
                    <div style="color:#999;font-size:12px">${res.data.guomin.name}</div>
                  </div>
                  <div style="padding: 10px;width:25.3vw;box-sizing:border-box;border:1px solid #e6e6e6;margin: 0 -1px -1px 0;">

                  <div><img style="width:25px" src="/live/${res.data.huachuan.name}.png" alt=""></div>

                    <div>${res.data.huachuan.level}</div>
                    <div style="color:#999;font-size:12px">${res.data.huachuan.name}</div>
                  </div>
            </li>`)
      );
      $("#lives").append(
        $(`    <li>
              <div style="padding: 10px;width:25.3vw;box-sizing:border-box;border:1px solid #e6e6e6;margin: 0 -1px -1px 0;">

                  <div><img style="width:25px" src="/live/${res.data.jiaotong.name}.png" alt=""></div>

                    <div>${res.data.jiaotong.level}</div>
                    <div style="color:#999;font-size:12px">${res.data.jiaotong.name}</div>
                  </div>
                  <div style="padding: 10px;width:25.3vw;box-sizing:border-box;border:1px solid #e6e6e6;margin: 0 -1px -1px 0;">

                  <div><img style="width:25px" src="/live/${res.data.kongtiao.name}.png" alt=""></div>

                    <div>${res.data.kongtiao.level}</div>
                    <div style="color:#999;font-size:12px">${res.data.kongtiao.name}</div>
                  </div>
            </li>`)
      );
      $("#lives").append(
        $(`    <li>
              <div style="padding: 10px;width:25.3vw;box-sizing:border-box;border:1px solid #e6e6e6;margin: 0 -1px -1px 0;">

                  <div><img style="width:25px" src="/live/${res.data.liangshai.name}.png" alt=""></div>

                    <div>${res.data.liangshai.level}</div>
                    <div style="color:#999;font-size:12px">${res.data.liangshai.name}</div>
                  </div>
                  <div style="padding: 10px;width:25.3vw;box-sizing:border-box;border:1px solid #e6e6e6;margin: 0 -1px -1px 0;">

                  <div><img style="width:25px" src="/live/${res.data.lukuang.name}.png" alt=""></div>

                    <div>${res.data.lukuang.level}</div>
                    <div style="color:#999;font-size:12px">${res.data.lukuang.name}</div>
                  </div>
            </li>`)
      );
      $("#lives").append(
        $(`    <li>
              <div style="padding: 10px;width:25.3vw;box-sizing:border-box;border:1px solid #e6e6e6;margin: 0 -1px -1px 0;">

                  <div><img style="width:25px" src="/live/${res.data.lvyou.name}.png" alt=""></div>

                    <div>${res.data.lvyou.level}</div>
                    <div style="color:#999;font-size:12px">${res.data.lvyou.name}</div>
                  </div>
                  <div style="padding: 10px;width:25.3vw;box-sizing:border-box;border:1px solid #e6e6e6;margin: 0 -1px -1px 0;">

                  <div><img style="width:25px" src="/live/${res.data.meifa.name}.png" alt=""></div>

                    <div>${res.data.meifa.level}</div>
                    <div style="color:#999;font-size:12px">${res.data.meifa.name}</div>
                  </div>
            </li>`)
      );
    },
  });
});
$("#cancel").click(function () {
  $("#search").slideUp();
});
$("#city").click(function () {
  $("#search").slideDown();
  if ($("#groupid").children("li").length > 0) {
    $("#historysearch").show();
    $("#clear").show();
  } else {
    $("#historysearch").hide();
    $("#clear").hide();
  }
});
var cityname;
var cityarray = [];
$("#js-groupId").bind("input", function () {
  cityname = $("#js-groupId").val();
  console.log(cityname);
});
$("#hotcity>li").each(function (index) {
  $(this).on("click", function () {
    cityname = $(this).text();
    // console.log(city)
    $("#js-groupId").val(cityname);
    for (var i = 0; i < cityarray.length; i++) {
      if (cityarray[i] == cityname) {
      } else {
        cityarray.push(cityname);
      }
    }
    $("#js-groupId").val("");
    console.log("搜索", cityname, "天气");
    $.ajax({
      url: "https://www.tianqiapi.com/free/day?appid=68964431&appsecret=7MzBF47T&",
      data:{
        city:cityname
      },
      type: "get",
      dataType: "json",
      success: function (res, status) {
        console.log(res,status)
        var cityname = res.city;
        $("#city").html(cityname + "市");
        $("#city-temperature").html(res.tem + "°");
        $("#city-wea").html(res.wea);
        $("#city-win").html(res.win + res.win_speed);
        $('.maincontent').css("background",'url("/weather-background/'+res.wea_img+'.jpg") no-repeat')
        $('.maincontent').css("background-size",'100% 100%')
      },
    });

      $.ajax({
        url: "https://www.tianqiapi.com/free/week?appid=68964431&appsecret=7MzBF47T&",
        type: "get",
        data:{
          city:cityname
        },
        dataType: "json",
        success: function (res, status) {
          console.log(res);
          // console.log(res[0].date)
          $("#detail-top").empty()
          $("#detail-middle").empty()
          $("#detail-win").empty()
          $("#detail-speed").empty()
          var tem_day = []
          var tem_night = []
          for(var i = 0;i<7;i++){
            tem_day[i] = parseInt(res.data[i].tem_day)
            tem_night[i] = parseInt(res.data[i].tem_night)
          }
          console.log(tem_day,tem_night)
          option.series[0].data = tem_day
          option.series[1].data = tem_night
          myChart.setOption(option);
          option && myChart.setOption(option);


          for (var i = 0; i < 7; i++) {
            console.log(res.data[i].date.slice(4, 6));
            $("#detail-top").append(
              $("<li>" + res.data[i].date.slice(5, 10) + "</li>")
            );
            $("#detail-middle").append(
              $(
                `<span><img style="width:30px;margin-right:36px;margin-left:1px" src="/${res.data[i].wea_img}.png" alt=""></span>`
              )
            );
            $("#detail-win").append($("<li>" + res.data[i].win + "</li>"));
            $("#detail-speed").append($("<li>" + res.data[i].win_speed + "</li>"));
          }
        },
      });

    $("#search").slideUp();
    setTimeout(() => {
      $("#groupid").append($(`<li>${cityname}</li>`));
    }, 500);
  });
});

$("#js-groupId").keydown(function (e) {
  if (e.keyCode == 13) {
    console.log("搜索");
    console.log(cityname);
    for (var i = 0; i < cityarray.length; i++) {
      if (cityarray[i] == cityname) {
        return;
      }
    }
    cityarray.push(cityname);
    $("#js-groupId").val("");
    console.log("搜索", cityname, "天气");
    $.ajax({
      url: "https://www.tianqiapi.com/free/day?appid=68964431&appsecret=7MzBF47T&",
      data:{
        city:cityname
      },
      type: "get",
      dataType: "json",
      success: function (res, status) {
        console.log(res,status)
        var cityname = res.city;
        $("#city").html(cityname + "市");
        $("#city-temperature").html(res.tem + "°");
        $("#city-wea").html(res.wea);
        $("#city-win").html(res.win + res.win_speed);
        $('.maincontent').css("background",'url("/weather-background/'+res.wea_img+'.jpg") no-repeat')
        $('.maincontent').css("background-size",'100% 100%')
      },
    });

      $.ajax({
        url: "https://www.tianqiapi.com/free/week?appid=68964431&appsecret=7MzBF47T&",
        type: "get",
        data:{
          city:cityname
        },
        dataType: "json",
        success: function (res, status) {
          console.log(res);
          // console.log(res[0].date)
          $("#detail-top").empty()
          $("#detail-middle").empty()
          $("#detail-win").empty()
          $("#detail-speed").empty()
          var tem_day = []
          var tem_night = []
          for(var i = 0;i<7;i++){
            tem_day[i] = parseInt(res.data[i].tem_day)
            tem_night[i] = parseInt(res.data[i].tem_night)
          }
          console.log(tem_day,tem_night)
          option.series[0].data = tem_day
          option.series[1].data = tem_night
          myChart.setOption(option);
          option && myChart.setOption(option);


          for (var i = 0; i < 7; i++) {
            console.log(res.data[i].date.slice(4, 6));
            $("#detail-top").append(
              $("<li>" + res.data[i].date.slice(5, 10) + "</li>")
            );
            $("#detail-middle").append(
              $(
                `<span><img style="width:30px;margin-right:36px;margin-left:1px" src="/${res.data[i].wea_img}.png" alt=""></span>`
              )
            );
            $("#detail-win").append($("<li>" + res.data[i].win + "</li>"));
            $("#detail-speed").append($("<li>" + res.data[i].win_speed + "</li>"));
          }
        },
      });

    $("#search").slideUp();
    setTimeout(() => {
      $("#groupid").append($(`<li>${cityname}</li>`));
    }, 500);
  }
 

  if ($("#groupid").children("li").length > 0) {
    $("#historysearch").show();
    $("#clear").show();
  } else {
    $("#historysearch").hide();
    $("#clear").hide();
  }
});
$("#clear").click(function () {
  cityarray = [];
  $("#groupid>li").remove();
  $("#historysearch").hide();
  $("#clear").hide();
});

$(document).ready(function () {
  $.ajax({
    url: "https://www.fastmock.site/mock/42299cb93365921b15e4955cdbd2ed7d/weather519/weatherlevel",
    type: "get",
    dataType: "json",
    success: function (res, status) {
      console.log(res);
      $("#weather-level-num").html(res.air);
      $("#weather-level-lev").html(res.air_level);
      $("#weather-win-num").html(res.air);
      $("#weather-win-lev").html(res.air_level);
      if (res.air < 50) {
        $(".weatherlevel").css("background-color", "green");
      } else if (res.air < 100) {
        $(".weatherlevel").css("background-color", "#efc441");
      } else {
        $(".weatherlevel").css("background-color", "red");
      }
      $("#pm25-num").html(res.pm25);
      $("#pm10-num").html(res.pm10);
      $("#so2-num").html(res.so2);
      $("#no2-num").html(res.no2);
      $("#o3-num").html(res.o3);

      $("#co-num").html(res.co);
      // $("#pm25").append($("<li>" + res.air + "</li>"));
    },
  });
});

$(".weatherlevel").click(function () {
  $("#weather-window-box").show("normal");
});
$("#weather-window-close").click(function () {
  $("#weather-window-box").hide("normal");
});
