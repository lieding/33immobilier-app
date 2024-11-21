<template>
  <div class="wrapper">
    <el-tabs v-model="activeTab" type="border-card">
      <el-tab-pane :label="$t('message.COMPONENT_TREND_CHART.REGION')" :name="Tab.REGION">
        <div id="region-trend-chart" class="chart-wrapper"></div>
      </el-tab-pane>
      <el-tab-pane :label="$t('message.COMPONENT_TREND_CHART.REGION_PER_METER')" :name="Tab.REGION_PER_METER">
        <div id="region-per-meter-trend-chart" class="chart-wrapper"></div>
      </el-tab-pane>
      <el-tab-pane :label="$t('message.COMPONENT_TREND_CHART.PARIS_PER_METER')" :name="Tab.PARIS_PER_METER">
        <div id="paris-per-meter-trend-chart" class="chart-wrapper"></div>
      </el-tab-pane>
      <el-tab-pane :label="$t('message.COMPONENT_TREND_CHART.LATEST_CITIES')" :name="Tab.LATEST_CITIES">
        <el-radio-group v-model="selectedlatestCitiesType" style="margin-bottom: 30px;">
          <el-radio-button :label="LatestRadioOption.RADIO_LATEST_PARIS">{{ $t("message.COMPONENT_TREND_CHART.RADIO_LATEST_PARIS") }}</el-radio-button>
          <el-radio-button :label="LatestRadioOption.RADIO_LATEST_NEAREST_CITIES">{{ $t("message.COMPONENT_TREND_CHART.RADIO_LATEST_NEAREST_CITIES") }}</el-radio-button>
          <el-radio-button :label="LatestRadioOption.RADIO_LATEST_LARGEST_CITIES">{{ $t("message.COMPONENT_TREND_CHART.RADIO_LATEST_LARGEST_CITIES") }}</el-radio-button>
        </el-radio-group>
        <div :id="LatestCitiesAppartmentVillaChartId" class="chart-wrapper"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { parseRawCsv, parseLatestCitiesCsv } from '../../utils/csv';

const LatestRadioOption = {
  RADIO_LATEST_PARIS: 'RADIO_LATEST_PARIS',
  RADIO_LATEST_NEAREST_CITIES: 'RADIO_LATEST_NEAREST_CITIES',
  RADIO_LATEST_LARGEST_CITIES: 'RADIO_LATEST_LARGEST_CITIES'
};

const Tab = {
  REGION: 'REGION',
  REGION_PER_METER: 'REGION_PER_METER',
  PARIS_PER_METER: 'PARIS_PER_METER',
  LATEST_CITIES: 'LATEST_CITIES',
}

const LatestCitiesPopulationVenteChartId = 'latest-cities-population-vente-chart';
const LatestCitiesAppartmentVillaChartId = 'latest-cities-appartment-villa-chart';


export default {
  data () {
    return {
      activeTab: Tab.REGION,
      selectedlatestCitiesType: LatestRadioOption.RADIO_LATEST_PARIS,
      latestCitiesSourceData: null,
      regionTrendPerMeter: null,
      parisTrendPerMeter: null,
    };
  },
  created () {
    this.LatestCitiesAppartmentVillaChartId = LatestCitiesAppartmentVillaChartId;
    this.LatestCitiesPopulationVenteChartId = LatestCitiesPopulationVenteChartId;
    this.LatestRadioOption = LatestRadioOption;
    this.Tab = Tab;
  },
  mounted () {
    if (process.client) this.loadDate();
  },
  watch: {
    activeTab (tab) {
      this.$nextTick(() => {
        if (tab === Tab.REGION_PER_METER && !this.__region_per_meter_chart) {
          if (this.regionTrendPerMeter)
            this.__region_per_meter_chart = drawGeneralTrendChart('region-per-meter-trend-chart', this.regionTrendPerMeter);
        }
        if (tab === Tab.PARIS_PER_METER && !this.__paris_per_meter_chart) {
          if (this.parisTrendPerMeter)
            this.__paris_per_meter_chart = drawGeneralTrendChart('paris-per-meter-trend-chart', this.parisTrendPerMeter);
        }
        if (tab === Tab.LATEST_CITIES && !this.__latest_cities_chart) {
          if (this.latestCitiesSourceData)
            this.__latest_cities_chart = drawLatestCitiesChart.call(this, LatestCitiesAppartmentVillaChartId,
              this.latestCitiesSourceData?.DISTRICTS_IN_PARIS);
        }
      });
    },
    selectedlatestCitiesType (type) {
      if (this.latestCitiesSourceData) {
        let rows;
        if (type === LatestRadioOption.RADIO_LATEST_PARIS)
          rows = this.latestCitiesSourceData.DISTRICTS_IN_PARIS;
        else if (type === LatestRadioOption.RADIO_LATEST_NEAREST_CITIES)
          rows = this.latestCitiesSourceData.NEAREST_MUNICIPALITES;
        else if (type === LatestRadioOption.RADIO_LATEST_LARGEST_CITIES)
          rows = this.latestCitiesSourceData.LARGEST_CITIES;
        updateLatestCitiesChart(this.__latest_cities_chart, rows)
      }
    }
  },
  methods: {
    loadDate () {
      fetch('https://raw.githubusercontent.com/mingzemicco/33immo-config/refs/heads/main/region-trend.csv')
        .then(res => res.text())
        .then(txt => parseRawCsv(txt, ','))
        .then(parsed => drawGeneralTrendChart('region-trend-chart', parsed))
        .catch(console.error);
      fetch('https://raw.githubusercontent.com/mingzemicco/33immo-config/refs/heads/main/latest-cities.csv')
        .then(res => res.text())
        .then(txt => parseLatestCitiesCsv(txt, ','))
        .then(parsed => {
          this.latestCitiesSourceData = parsed;
          // this.__latestCitiesChart = drawLatestCitiesChart.call(this, LatestCitiesAppartmentVillaChartId, parsed.DISTRICTS_IN_PARIS);
        })
        .catch(console.error);
      fetch('https://raw.githubusercontent.com/mingzemicco/33immo-config/refs/heads/main/region-trend-per-meter.csv')
        .then(res => res.text())
        .then(txt => parseRawCsv(txt, ','))
        .then(parsed =>
          this.regionTrendPerMeter = parsed
          // drawGeneralTrendChart('region-per-meter-trend-chart', parsed)
        )
        .catch(console.error);
      fetch('https://raw.githubusercontent.com/mingzemicco/33immo-config/refs/heads/main/paris-trend-per-meter.csv')
        .then(res => res.text())
        .then(txt => parseRawCsv(txt, ','))
        .then(parsed => {
          this.parisTrendPerMeter = parsed;
          // drawGeneralTrendChart('paris-per-meter-trend-chart', parsed)
        })
        .catch(console.error);
    }
  }
}

