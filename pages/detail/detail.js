// pages/detail/detail.js
const ajax = require('../../utils/ajax.js');
const utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo:[],
    popupShow:false,
    popupContainerHide:true,
    goodsCount:1,
    isLike:false
  },
  //获取商品信息
  getGoodsInfo:function(options){
    ajax.request({
      method:'GET',
      url:'goods/getGoodsInfo?key=' + utils.key+'&goodsId=' + options.goodsId,
      success:data=>{
        var goodsInfo=data.result;
        console.log(goodsInfo);
        var detailsImg=goodsInfo.details.split(";");
        var goodsImg=[];
        for(var item of goodsInfo.shopGoodsImageList){
            goodsImg.push(item.imgUrl);
        }
        var newgoodsInfo={
          name:goodsInfo.name,
          price:goodsInfo.price,
          detailsImg:detailsImg,
          goodsImg:goodsImg,
          privilegePrice:goodsInfo.privilegePrice,
          id: goodsInfo.id,
          buyRate: goodsInfo.buyRate,
          imgUrl: goodsInfo.imgUrl
        }
        this.setData({
          goodsInfo:newgoodsInfo
        });
      }
    });
  }, 
  //点击弹出/关闭弹出层
  handleToPopUp:function(){
    this.setData({
      popupShow:!this.data.popupShow,
      popupContainerHide:!this.data.popupContainerHide
    });
  },
  //点击数量增加
  addCount:function(){
    if (this.data.goodsCount<10){
      this.data.goodsCount++;
      this.setData({
        goodsCount:this.data.goodsCount
      })
    }
  },
  //点击数量减少
  delCount:function(){
    if(this.data.goodsCount>1){
      this.data.goodsCount--;
      this.setData({
        goodsCount:this.data.goodsCount
      });
    }
  },
  //点击确定加入购物车
  addToCart:function(){
    var name=this.data.goodsInfo.name.substring(0,13)+"...";
    var CartStorage={
      id:this.data.goodsInfo.id,
      name:name,
      price:this.data.goodsInfo.price,
      imgUrl:this.data.goodsInfo.imgUrl,
      goodsCount:this.data.goodsCount
    }
    var arr=wx.getStorageSync("cart")||[];
    if(arr.length>0){
      for(var j in arr){
        if (arr[j].id == CartStorage.id){
          arr[j].goodsCount+=CartStorage.goodsCount;
          try {
            wx.setStorageSync('cart', arr)
          } catch (e) {
            console.log(e)
          }
          wx.showToast({
            title: '添加成功！',
            icon:'success',
            duration:2000
          });
          this.handleToPopUp();
          return;
        }
      }
      arr.push(CartStorage);
    }else{
      arr.push(CartStorage);
    }
    try {
      wx.setStorageSync('cart', arr);
      // 返回（在if内使用return，跳出循环节约运算，节约性能） 
      //关闭窗口
      wx.showToast({
        title: '加入购物车成功！',
        icon: 'success',
        duration: 2000
      });
      
      this.handleToPopUp();
      return;
    } catch (e) {
      console.log(e)
    }
  },
  //点击挑战至购物车
  handleToCart:function(){
    wx.switchTab({
      url: '/pages/cart1/cart1'
    })
  },
  //点击收藏成功
  addLike:function(){
    this.setData({
      isLike: !this.data.isLike
    });
    ajax.request({
      method: 'GET',
      url: 'collection/addShopCollection?key=' + utils.key + '&goodsId=' + this.data.goodsInfo.id,
      success: data => {
        console.log("收藏返回结果：" + data.message)
        wx.showToast({
          title: data.message,
          icon: 'success',
          duration: 2000
        });
      }
    })
  },
  immeBuy() {
    wx.showToast({
      title: '购买成功',
      icon: 'success',
      duration: 2000
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsInfo(options);
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