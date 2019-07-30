// pages/home/home.js
const ajax = require('../../utils/ajax.js');
const utils = require('../../utils/util.js');
var sectionData = [];
var ifLoadMore = null;
var page = 1;//默认第一页
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    navbars:[],
    banners:[],
    menus:[],
    brands:[],
    page:1,//默认第一页数据
    hidden:false
  },
  //方法集合
  //监听顶部导航栏的切换
  navbarTap(e){
    this.setData({
    currentTab:e.target.dataset.idx
    });
  },
  //获取顶部导航栏数据
  navbarShow: function () {
    ajax.request({
      method: 'GET',
      url: 'home/navBar?key=' + utils.key,
      success: data => {
        this.setData({
          navbars: data.result
        })
        console.log(data.result)
      }
    })
  },
  //获取轮播图数据
  bannerShow:function(){
    ajax.request({
      method: 'GET',
      url: 'home/banners?key=' + utils.key,
      success: data => {
        this.setData({
          banners: data.result
        })
        console.log(data.result)
      }
    })
  },
  //获取分类菜单数据
  menuShow: function () {
    var that = this;
    ajax.request({
      method: 'GET',
      url: 'home/menus?key=' + utils.key,
      success: data => {
        that.setData({
          menus: data.result
        })
        console.log(data.result)
      }
    })
  },
  //获取特卖广告图数据
  brandShow: function () {
    ajax.request({
      method: 'GET',
      url: 'activity/brands?key=' + utils.key + '&type=temai&page=1&size=5',
      success: data => {

        this.setData({
          brands: data.result.list
        })
        console.log("brands：" + data.result.list)
      }
    })
  },
  //获取商品列表数据
  newGoodsShow:function(){
    var that=this;
    ajax.request({
      method:'GET',
      url: 'goods/getHotGoodsList?key=' + utils.key + '&page=' + page + '&size=10',
      success:data=>{
        var newGoodsData = data.result.list;
        page+=1;
        if(ifLoadMore){
          if(newGoodsData.length>0){
            for(var i in newGoodsData){
              var name = newGoodsData[i].name;
              if(name.length>26){
                //名字后面加省略号
                newGoodsData[i].name = name.substring(0, 23) + '...';
              }
            }
            sectionData['newGoods'] = sectionData['newGoods'].concat(newGoodsData);
          } else {
            ifLoadMore = false;
            this.setData({
              hidden: true
            });
            wx.showToast({
              title: '暂无更多内容！',
              icon: 'loading',
              duration: 2000
            })
          }
        }else{
          if(ifLoadMore==null){
            ifLoadMore=true;
            for(var i in newGoodsData){
              var name = newGoodsData[i].name;
              if(name.length>26){
                newGoodsData[i].name=name.substring(0,23)+"...";
              }
            }
            sectionData['newGoods']=newGoodsData;//刷新
          } 
        }
        this.setData({
          newGoods: sectionData['newGoods']
        });
        wx.stopPullDownRefresh();//结束动画
      }
    })
  },
  //轮播图跳转
  show:function(e){
    console.log(e);
    var goodsId=e.currentTarget.dataset.goodsid;
    this.goodsClickShow(goodsId);
    wx.navigateTo({
      url: '../detail/detail?goodsId=' + goodsId
    })
  },
  //商品列表跳转
  //点击数量统计
  goodsClickShow:function(goodsId){
    ajax.request({
      method:'GET',
      url: 'goods/addGoodsClickRate?key=' + utils.key + '&goodsId=' + goodsId,
      success:data=>{
        console.log("用户点击统计返回结果：" + data.message)
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.navbarShow();
    this.bannerShow();
    this.menuShow();
    this.brandShow();
    this.newGoodsShow();
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
   if(ifLoadMore!=null){
      this.newGoodsShow();
      console.log("上拉刷新")
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})