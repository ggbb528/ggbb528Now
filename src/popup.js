'use strict';

import moment from 'moment';
import momentTZ from 'moment-timezone';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import './popup.css';

const CONFIG = {
  OPGG_LINK: 'https://www.op.gg/summoners/kr/%EC%A4%80%20%EB%B0%9B',
  OPGG_INGAME_LINK:
    'https://www.op.gg/api/spectates/8YQfn73hCIePhQZxcdzhtJFl3HBLPFGD6RM-QVvUMheuw1M?region=kr&hl=zh_TW',
  OPGG_RANK_ELO_TREND_LINK:
    'https://www.op.gg/api/summoners/kr/8YQfn73hCIePhQZxcdzhtJFl3HBLPFGD6RM-QVvUMheuw1M/lp-histories?type=DAY',
};

//

$(function () {
  $('body').on('click', 'a', function () {
    chrome.tabs.create({ url: $(this).attr('href') });
    return false;
  });

  getRankInfo();

  getRankEloTrendByDay();

  getCurTeamStat();

  getVodList();
});

function getRankInfo() {
  // Set opgg link
  const { OPGG_LINK } = CONFIG;
  $('#opggLink').attr('href', OPGG_LINK);

  // Get account info from OPGG_LINK
  const [server, account] = OPGG_LINK.split(/\/summoners\//)[1].split('/', 2);

  // Get data from opgg
  axios.get(OPGG_LINK).then(function (r) {
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

            const rankObj = pageProps.data.league_stats;
            const boObj = new Object();
            rankObj.forEach((obj) => {
              if (obj.queue_info.game_type === 'SOLORANKED') {
                boObj.isBo = obj.series !== null;
                if (boObj.isBo) {
                  boObj.target = obj.series.target;
                  boObj.win = obj.series.win;
                  boObj.lose = obj.series.lose;
                  boObj.boArr = new Array();
                }

                $('#tier').html(
                  `<span class="text-primary font-weight-bold">${getTierString(
                    obj.tier_info.tier.toUpperCase(),
                    obj.tier_info.division
                  )}</span>`
                );
                $('#lp').text(obj.tier_info.lp);
                $('#win').text(obj.win);
                $('#lose').text(obj.lose);
                $('#percentage').text(getWinLosePercentage(obj.win, obj.lose));
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
              const isRemake = obj.is_remake;
              if (
                boObj.isBo &&
                !isRemake &&
                obj.queue_info.game_type === 'SOLORANKED' &&
                obj.myData.tier_info.lp === 100
              ) {
                if (result === 'W' && boObj.win > 0) {
                  boObj.boArr.splice(0, 0, '<i class="fa-solid fa-check"></i>');
                  boObj.win--;
                } else if (result === 'L' && boObj.lose > 0) {
                  boObj.boArr.splice(0, 0, '<i class="fa-solid fa-xmark"></i>');
                  boObj.lose--;
                }
              }

              htmlString +=
                (isRemake
                  ? '<tr class="table-light"><td><span class="badge rounded-pill bg-secondary">R'
                  : (result === 'W'
                      ? '<tr class="table-primary">'
                      : '<tr class="table-danger">') +
                    '<td>' +
                    (result === 'W'
                      ? '<span class="badge rounded-pill bg-primary">'
                      : '<span class="badge rounded-pill bg-danger">') +
                    result) +
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
            if (boObj.isBo) {
              var boHtml = '';
              var boNumber = 0;
              boObj.boArr.forEach((obj) => {
                boHtml += obj;
              });
              if (boObj.target === 3) {
                //BO5
                boNumber = 5;
              } else if (boObj.target === 2) {
                //BO3
                boNumber = 3;
              }
              if (boNumber > boObj.boArr.length) {
                for (let i = 1; i <= boNumber - boObj.boArr.length; i++) {
                  boHtml += '<i class="fa-solid fa-question"></i>';
                }
              }
              $('#bo').html(boHtml);
            }
          }
        });
    }
  });
}

