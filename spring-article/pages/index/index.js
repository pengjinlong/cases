// index.js
// 获取应用实例
const app = getApp()
import lottie from 'lottie-miniprogram'

Page({
  data: {
    background: ['https://cloud-minapp-39237.cloud.ifanrusercontent.com/1n6jtVIbbJ3rnAv7.jpg', 'https://cloud-minapp-39237.cloud.ifanrusercontent.com/1n6mBOvOutOFQ3E8.png',],
    x: 0,
    y: 0,
    z: 0,
    animationFinish: true, // 动画是否执行完成
    animationStart: false, // 是否开始执行动画
    backgroundImg: 'https://cloud-minapp-39237.cloud.ifanrusercontent.com/1n6jtVIbbJ3rnAv7.jpg',
    current: 0,
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 动画开始执行
  handleTransition(e) {
    if (this.data.animationFinish) {
      this.setData({
        animationFinish: false,
        animationStart: true,
      })
    }
  },
  // 动画执行结束
  handleFinish() {
    this.setData({
      animationFinish: true,
      animationStart: false,
    })
  },
  // current值变化
  handleChange(e) {
    this.setData({
      current: e.detail.current,
    })
  },
  onLoad() {
    wx.createSelectorQuery().select('#canvas').node(res => {
      const canvas = res.node
      const context = canvas.getContext('2d')
      lottie.setup(canvas)
      lottie.loadAnimation({
        path: 'https://assets10.lottiefiles.com/packages/lf20_1qfekvox.json',
        autoplay: true,
        loop: true,
        rendererSettings:{
          context
        }
      })
    }).exec()

    const that = this;
    wx.startDeviceMotionListening({
      success() {
        wx.onDeviceMotionChange(function (res) {
          const {
            alpha, // 0-360
            beta, // -180-180
            gamma // -90- 90
          } = res
          // console.log(alpha, beta, gamma)
          const disX = gamma / 90 * 20
          const disY = beta / 90 * 12
          let z = 0
          if (disX > 0 || disY > 0) {
            z = 20
          } else {
            z = -20
          }
          that.setData({
            x: disX,
            y: disY,
            z
          })
        })
      }
    })
  }
})