<template>
    <div class="date-group">
        <label>日期范围</label>
        <div v-show="!custom">
            <ul class="date-type-list">
                <li v-for="item in types" @click="changeCurrent(item.value)" :class="{'active': currentType==item.value}">
                    <span>{{ item.label }}</span>
                </li>
            </ul>
            <div class="date-item" v-show="currentType == 1">
                <el-date-picker v-model="value1" @change="changeDate" align="right" type="date" placeholder="选择日期" :picker-options="datePickerOptions">
                </el-date-picker>
            </div>
            <div class="date-item" v-show="currentType == 2">
                <el-date-picker v-model="week" type="week" @change="changeWeek" placeholder="选择周">
                </el-date-picker>
            </div>

            <div class="date-item" v-show="currentType == 3">
                <el-date-picker v-model="value1" clearable type="month" @change="changeMonth" placeholder="选择月">
                </el-date-picker>
            </div>
            <div class="date-item" v-show="currentType == 4">
                <el-date-picker v-model="value1" align="right" type="year" @change="changeYear" placeholder="选择年">
                </el-date-picker>
            </div>
        </div>
        <a class="custom-link" href="javascript:;" v-if="!custom" @click="switchCustomState(true)">自定义日期范围</a>
        <div v-if="custom">
            <div class="date-item">
                <el-date-picker v-model="$parent.filter.startDate" @change="changeStartDate" type="date" placeholder="选择开始日期" :picker-options="startDateOptions">
                </el-date-picker>
            </div>
            <div class="date-item">
                <el-date-picker v-model="$parent.filter.endDate" @change="changeEndDate" type="date" placeholder="选择结束日期" :picker-options="endDateOptions">
                </el-date-picker>
            </div>
        </div>
        <a class="custom-link" href="javascript:;" v-if="custom" @click="switchCustomState(false)">取消自定义日期</a>
    </div>
</template>

