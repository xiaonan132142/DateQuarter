<template>
  <div style="display: inline-block">
    <span style="margin:0 10px 0 20px;">粒度</span>
    <el-select
      @change="changeSelect"
      style="width:100px;margin-right:10px;"
      v-model="selectTimeType"
      placeholder="请选择"
    >
      <el-option
        v-for="item in dateOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>

    <span style="margin-right: 10px;">时间</span>
    <div style="display: inline-block">
      <high-datepicker
        v-model="startTime"
        :clearable="false"
        :picker-options="{}"
        placeholder="选择日期"
        @change="changeStartTime($event, selectTimeType)"
        :type="selectTimeType"
      />
      -
      <high-datepicker
        v-model="endTime"
        :picker-options="{}"
        :clearable="false"
        placeholder="选择日期"
        @change="changeEndTime($event, selectTimeType)"
        :type="selectTimeType"
      />
    </div>
  </div>
</template>

<script>
import formatdate from '../../utils/formatdate'
import highDatepicker from './highDatepicker'
export default {
  name: 'dateComponent',
  components: {
    highDatepicker,
  },
  data() {
    return {
      selectTimeType: 'date',
      dateOptions: [
        {
          value: 'date',
          label: '日',
        },
        {
          value: 'week',
          label: '周',
        },
        {
          value: 'month',
          label: '月',
        },
        {
          value: 'quarter',
          label: '季',
        },
      ],
      startTime: '',
      endTime: '',
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.startTime = this.initDefaultMonth()[0]
      this.endTime = this.initDefaultMonth()[1]
      let childData = [this.selectTimeType, this.startTime, this.endTime].toString()
      this.$emit('changeDate', childData)
    },
    reset() {
      this.startTime = ''
      this.endTime = ''
    },
    changeSelect(val) {
      this.reset()
      if (val == 'date' || val == 'week') {
        this.startTime = this.initDefaultMonth()[0]
        this.endTime = this.initDefaultMonth()[1]
      } else if (val == 'month' || val == 'quarter') {
        this.startTime = this.initDefaultYear()[0]
        this.endTime = this.initDefaultYear()[1]
      }
      let childData = [this.selectTimeType, this.startTime, this.endTime].toString()
      this.$emit('changeDate', childData)
    },
    changeStartTime(e, val) {
      if (e !== null) {
        this.startTime = formatdate.formatDateWithoutTimes(e)
      } else {
        if (val == 'date' || val == 'week') {
          this.startTime = this.initDefaultMonth()[0]
        } else if (val == 'month' || val == 'quarter') {
          this.startTime = this.initDefaultYear()[0]
        }
      }
      let childData = [this.selectTimeType, this.startTime, this.endTime].toString()
      this.$emit('changeDate', childData)
    },
    changeEndTime(e, val) {
      if (e !== null) {
        this.endTime = formatdate.formatDateWithoutTimes(e)
      } else {
        if (val == 'date' || val == 'week') {
          this.endTime = this.initDefaultMonth()[1]
        } else if (val == 'month' || val == 'quarter') {
          this.endTime = this.initDefaultYear()[1]
        }
      }
      let childData = [this.selectTimeType, this.startTime, this.endTime].toString()
      this.$emit('changeDate', childData)
    },
    getWeekStartDate(now) {
      var nowDayOfWeek = now.getDay() //今天本周的第几天
      let nowDay = now.getDate()
      var nowMonth = now.getMonth()
      var nowYear = now.getFullYear()
      var weekStartDate = new Date(nowYear, nowMonth, parseInt(nowDay - (nowDayOfWeek-1)))
      return formatdate.formatDateWithoutTimes(weekStartDate)
    },
    //默认月
    initDefaultMonth() {
      let fromData = ''
      let toform = ''
      let now = new Date()
      now.setDate(1)
      fromData = formatdate.formatDateWithoutTimes(now)
      let currentMonth = now.getMonth()
      let nextMonth = ++currentMonth
      let nextMonthFirstDay = new Date(now.getFullYear(), nextMonth, 1)
      let oneDay = 1
      toform = formatdate.formatDateWithoutTimes(new Date(nextMonthFirstDay - oneDay))
      if (this.selectTimeType == 'week') {
        fromData = this.getWeekStartDate(now)
        toform = this.getWeekStartDate(new Date(nextMonthFirstDay - oneDay))
      }
      return [fromData, toform]
    },
    //默认年
    initDefaultYear() {
      let fromData = ''
      let toform = ''
      let now = new Date()
      let nowYear = now.getFullYear()
      now.setFullYear(nowYear)
      now.setMonth(0)
      now.setDate(1)
      fromData = formatdate.formatDateWithoutTimes(now)
      let endnow = new Date()
      endnow.setFullYear(nowYear)
      this.selectTimeType == 'quarter'?endnow.setMonth(9):endnow.setMonth(11)
      endnow.setDate(1)
      toform = formatdate.formatDateWithoutTimes(endnow)
      return [fromData, toform]
    },
  },
}
</script>

<style scoped></style>
