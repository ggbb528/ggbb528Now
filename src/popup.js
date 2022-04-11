'use strict';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import './popup.css';

$(function () {
  $('body').on('click', 'a', function () {
    chrome.tabs.create({ url: $(this).attr('href') });
    return false;
  });
  
  // Get data from opgg
  const axios1 = require('axios');
  axios1.get('https://www.op.gg/summoners/kr/%EC%A4%80%20%EB%B0%9B').then(function (r){
    if (r.status == 200) {
      var htmlData = r.data;
	  var temp = htmlData.split("\"buildId\":\"")[1].split("\"")[0];
	  const axios2 = require('axios');
	  axios2.get(`https://www.op.gg/_next/data/${temp}/summoners/kr/%EC%A4%80%20%EB%B0%9B.json?region=kr&summoner=%EC%A4%80+%EB%B0%9B`).then(function (response){
        if (response.status == 200){		  
          var dataObj = response.data.pageProps;
          $('#accName').text(response.data.pageProps.data.name);
          var rankObj = response.data.pageProps.data.league_stats;
          rankObj.forEach(obj => {
            if (obj.queue_info.game_type == "SOLORANKED"){
              $('#tier').text(obj.tier_info.tier + ' ' + obj.tier_info.division);
              $('#lp').text(obj.tier_info.lp);
              $('#win').text(obj.win);
              $('#lose').text(obj.lose);
              $('#percentage').text((Math.round(obj.win/(obj.win+obj.lose)*10000)/100) +' %');
            }
          });
          var gameObj = response.data.pageProps.games.data;
          var htmlString;
		  var count = 0;
          gameObj.every(obj => {
            if (count>=9){
              return false;
		    }
            var time = new Date(obj.created_at);
            var result = obj.myData.stats.result;
            var k = obj.myData.stats.kill;
            var d = obj.myData.stats.death;
            var a = obj.myData.stats.assist;
            var championId = obj.myData.champion_id;
		    var championById = response.data.pageProps.data.championsById;
		  
            htmlString += "<tr><td>" + obj.myData.stats.result.substring(0,1) + "</td><td>" + getDateTimeString(time) + "</td><td>" + championById[championId].name + "</td><td>" + k + "/" + d + "/" + a + "</td><td>" + getKDA(k,d,a) + "</td></tr>";
		  
		    count++;
		    return true;
	      });
	      $('#recentStats').html(htmlString);
  	    }
	  });
	}
  });
});

function getDateTimeString(dt){
	return dt.getFullYear()+"-"+("0"+(dt.getMonth()+1)).slice(-2)+"-"+("0"+dt.getDate()).slice(-2)+" "+("0"+dt.getHours()).slice(-2)+":"+("0"+dt.getMinutes()).slice(-2)+":"+("0"+dt.getSeconds()).slice(-2);
}

function getKDA(k,d,a){
	if (d == 0)
		return "KDA: <i class=\"fa-solid fa-infinity\"></i>";
	else
		return "KDA: " + Math.round((k+a)/d*100)/100;
}