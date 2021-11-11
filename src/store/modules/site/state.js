/* ============
 * State of the auth module
 * ============
 *
 * The initial state of the auth module.
 */

export default {
  iot: {
    waterLevel: {
      status: true,
      label: [],
      dataSets: [],
      current: {
        level: 0,
        time: 0
      },
      message: "No water level found on site"
    },
    electricity: false,
    sensor: {
      totalSensor: 0,
      active: 0,
      deactivate: 0,
      status: true,
      message: "No sensor found on site"
    },
    todayUsage: {
      status: true,
      message: "No sensor found on site",
      currentDay: 0,
      weekUsage: 0,
      dataset: [],
      label: []
    },
    feedBack: {
      data: [],
      feedbackWeekly: {
        clean: 0,
        dirty: 0
      },
      feedbackToday: {
        clean: 0,
        dirty: 0
      },
      status: true,
      message: "No feedback site data is found"
    }
  },
  info: {
    sections: []
  },
  summary: {
    user_feedback: {
      this_week: {
        bad: 50,
        good: 560,
        ok: 1
      },
      today: {
        bad: 256,
        good: 5,
        ok: 78
      }
    },
    usage: {
      current_day: 0,
      current_week: 0
    },
    water: {
      value: 0
    },
    electricity: {
      status: true
    },
    rating: {
      avg_30days: 5,
      current: 0,
      thirty_days: 0
    }
  },
  isSiteInfo: false
};
