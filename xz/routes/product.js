const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
////创建路由器对象
var router=express.Router();
  //添加路由
  //1.商品列表
  router.get('/list',function(req,res){
  //1.1获取数据
  var obj=req.query;
  console.log(obj);
   //1.2验证数据是否为空
  var pno=obj.pno;
  var size=obj.size;
  if(!pno) pno=1;
  if(!size) size=9;
  console.log(pno,size)
  //1.3转为整型
   pno=parseInt(pno);
  size=parseInt(size);
  //1.4计算开始查询的值
  var start=(pno-1)*size;
  //1.5执行SQL语句
   pool.query('SELECT lid,price,title FROM xz_laptop LIMIT ?,?',[start,size],function(err,result){
   if(err) throw err;
   res.send(result);
   });
});
//2.商品的详情（检索）
     router.get('/detail',function(req,res){
	 //2.1获取成功
     var obj=req.query;
	 console.log(obj);
	//2.2验证数据是否为空
	 if(!obj.lid){
	 res.send({code:401,msg:'lid required'});
	 return;
	 }
	//3.3执行SQL语句
    pool.query('SELECT * FROM xz_laptop WHERE lid=?',[obj.lid],function(err,result){
     if (err) throw err;
	 //console.log(result);
	 if(result.length>0){
	  res.send(result[0]);
	 }else{
	  res.send({code:301,msg:'can not found'})
	 }
   }); 
}); 


//3.商品添加

//4.删除商品

//5.修改商品


//导出路由器
module.exports=router;