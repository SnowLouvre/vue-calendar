<template>
  <default-calendar
    :options="calendarArr"
    class="calendar"
    @handleClickDay="handleClickDay"
    @handlePrevMonth="handlePrevMonth"
    @handleNextMonth="handleNextMonth"
  ></default-calendar>
</template>

<script>
import defaultCalendar from '@/components/default-calendar'
export default {
  name: 'vue-calendar',
  data () {
    return {
      calendarArr: {
        type: 'combination',
        headStyle: {
          todayBtn: 'right',
          combination: 'center',
          checkBtn: 'right'
        },
        /* 左中右 */
        viewStyle: {
          day: 'right'
        },
        calendarData: []
      }
    }
  },
  components: {
    defaultCalendar
  },
  methods: {
    handleClickDay () {
    },
    handlePrevMonth () {
    },
    handleNextMonth () {
    }
  }
}
</script>
<style>

</style>
