<template>
  <div ref="scrollBox" class="scroll-box">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <ul class="loadmore-list">
        <li v-for="(item, index) in list" :key="index" @click="clickItem(item)">社交栏目 {{ item }}</li>
      </ul>
    </mt-loadmore>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { on } from 'assets/js/dom'

export default {
  data() {
    return {
      list: [],
      allLoaded: false,
      pageNum: 1
    }
  },
  created() {
    for (let i = 1; i <= 15; i++) {
      this.list.push(i)
    }
  },
  mounted() {
    // mint-ui与fast-click的兼容
    on(this.$refs.scrollBox, 'touchstart', function(event) {
      event.target.classList.add('needsclick')
    })
  },
  methods: {
    loadTop() {
      setTimeout(() => {
        let firstValue = this.list[0]
        for (let i = 1; i <= 10; i++) {
          this.list.unshift(firstValue - i)
        }
        this.$refs.loadmore.onTopLoaded()
      }, 1500)
    },
    loadBottom() {
      setTimeout(() => {
        let lastValue = this.list[this.list.length - 1]
        if (lastValue < 40) {
          for (let i = 1; i <= 10; i++) {
            this.list.push(lastValue + i)
          }
        } else {
          this.allLoaded = true
          Toast('数据已经加载完了~')
        }
        this.$refs.loadmore.onBottomLoaded()
      }, 1500)
    },
    clickItem(i) {
      Toast('你点击了-社交栏目 ' + i)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/stylus/variable.styl'
@import '~@/assets/stylus/mixin.styl'

.loadmore-list
  padding 0 $padding-horizontal
  li
    text-align center
    height 50px
    line-height 50px
    border-bottom 0.5px solid $color-divider
.mint-loadmore-bottom
  text-align center
  span
    display inline-block
    transition 0.2s linear
    vertical-align middle
  .is-rotate
    transform rotate(180deg)
</style>