<script>
    import { formatDate, getWeekNumber, getFirstDayOfMonth, getDayCountOfMonth } from 'element-ui/packages/date-picker/src/util/index';
    import getWeekDaysByDay from '../../../common/function/getWeekDaysByDay';

    export default {
        props: {
            value: {},
            current: {
                // 1日  2周  3月  4年
                default: 1
            }
        },
        data() {
            var now = new Date();
            return {
                currentType: this.current,
                value1: this.value,
                week: '',
                // 是否自定义日期，默认不自定义
                custom: false,
                types: [
                    {
                        value: 1,
                        label: '日'
                    },
                    {
                        value: 2,
                        label: '周'
                    },
                    {
                        value: 3,
                        label: '月'
                    },
                    {
                        value: 4,
                        label: '年'
                    }
                ],
                datePickerOptions: {
                    shortcuts: [
                        {
                            text: '今天',
                            onClick(picker) {
                                picker.$emit('pick', new Date());
                            }
                        },
                        {
                            text: '昨天',
                            onClick(picker) {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24);
                                picker.$emit('pick', date);
                            }
                        },
                        {
                            text: '一周前',
                            onClick(picker) {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                                picker.$emit('pick', date);
                            }
                        }
                    ]
                },
                startDateOptions: {
                    disabledDate: (time) => {
                        var result = false;
                        if (this.endDate) {
                            return time.getTime() > +this.endDate;
                        }
                        return result;
                    }
                },
                endDateOptions: {
                    disabledDate: (time) => {
                        var result = false;
                        if (this.startDate) {
                            return time.getTime() < +this.startDate;
                        }
                        return result;
                    }
                }
            }
        },
        methods: {
            /**
             * 改变自定义模式
             */
            switchCustomState(state) {
                this.custom = state;
            },
            /**
             * 改变时间选择类型 
             */
            changeCurrent(value) {
                this.currentType = value;

                var time = this.value1;
                switch (value) {
                    case 1:
                        this.changeDate(time);
                        break;
                    case 2:
                        this.changeWeek(time);
                        break;
                    case 3:
                        this.changeMonth(time);
                        break;
                    case 4:
                        this.changeYear(time);
                        break;
                    default:
                }
                // 解决切换tab后，时间回填不正确的问题
                // this.value1 = '';
                setTimeout(()=> {
                    this.value1 = time;
                });
            },
            /**
             * 格式化时间成星期形式
             */
            parseToWeekFormat(value) {
                let date = formatDate(value, 'yyyy 第 WW 周');
                const week = getWeekNumber(value);
                return /WW/.test(date)
                    ? date.replace(/WW/, week < 10 ? '0' + week : week)
                    : date.replace(/W/, week);
            },
            /**
             * 改变周
             */
            changeWeek(value) {
                if (!value) {
                    this.resetStartAndEndDate();
                    this.$parent.query();
                    return;
                }
                value = new Date(value);
                var days = getWeekDaysByDay(value);
                var day0 = new Date(days[0].timestamp);
                // 日历控制周日为1星期的第一天
                this.$parent.filter.startDate = +(day0.setDate(day0.getDate() - 1));
                this.$parent.filter.endDate = days[5].timestamp;
                // this.week = '';
                setTimeout(()=> {
                    this.week = this.parseToWeekFormat(value);
                });
                this.$parent.query();
            },
            /**
             * 改变日期 
             */
            changeDate(value) {
                if (!value) {
                    this.resetStartAndEndDate();
                    this.$parent.query();
                    return;
                }
                this.$parent.filter.startDate = +this.value1;
                this.$parent.filter.endDate = +this.value1;
                this.$parent.query();
            },
            /**
             * 改变月份 
             */
            changeMonth(value) {
                if (!value) {
                    this.resetStartAndEndDate();
                    this.$parent.query();
                    return;
                }
                var date = this.value1;
                var year = date.getFullYear();
                var month = date.getMonth();
                this.$parent.filter.startDate = +new Date(year, month);
                this.$parent.filter.endDate = +new Date(year, month + 1, 0);
                this.$parent.query();
            },
            /**
             * 改变年份
             */
            changeYear(value) {
                if (!value) {
                    this.resetStartAndEndDate();
                    this.$parent.query();
                    return;
                }
                var date = this.value1;
                var year = date.getFullYear();
                this.$parent.filter.startDate = +new Date('' + year);
                this.$parent.filter.endDate = +new Date('' + (year + 1), 0, 0);
                this.$parent.query();
            },
            /**
             * 清除时间
             */
            resetStartAndEndDate() {
                this.$parent.filter.startDate = '';
                this.$parent.filter.endDate = '';
            },
            /**
             * 改变开始日期
             */
            changeStartDate(value) {
                if (!value) {
                    this.resetStartAndEndDate();
                }
                if (this.validateStarTimeEndTime()) {
                    this.$parent.query();
                }
            },
            /**
             * 改变结束日期
             */
            changeEndDate(value) {
                if (!value) {
                    this.resetStartAndEndDate();
                }
                if (this.validateStarTimeEndTime()) {
                    this.$parent.query();
                }
            },
            /**
             * 验证开始时间和结束时间 
             */
            validateStarTimeEndTime() {

                var filter = this.$parent.filter;
                var startDate = filter.startDate;
                var endDate = filter.endDate;

                if (startDate && endDate) {
                    if (startDate > endDate) {
                        toast('warning', '开始日期不能大于结束日期');
                        return;
                    }
                } else if (!startDate && !endDate) {
                    return true;
                } else {
                    return false;
                }
                return true;
            }
        }
    }

</script>

<style lang="sass" scoped>
    @import '../../../resource/css/common/color';
    .inline-block-middle {
        display: inline-block;
        vertical-align: middle;
    }
    
    .module-wrap .filter-wrap .date-group .el-date-editor {
        margin-bottom: 0;
    }
    
    .date-group {
        margin: 0 30px 0 0;
        > label,
        > div {
            @extend .inline-block-middle;
        }
        > label {
            margin-right: 10px;
        }
    }
    
    .date-type-list {
        @extend .inline-block-middle;
        li {
            cursor: pointer;
            display: inline-block;
            > span {
                border-right: 1px solid #DDD;
                padding: 0 10px;
            }
            &:last-of-type {
                > span {
                    border-right: 0;
                }
            }
            &.active {
                color: $theme-color;
            }
        }
    }
    
    .date-item {
        @extend .inline-block-middle;
    }
</style>