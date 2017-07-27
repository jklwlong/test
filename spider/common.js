var fs=require("fs");  

//读取文件内容 
function readFile(src) {  
    fs.readFile(src,'utf-8',function(err,data){  
        if(err){  
            console.error(err);  
        }  
        else{  
            console.log(data)
        }  
    });   
} 

exports.readFile = readFile;