function updateLatestCitiesChart (chart, rows) {
  if (!Array.isArray(rows) || !chart?.options) return;
  const appartmentPoints = [], villaPoints = [];
  for (let i = 0;i < rows.length;i++) {
    const row = rows[i];
    const label = row.commune;
    appartmentPoints.push({ x: i + 1, y: row.appartement, label });
    villaPoints.push({ x: i + 1, y: row.maison, label });
  }
  if (chart.options.data[0])
    chart.options.data[0].dataPoints = appartmentPoints;
  if (chart.options.data[1])
  chart.options.data[1].dataPoints = villaPoints;
  chart.render();
}

function drawLatestCitiesChart (appartmentVillaWrapperId, rows) {
  if (!document.getElementById(appartmentVillaWrapperId)) return;
  if (!Array.isArray(rows)) return;
  const appartmentPoints = [], villaPoints = [];
  for (let i = 0;i < rows.length;i++) {
    const row = rows[i];
    const label = row.commune;
    appartmentPoints.push({ x: i + 1, y: row.appartement, label });
    villaPoints.push({ x: i + 1, y: row.maison, label });
  }
  const chart = new CanvasJS.Chart(appartmentVillaWrapperId, {
    axisX: { labelFontSize: 8 },
    data: [
      {
        type: 'column', dataPoints: appartmentPoints, showInLegend: true,
        legendText: this.$t('message.COMPONENT_TREND_CHART.LATEST_CITIES_CHART_APPARTMENT')
      },
      {
        type: 'column', dataPoints: villaPoints, showInLegend: true,
        legendText: this.$t('message.COMPONENT_TREND_CHART.LATEST_CITIES_CHART_VILLA')
      },
    ]
  });
  chart.render();
  return chart;
}

function parseTrimestreStr (str) {
  if (typeof str === 'string') {
    if (str.startsWith('T')) {
      const trimestreIdx = Number(str[1]);
      const year = Number(str.substring(2));
      return new Date(year, trimestreIdx * 3, 1);
    }
    return '';
  }
  return '';
}

function drawGeneralTrendChart (wrapperId, sourceData) {
  let { header, rows } = sourceData;
  if (!Array.isArray(rows)) return;
  rows = rows.reverse();
  if (!document.getElementById(wrapperId)) return;
  const [trimestreKey, ...regionKeys] = header;
  const data = [];
  for (const regionKey of regionKeys) {
    const dataPoints = [];
    for (const row of rows) {
      dataPoints.push({ x: parseTrimestreStr(row[trimestreKey]), y: row[regionKey] });
    }
    data.push({ dataPoints, type: 'line', showInLegend: true, legendText: regionKey });
  }

  const chart = new CanvasJS.Chart(wrapperId, {
    data,
    axisX: {
      //valueFormatString: "yy/mm",
      minimum: parseTrimestreStr(rows[0][trimestreKey]),
    },
  });
  chart.render();
  return chart;
}
</script>

<style lang="css" scoped>
.wrapper {
  height: max-content;
  padding: 8px 12px;
  box-sizing: border-box;
}
.chart-wrapper {
  width: 100%;
  height: max-content;
  min-height: 400px;
}
.latest-cities-charts {
  display: flex;
  justify-content: space-between;
}
</style>
