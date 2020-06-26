import axios from 'axios'//引入axios
// http://192.168.43.39:5000
//http://192.168.0.126:5000
export const loc_ip = 'http://192.168.0.126:5000'
axios.defaults.baseURL = loc_ip
//获取商家
export const api_getshop = () => axios.get('/shop/seller')//获取商家信息
export const api_getgoods_list = () => axios.get("/goods/goods_list")//获取商品数据 
export const api_getevaluate = () => axios.get("/shop/ratings")//获取评价信息