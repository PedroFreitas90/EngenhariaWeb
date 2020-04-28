var db = require('../connection')


module.exports.insert_PedestrianRT = (pedestrian_oid,crosswalk_oid,distance,day,result) => {
     console.log(crosswalk_oid)
     console.log(day)
     console.log(pedestrian_oid)
let stmt ="INSERT INTO pedestrian_crosswalk(pedestrian_oid,crosswalk_oid,distance,day)\
            VALUES(?,?,?,?);" 
let args = [pedestrian_oid,crosswalk_oid,distance,day]
db.query(stmt,args,function (err, res){
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;;
    }
    result(null,res)    
  })
}

module.exports.isAlready_inCrosswalk = (crosswalk_oid,pedestrian_oid,result) => {
    let stmt ="Select  *  from pedestrian_crosswalk where crosswalk_oid = ? and  pedestrian_oid = ?"
    let args = [crosswalk_oid,pedestrian_oid]
    db.query(stmt,args,function (err, res){
        if (err) {
          result(err, null);
          return;;
        }
        console.log(res)

        if(res.length> 0){
            result(null,true)
        }
        else{
            result(null,false)
        }
      })
    }

module.exports.isPedestrian_inCrosswalk = (pedestrian_oid,result)=>{
    let stmt ="Select * from pedestrian_crosswalk where pedestrian_oid = ?"
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



module.exports.update_distanceTO_Pedestrinan_Crosswalk = (distance,crosswalk_oid,pedestrian_oid,result) => {
    let stmt ="update pedestrian_crosswalk set distance = ? where crosswalk_oid = ? and  pedestrian_oid = ?"
    let args = [distance,crosswalk_oid,pedestrian_oid]
    db.query(stmt,args,function (err, res){
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;  
        }
        result(null,res)  
    })
}


module.exports.pedestrian_Leave_Crosswalk = (pedestrian_oid, result) => {
    let stmt ="delete from  pedestrian_crosswalk where pedestrian_oid = ?"
    let args = [pedestrian_oid]
    db.query(stmt,args,function (err, res){
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;;
        }
        
        result(null,res)    
    })
}


            

    


