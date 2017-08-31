// cmd shell 命令 进入项目文件夹 mongo
// 初始化项目的配置文件  npm init
// npm install mongodb --save (--save是指保存到项目配置中去)
// 我们需要知道我们连接的mongodb 服务是谁
// 服务器的地址 端口 自动重连
// 连接上数据库了 数据库是不是有名字
var mongo = require('mongodb');
var Server = mongo.Server;
var Db = mongo.Db;
var conf = {
    adr: '127.0.0.1', // 这个是mongodb的服务器地址
    port: '27017', // 这个是我们链接服务器的端口号
    auto: {auto_reconnect: true}, // 自动重连
    db: 'fff'
};

// 数据库的地址  数据库的端口号  是否自动重连（true、false）
var server = new Server(conf.adr, conf.port, conf.auto);
// 连接服务器的数据库  要连接的数据库名  要连接的数据库地址
var db = new Db(conf.db ,server);

//function find(colName)



// function find1(colName,fun){
//      db.open(function(err){
//         if(!err){
//             db.collection(colName, function(err, col){
//                 if(!err){
//                     col.find().toArray(function(err, data){
//                         fun(data);
//                         db.close();
//                     });
//                 }
//             })
//         }
//     })
// }


// function remove(colName,fun,query){
//         db.open(function(err){
//         if(!err){
//             db.collection(colName, function(err, col){
//                 if(!err){
//                     col.deleteOne(query,function(err, data){
//                         fun('ok');
//                         db.close();
//                     });
//                 }
//             })
//         }
//     })

// }

// function conn1(deal, fun){
// 	db.open(function(err){
// 		if(!err){
// 			db.collection(deal.colName, {safe: true}, function(err, col){
// 				if(!err){
//                     if(deal.funs instanceof Array){ // 多数据增删改查操作
// 						var allFuns = deal.funs.length;
// 						var dealLen = {};
// 						var count = 0;
// 						for(let i = 0; i < allFuns; i++){
// 							switchFun(col, deal.funs[i], function(data){
						
// 								dealLen[deal.funs[i].name] = data;
								
// 								count++;
// 								if(count == allFuns){
// 									fun(dealLen);
// 									db.close();
// 								}
// 							})							
// 						}
						
// 					} else {  // 单数据增删改查操作
// 						switchFun(col, deal.funs, function(data){
// 							fun(data)
// 							db.close();
// 						})
// 					}
// 				} else {
//                     console.log('col err:' + err);
// 				} 	
// 			})
// 		} else {
// 			console.log('db err: ' + err);
// 		}
		
// 	});	
	
// 	function switchFun(col, funs, fun){  // 增删改查方法拓展
// 		switch(funs.name){
// 			case 'find':
// 				col.find(funs.query).limit(funs.limit).skip(funs.skip).toArray(function(err, data){
// 					if(!err){
// 						fun(data);
// 					} else {
// 						console.log(err);
// 					}
// 				});
// 			break;	
// 			case 'count':
// 				col.count(function(err, data){
// 					fun(data);
// 				});
// 			break;	
// 			case 'insert':
// 				col.insert(funs.query, function(err, data){
// 				    console.log(data);
// 					fun(data);
// 				});
// 			break;	
// 	    }
// 	}
// }

//登录
function find(colName, fun, query){ 
    db.open(function(err){
        if(!err){
            db.collection(colName, function(err, col){
                 if(!err){                    
                    col.find(query).toArray(function(err, data){
                        if(!err){
                            // 都是返回OK， 会给我们返回 一个空的数组
                            if(data.length > 0){
                                fun('ok');
                            } else {
                                fun('err');
                            }
                            
                        } else {
                            fun('err');
                        }
                         db.close(); 
                    })  
                 }
            })
        }
    })
}

//注册
function insert(colName, fun, query){ 
    db.open(function(err){
        if(!err){
            db.collection(colName, function(err, col){
                 if(!err){                    
                    col.insert(query,function(err, data){
                        if(!err){
                                fun('ok');    
                        } else {
                            fun('err');
                        }
                         db.close(); 
                    })  
                 }
            })
        }
    })
}

//分页
function find2(colName, fun, page){ 
    var len;
    var datas;
    var step = 0; // 表示执行了第几个查询
    db.open(function(err){
        if(!err){
            db.collection(colName, function(err, col){
                 if(!err){                    
                   
                    col.find().toArray(function(arr, data){
                        if(!err){
                            len = data.length; 
                            step++;
                            if(step == 2){
                                fun(datas , len);
                            }
                        }
                    })
                     // skip 跳过忽略忽
                    col.find().skip(page).limit(10).toArray(function(err, data){
                        if(!err){
                            datas = data;
                            if(data.length > 0){
                                step++;
                                if(step == 2){
                                    fun(datas, len);
                                }
                            } else {
                                fun('err');
                            }
                            
                        } else {
                            fun('err');
                        }
                         db.close();
                    })  
                 }
            })
        }
    })
}




// exports.conn1 = conn1;
exports.find = find;//登录
exports.insert = insert;//注册
// exports.find1 = find1;
// exports.remove = remove;
exports.find2 = find2;//分页

