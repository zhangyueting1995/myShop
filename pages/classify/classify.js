// pages/classify/classify.js
const ajax = require('../../utils/ajax.js');
const utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classifyItems: [],
    curNav: 1,
    curIndex: 0
  },
  classifyShow: function(){
    var that=this;
    ajax.request({
      method:'GET',
      url: 'classify/getShopClassifyList?key=' + utils.key,
      success:data=>{
        console.log(data);
        that.setData({
          classifyItems:data.result
        })
      }
    });
  },
  //点击打开右侧列表事件函数
  switchRightTab:function(e){
    var id=e.target.dataset.id;
    var index=e.target.dataset.index;
    this.setData({
      curNav:id,
      curIndex:index
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.classifyShow();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})