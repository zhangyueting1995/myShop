// pages/brand/brand.js
const ajax = require('../../utils/ajax.js');
const utils = require('../../utils/util.js');
var sectionData = [];
var ifLoadMore = null;
var page = 1;//默认第一页
var activityId='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    brandGoods:[],
    hidden:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    activityId = options.activityId
    this.brandShow();
  },
//获取数据
brandShow:function(options){
  ajax.request({
    method:"GET",
    url: 'goods/getActivityGoodsList?key=' + utils.key + '&activityId=' + activityId + '&page=' + page + '&size=10',
    success: data=>{
      console.log(data.result.list);
      var newGoodsData=data.result.list;
      page++;
      if(ifLoadMore){
        if(newGoodsData.length>0){
          sectionData['brandGoods'] = sectionData['brandGoods'].concat(newGoodsData);
        }else{
          ifLoadMore=false;
          this.setData({
            hidden:true
          });
          wx.showToast({
            title: '暂无更多内容！',
            icon: 'loading',
            duration: 2000
          });
        }
      }else{
        if(ifLoadMore==null){
          ifLoadMore=true;
          sectionData['brandGoods']=newGoodsData;
        }else{
          sectionData['brandGoods'] = sectionData['brandGoods'] = sectionData['brandGoods'].concat(newGoodsData);
        }
      }
      this.setData({
        brandGoods:sectionData['brandGoods']
      });
      wx.stopPullDownRefresh();//结束动画
    }
  });
},
//跳转至详情页
handleToDetail:function(e){
  var goodsId = e.currentTarget.dataset.goodsid;
  console.log(e);
  wx.navigateTo({
    url: '/pages/detail/detail?goodsId='+goodsId
  })
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
    this.brandShow();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})