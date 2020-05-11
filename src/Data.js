import moment from "moment";
import ru from "apexcharts/dist/locales/ru.json"

export const newGarageData = {
  'DME': {
    'width': 300,
    'height': 80,
    'blocks': [{
      'x': 0,
      'y': 0,
      'dates': ['2020-11-18', '2020-12-13'],
      'h': 73.3,
      'w': 69.1,
      'fly': 'Ан-124',
      'color': '#ffa700'
    }, {
      'x': 70.1,
      'y': 0,
      'dates': ['2020-08-26', '2020-10-19'],
      'h': 60.105,
      'w': 63.939,
      'fly': 'Ил-96-400',
      'color': '#ff00d6'
    }, {
      'x': 135.039,
      'y': 0,
      'dates': ['2020-09-12', '2020-09-27'],
      'h': 57.66,
      'w': 55.345,
      'fly': 'Ил-96-300',
      'color': '#9a00ff'
    }, {
      'x': 191.384,
      'y': 0,
      'dates': ['2020-09-15', '2020-11-30'],
      'h': 37.55,
      'w': 47.9,
      'fly': 'Ту-154М',
      'color': '#c3ff00'
    }, {
      'x': 191.384,
      'y': 38.55,
      'dates': ['2020-09-03', '2020-09-28'],
      'h': 29.2,
      'w': 23.53,
      'fly': 'Ан-24',
      'color': '#00d8ff'
    }]
  },
  'SVO': {
    'width': 200,
    'height': 90,
    'blocks': [{
      'x': 0,
      'y': 0,
      'dates': ['2020-10-10', '2020-11-13'],
      'h': 73.3,
      'w': 69.1,
      'fly': 'Ан-124',
      'color': '#ffa700'
    }, {
      'x': 70.1,
      'y': 0,
      'dates': ['2020-10-01', '2020-11-27'],
      'h': 60.105,
      'w': 63.939,
      'fly': 'Ил-96-400',
      'color': '#ff00d6'
    }, {
      'x': 135.039,
      'y': 0,
      'dates': ['2020-09-08', '2020-10-15'],
      'h': 55.345,
      'w': 57.66,
      'fly': 'Ил-96-300',
      'color': '#9a00ff'
    }, {
      'x': 135.039,
      'y': 56.345,
      'dates': ['2020-10-26', '2020-11-27'],
      'h': 29.2,
      'w': 23.53,
      'fly': 'Ан-24',
      'color': '#00d8ff'
    }]
  },
  'VKO': {
    'width': 150,
    'height': 70,
    'blocks': [{
      'x': 0,
      'y': 0,
      'dates': ['2020-08-31', '2020-11-09'],
      'h': 60.105,
      'w': 63.939,
      'fly': 'Ил-96-400',
      'color': '#ff00d6'
    }, {
      'x': 64.939,
      'y': 0,
      'dates': ['2020-10-04', '2020-10-13'],
      'h': 57.66,
      'w': 55.345,
      'fly': 'Ил-96-300',
      'color': '#9a00ff'
    }]
  },
}

function getPlanes() {
  let planes = {}
  let airNames = ["DME", "SVO", "VKO"]

  // eslint-disable-next-line array-callback-return
  airNames.map((air) => {
    // eslint-disable-next-line array-callback-return
    newGarageData[air]['blocks'].map((obj) => {
      if (!(planes.hasOwnProperty(obj['fly']))) planes[obj['fly']] = []
      planes[obj['fly']].push({
        x: air,
        y: [
          new Date(obj['dates'][0]).getTime(),
          new Date(obj['dates'][1]).getTime()
        ],
        fillColor: obj['color'],
        strokeColor: obj['color'],
      })
    })
  })

  return planes
}

export function createTimelineData() {
  let planes = getPlanes()
  let result = []
  // eslint-disable-next-line array-callback-return
  Object.keys(planes).map((name) => {
    result.push({name, data: planes[name]})
  })

  return result
}

export function createOptions() {
  let planes = getPlanes();
  let colors = []

  // eslint-disable-next-line array-callback-return
  Object.keys(planes).map((name) => {
    colors.push(planes[name][0]['fillColor'])
  })

  planes = Object.keys(planes)
  return {
    colors,
    dataLabels: {
      enabled: true,
      formatter: function (val, ops) {
        let a = moment(val[0])
        let b = moment(val[1])
        let diff = b.diff(a, 'days')

        let name = (diff >= 15) ? planes[ops.seriesIndex] + ' : ' : ''
        if (diff.toString()[diff.toString().length - 1] === "1") {
          return name + diff + ' день'
        } else if ("234".indexOf(diff.toString()[diff.toString().length - 1]) !== -1) {
          return name + diff + ' дня'
        } else {
          return name + diff + ' дней';
        }
      }
    },
    chart: {
      locales: [ru],
      defaultLocale: 'ru',
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '80%',
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: function (value) {
          return moment(value).format("DD.MM.YYYY")
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          fontSize: '16px',
        }
      }
    },
    stroke: {
      width: 1
    },
    fill: {
      type: 'solid',
      opacity: 0.6
    },
    legend: {
      itemMargin: {
        horizontal: 25,
        vertical: 0
      },
      position: 'top',
      onItemClick: {
        toggleDataSeries: false
      },
    }
  }
}