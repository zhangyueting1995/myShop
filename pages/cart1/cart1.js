// pages/cart1/cart1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts:[],
    totalMoneny:0,
    selAll:false
  },
  //去抢购
  goToShopping:function(){
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  goToPay:function(){
      wx.showToast({
        title: '去结算',
        icon: 'success',
        duration: 3000
      });
  },
  //计算总价
  getTotalMoneny:function(){
    var total=0;
   for(var item of this.data.carts){
     if(item.checked==true){
       total+=item.price*item.goodsCount;
       this.setData({totalMoneny:total});
     }else{
       total+=0;
       this.setData({ totalMoneny: total });
     }
   }
  },
  //单选选中
  selOnly:function(e){
    var id=e.target.dataset.id;
    var carts=this.data.carts;
    var selTrue=0;
    for(var i=0;i<carts.length;i++){
      if(carts[i].id==id){
        carts[i].checked=!carts[i].checked;
        this.setData({carts:carts});
      }
      //判断是否有未选中的；
      if(carts[i].checked==false){
        this.setData({selAll:false});
        selTrue--;
      } else{
        selTrue++;
        if(selTrue==carts.length){
          this.setData({selAll:true});
        }
      }
    }
    this.getTotalMoneny();
  },
  //单击全选
  selAll: function (){
    this.setData({
      selAll:!this.data.selAll
    });
      for(var item of this.data.carts){
        item.checked=this.data.selAll;
        this.setData({carts:this.data.carts});
      }
    this.getTotalMoneny();
  },
  //点击数量增加
  addCount: function (e) {
    var id=e.target.dataset.id;
    var carts = this.data.carts
    for(var item of carts){
      if(item.id==id &&item.goodsCount<10){
        item.goodsCount++;
      }
      this.setData({
        carts:carts
      });
    }
    this.getTotalMoneny();
  },
  //点击数量减少
  delCount: function (e) {
    var id = e.target.dataset.id;
    var carts = this.data.carts;
    for (var item of carts) {
      if (item.id == id && item.goodsCount > 1) {
        item.goodsCount--;
      }
      this.setData({
        carts: carts
      });
    }
    this.getTotalMoneny();
  },
  //获取本地缓存数据
  cartDataShow: function () {
    var arr = wx.getStorageSync('cart') || [];
    if (arr.length > 0) {
      for(var item of arr){
        item.checked=false;
      }
      this.setData({
        carts: arr
      });
    }
  },
  //点击删除这条数据
  delCard:function(e){
    console.log(1);
    var id=e.target.dataset.id;
    var carts=this.data.carts;
    for(var i=0;i<carts.length;i++){
      if(carts[i].id==id){
        carts.splice(i,1);
        this.setData({
          carts:carts
        });
        wx.setStorageSync('cart',carts);
      }
    }
     this.getTotalMoneny();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.cartDataShow();
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