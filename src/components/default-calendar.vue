<template>
  <div class="index">
    <calendar-header
      :headOptions="headOptions"
      @handlePrevMonth = 'handlePrevMonth'
      @handleNextMonth = 'handleNextMonth'
      @handleToday = 'handleToday'
    ></calendar-header>
    <ul class="calendar-week clear">
      <li v-for="(item, index) in englishWeekArray" :key="index" class="week-item">{{item}}</li>
    </ul>
    <ul class="calendar-view clear">
      <li v-for="(item, index) in calendarList" :key="index"
        class="date-view"
        :class="[
        {'not-current-month': !isCurrentMonth(item.date)},
        {'today-background': isCurrentDay(item.date)},
        {'day-selected': item.clickDay}]"
        @click="handleClickDay(item)"
      >
        <span class="date-day" :style="dayStyle" :class="[{'opacity-class': !isCurrentMonth(item.date)}]">{{item.day}}</span>
        <!-- TODO 放置待办事宜 -->
        <span class="calendar-note">{{item.note}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import '@/assets/css/reset.min.css'
import calendarHeader from './canlendar-head.vue'
import * as utils from '@/assets/js/utils.js'

export default {
  name: 'vue-calendar',
  componentName: 'vue-calendar',
  props: {
    options: Object
  },
  components: { calendarHeader },
  data () {
    const { year, month, day } = utils.getNewDate(new Date())
    return {
      headOptions: {
        type: this.options.type,
        style: this.options.headStyle,
        date: ''
      },
      englishWeekArray: [
        'MON',
        'TUE',
        'WED',
        'THU',
        'FRI',
        'SAT',
        'SUN '
      ],
      /* 当前时间 */
      defaultTime: { year, month, day },
      /* 日期数组 */
      calendarList: []
    }
  },
  computed: {
    dayStyle: function () {
      return {
        textAlign: this.options.viewStyle.day
      }
    }
  },
  watch: {
    defaultTime: {
      handler: function (val, oldVal) {
        this.calendarList = this.getCalendarArray()
      }
    }
  },
  methods: {
    /* 获取日历当前月的日期数组 */
    getCalendarArray () {
      const { year, month } = utils.getNewDate(utils.getDate(this.defaultTime.year, this.defaultTime.month))
      const currentFirstDay = utils.getDate(year, month)
      // 获取当前月第一天星期几
      const weekDay = currentFirstDay.getDay()
      const startTime = currentFirstDay - (weekDay - 1) * 24 * 60 * 60 * 1000
      console.log(currentFirstDay, weekDay, startTime)
      /* 兼容35个/42个格子 */
      let monthDayNum = 35
      if (weekDay === 5 || weekDay === 6) {
        monthDayNum = 42
      }
      const calendarArray = []
      for (let i = 0; i < monthDayNum; i++) {
        calendarArray.push({
          date: new Date(startTime + i * 24 * 60 * 60 * 1000),
          year: year,
          month: month + 1,
          day: new Date(startTime + i * 24 * 60 * 60 * 1000).getDate(),
          clickDay: false
        })
      }
      this.headOptions.date = `${utils.englishMonth(month)} ${year}`
      return calendarArray
    },
    // 是否是当前月
    isCurrentMonth (date) {
      const { year: currentYear, month: currentMonth } = utils.getNewDate(utils.getDate(this.defaultTime.year, this.defaultTime.month))
      const { year, month } = utils.getNewDate(date)
      return currentYear === year && currentMonth === month
    },
    // 是否是今天
    isCurrentDay (date) {
      const { year: currentYear, month: currentMonth, day: currentDay } = utils.getNewDate(new Date())
      const { year, month, day } = utils.getNewDate(date)
      return currentYear === year && currentMonth === month && currentDay === day
    },
    // 跳转上一个月
    handlePrevMonth () {
      const prevMonth = utils.getDate(this.defaultTime.year, this.defaultTime.month)
      prevMonth.setMonth(prevMonth.getMonth() - 1)
      this.defaultTime = utils.getNewDate(prevMonth)
      this.headOptions.date = `${utils.englishMonth(this.defaultTime.month)} ${this.defaultTime.year}`
      this.$emit('handlePrevMonth')
    },
    // 跳转下一个月
    handleNextMonth () {
      const nextMonth = utils.getDate(this.defaultTime.year, this.defaultTime.month)
      nextMonth.setMonth(nextMonth.getMonth() + 1)
      this.defaultTime = utils.getNewDate(nextMonth)
      this.headOptions.date = `${utils.englishMonth(this.defaultTime.month)} ${this.defaultTime.year}`
      this.$emit('handleNextMonth')
    },
    // 点击回到今天
    handleToday () {
      this.defaultTime = utils.getNewDate(new Date())
      this.$emit('handleToday')
    },
    // 点击某一天
    handleClickDay (item) {
      if (item.clickDay) {
        this.$set(item, 'clickDay', false)
      } else {
        this.calendarList.forEach(item => { item.clickDay = false })
        this.$set(item, 'clickDay', true)
      }
      this.$emit('handleClickDay', item)
    }
  },
  created () {
    this.calendarList = this.getCalendarArray()
    this.calendarType = this.options.calendarType
  }
}
</script>

<style lang="less">
.index {
  padding: 23px 30px 30px;
  width: 100%;
  height: 100%;
  background: #F9FAFC;
  box-sizing: border-box;
  .calendar-week {
    width: 100%;
    height: 46px;
    line-height: 46px;
    border: 1px solid #E4E7EA;
    border-right: none;
    .week-item {
      float: left;
      width: 14.285%;
      text-align: center;
      font-size: 14px;
      color: #424953;
      border-right: 1px solid #E4E7EA;
      font-weight: 600;
    }
  }
  .calendar-view {
    width: 100%;
    border-left: 1px solid #E4E7EA;
    .date-view {
      float: left;
      width: 14.285%;
      height: 120px;
      border-right: 1px solid #E4E7EA;
      border-bottom: 1px solid #E4E7EA;
      cursor: pointer;
      .date-day {
        padding: 8px 8px 0;
        display: block;
        width: 100%;
        font-size: 14px;
        color: #7F8794;
      }
      .calendar-note {
        margin-top: 6px;
        display: block;
        width: 100%;
        text-align: center;
        font-size: 30px;
        color: #424953;
      }
    }
    .opacity-class {
      opacity: .5;
    }
    .not-current-month {
      background-image: linear-gradient(45deg,rgba(000, 000, 000, .03) 25%,transparent 25%,transparent 50%,rgba(000, 000, 000, .03) 50%,rgba(000, 000, 000, .03) 75%,transparent 75%,transparent);
      background-size: 20px 20px;
    }
    .today-background {
      background: #FFFDEF;
    }
    .day-selected {
      background: #027AFF;
      .date-day {
        color: #BCCFFF;
      }
      .calendar-note {
        color: #fff;
      }
    }
  }
}
</style>