function getRankEloTrendByDay() {
  const { OPGG_RANK_ELO_TREND_LINK } = CONFIG;
  axios.get(OPGG_RANK_ELO_TREND_LINK).then(function (response) {
    if (response.status == 200) {
      var eloObj = response.data.data;
      var count = 0;
      var dataArr = new Array();
      eloObj
        .slice()
        .reverse()
        .every((obj) => {
          if (count >= 7) {
            return false;
          }
          var dataObj = new Object();
          dataObj.elo = obj.elo_point;
          dataObj.date = momentTZ(new Date(obj.created_at))
            .tz('Asia/Seoul')
            .format('MM/DD');
          dataObj.date2 = momentTZ(new Date(obj.created_at))
            .tz('Asia/Seoul')
            .format('YYYY-MM-DD');
          dataObj.tier = `${getTierString(
            obj.tier_info.tier,
            obj.tier_info.division
          )} ${obj.tier_info.lp}LP`;
          dataArr.splice(0, 0, dataObj);
          count++;
          return true;
        });

      const ctx = $('#lolChart');
      const lolChart = new Chart(ctx, {
        type: 'line',
        data: {
          datasets: [
            {
              label: 'Rank ELO Trend',
              data: dataArr,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        },
        options: {
          parsing: {
            xAxisKey: 'date',
            yAxisKey: 'elo',
          },
          plugins: {
            tooltip: {
              callbacks: {
                title: function (contextA) {
                  return contextA[0].raw.date2;
                },
                label: function (context) {
                  return context.raw.tier;
                },
              },
            },
          },
        },
      });
    }
  });
}

function getCurTeamStat() {
  // get current team stat from opgg
  const { OPGG_INGAME_LINK } = CONFIG;
  axios.get(OPGG_INGAME_LINK).then(function (response) {
    if (response.status == 200) {
      const startTime = response.data.data.created_at;
      $('#curStartTime').html(
        `<span>${moment(startTime).format('YYYY-MM-DD HH:mm:ss')}</span>`
      );
      var participantArray = response.data.data.participants;
      participantArray.forEach((obj) => {
        var rowId = `#${obj.team_key.toLowerCase()}-${obj.position.toLowerCase()}`;
        var bgColor =
          obj.team_key.toUpperCase() === 'BLUE' ? 'bg-primary' : 'bg-danger';
        var championId = obj.champion_id;
        var championById = response.data.data.championsById;
        var rankTier = 'N/A';
        var win = 0;
        var lose = 0;
        var winRate = 0;
        var statObj = obj.summoner.league_stats;
        var isGGBB528 =
          obj.summoner.summoner_id ===
          OPGG_INGAME_LINK.split('/')[5].split('?')[0]
            ? true
            : false;

        statObj.forEach((o) => {
          if (
            o.queue_info.game_type === response.data.data.queue_info.game_type
          ) {
            rankTier = getTierString(
              o.tier_info.tier.toUpperCase(),
              o.tier_info.division
            );
            win = o.win;
            lose = o.lose;
            winRate = getWinLosePercentage(win, lose);
          }
        });

        const htmlString =
          `<td style="width:20%"><span class="badge rounded-pill ${bgColor}">${positionMap(
            obj.position.toUpperCase()
          )}</span></td>` +
          `<td style="width:25%;font-weight: bold">${championById[championId].name}</td>` +
          `<td style="width:30%">${rankTier}</td>` +
          `<td style="width:25%">勝率: ${winRate}</td>`;
        $(rowId).html(htmlString);
        if (isGGBB528) {
          const color =
            obj.team_key.toUpperCase() === 'BLUE'
              ? 'table-primary'
              : 'table-danger';
          $(rowId).addClass(color);
        }
      });
    }
  });
}

function getTierString(tier, division) {
  var tierString = null;

  switch (tier.toUpperCase()) {
    case 'CHALLENGER':
    case 'GRANDMASTER':
    case 'MASTER':
      tierString = tier;
      break;
    default:
      tierString = tier + ' ' + division;
  }

  return tierString;
}

function positionMap(p) {
  var returnString = null;
  switch (p.toUpperCase()) {
    case 'TOP':
      returnString = p;
      break;
    case 'JUNGLE':
      returnString = 'JG';
      break;
    case 'MID':
      returnString = 'MID';
      break;
    case 'ADC':
      returnString = 'ADC';
      break;
    case 'SUPPORT':
      returnString = 'SUP';
      break;
  }
  return returnString;
}

function getWinLosePercentage(win, lose) {
  if (win === null || lose === null || win === 0 || lose === 0) return 'N/A';
  else return Math.round((win / (win + lose)) * 10000) / 100 + ' %';
}

function getKDA(k, d, a) {
  if (d == 0) return 'KDA: <i class="fa-solid fa-infinity"></i>';
  else return 'KDA: ' + Math.round(((k + a) / d) * 100) / 100;
}

function getVodList() {
  chrome.storage.local.get('vodList', (data) => {
    const { vodList } = data;
    let vodListHtml = '';
    if (Array.isArray(vodList)) {
      vodList.forEach((vod) => {
        console.log('vod', vod);
        vodListHtml += getVodHtmlTemplate(vod);
      });
    }

    $('#vodList').html(vodListHtml);
  });
}

function getVodHtmlTemplate(vod) {
  const published_at = moment(vod.published_at).format('YYYY-MM-DD HH:mm:ss');
  const thumbnail_url = vod.thumbnail_url;
  const title = vod.title;
  const url = vod.url;
  const view_count = vod.view_count;
  const thumbnailLink = `${thumbnail_url}`
    .replace('%{width}', '320')
    .replace('%{height}', '180');

  return `
  <div class="vod-container">
    <a href="${url}" title="${title}">
      <img
      src="${thumbnailLink}"
      alt="${title}"
      class="w-100"
      />
    </a>
    <div class="m-1 row vod-description">
      <div class="col-1 d-flex align-items-center px-2">
        <i
          class="fa-brands fa-twitch fs-4"
          style="color: #6441a5"
        ></i>
      </div>
      <div class="col-11">
        <div class="text-truncate text-start">
          <span class="vod-title">
            <a href="${url}" title="${title}">${title}</a>
          </span>
        </div>
        <div class="text-start row">
          <span class="col-4 small">觀看次數: ${view_count}</span>
          <span class="col-8 small">${published_at}</span>
        </div>
      </div>
    </div>
  </div>
  `;
}
