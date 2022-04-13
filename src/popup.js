'use strict';

import moment from 'moment';
import axios from 'axios';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import './popup.css';

const CONFIG = {
  OPGG_LINK: 'https://www.op.gg/summoners/kr/%EC%A4%80%20%EB%B0%9B',
};

$(function () {
  $('body').on('click', 'a', function () {
    chrome.tabs.create({ url: $(this).attr('href') });
    return false;
  });

  // Set opgg link
  const { OPGG_LINK } = CONFIG;
  $('#opggLink').attr('href', OPGG_LINK);

  // Get account info from OPGG_LINK
  const [server, account] = OPGG_LINK.split(/\/summoners\//)[1].split('/', 2);

  // Get data from opgg
  axios.get(CONFIG.OPGG_LINK).then(function (r) {
    if (r.status == 200) {
      const htmlData = r.data;
      const buildId = htmlData.split('"buildId":"')[1].split('"')[0];
      axios
        .get(
          `https://www.op.gg/_next/data/${buildId}/summoners/${server}/${account}.json`
        )
        .then(function (response) {
          if (response.status == 200) {
            const pageProps = response.data.pageProps;
            const accountName = pageProps.data.name;
            $('#accName').html(
              `<span class="badge rounded-pill bg-warning mx-2">${server.toUpperCase()}</span>${accountName}`
            );

            const rankObj = response.data.pageProps.data.league_stats;
            rankObj.forEach((obj) => {
              if (obj.queue_info.game_type == 'SOLORANKED') {
                $('#tier').html(
                  `<span class="text-primary font-weight-bold">${obj.tier_info.tier} ${obj.tier_info.division}</span>`
                );
                $('#lp').text(obj.tier_info.lp);
                $('#win').text(obj.win);
                $('#lose').text(obj.lose);
                $('#percentage').text(
                  Math.round((obj.win / (obj.win + obj.lose)) * 10000) / 100 +
                    ' %'
                );
              }
            });
            const gameObj = response.data.pageProps.games.data;
            let htmlString;
            let count = 0;
            gameObj.every((obj) => {
              if (count >= 10) {
                return false;
              }
              const time = new Date(obj.created_at);
              const result = obj.myData.stats.result.substring(0, 1);
              const k = obj.myData.stats.kill;
              const d = obj.myData.stats.death;
              const a = obj.myData.stats.assist;
              const championId = obj.myData.champion_id;
              const championById = response.data.pageProps.data.championsById;

              htmlString +=
                (result === 'W'
                  ? '<tr class="table-primary">'
                  : '<tr class="table-danger">') +
                '<td>' +
                (result === 'W'
                  ? '<span class="badge rounded-pill bg-primary">'
                  : '<span class="badge rounded-pill bg-danger">') +
                result +
                '</span>' +
                '</td><td>' +
                moment(time).format('YYYY-MM-DD HH:mm:ss') +
                '</td><td>' +
                championById[championId].name +
                '</td><td>' +
                k +
                '/' +
                d +
                '/' +
                a +
                '</td><td class="text-start">' +
                getKDA(k, d, a) +
                '</td></tr>';

              count++;
              return true;
            });
            $('#recentStats').html(htmlString);
          }
        });
    }
  });
});

function getKDA(k, d, a) {
  if (d == 0) return 'KDA: <i class="fa-solid fa-infinity"></i>';
  else return 'KDA: ' + Math.round(((k + a) / d) * 100) / 100;
}
