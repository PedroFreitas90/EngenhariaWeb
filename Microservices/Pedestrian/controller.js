var db = require('./connection')


module.exports.insert_Pedestrian = (pedestrian_oid,latitude,longitude,result) => {

let stmt ="INSERT INTO pedestrian_crosswalk(oid,latitude,longitude)\
            VALUES(?,?,?);" 
let args = [pedestrian_oid,latitude,longitude]
db.query(stmt,args,function (err, res){
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;;
    }
    result(null,res)    
  })
}

module.exports.isPedestrian_inCrosswalk = (pedestrian_oid,result)=>{
    let stmt ="Select * from pedestrian where oid = ?"
    let args = [pedestrian_oid]
    db.query(stmt,args,function (err, res){
        if (err) {
          result(err, null);
          return;;
        }
        if(res.length > 0){
            result(null,true)
        }
        else{
            result(null,false)
        }
      })
}
