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
  
  const axios = require('axios');
  axios.get('https://www.op.gg/_next/data/tZb-ajfpecV8czXbe_zCj/summoners/kr/%EC%A4%80%20%EB%B0%9B.json?region=kr&summoner=%EC%A4%80+%EB%B0%9B').then(function (response){
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
  	}
  });
});

