var CrosswalkRT = require('../controllers/crosswalkRT')



module.exports.verifyPosition = (actualPosition) => {
    
    let isNear = actualPosition.response.isNear
    let idPedestrian = actualPosition.response.idPedestrian
    let pedestrian = actualPosition.response.pedestrian
    if(isNear){  // está perto da passadeira
        let idCrosswalk = actualPosition.response.idCrosswalk
        let distance = actualPosition.response.distance
        CrosswalkRT.isAlready_inCrosswalk(idCrosswalk,idPedestrian,(err,itIs) => {
            if(err){
                console.log(err)
            }
            if(itIs){// já estava perto
                CrosswalkRT.update_distanceTO_Pedestrinan_Crosswalk(distance,idCrosswalk,idPedestrian,(err,result) =>{
                    if(err){
                        console.log(err)
                    }
                    console.log("UPDATE COM SUCESSO")    
                })

            }
            else{ // ainda nao estava perto da 
              CrosswalkRT.insert_PedestrianRT(idPedestrian,idCrosswalk,distance,new Date(),(err,result)=>{
                if(err){
                    console.log(err)
                }
                console.log("Inserido COM SUCESSO")    
              })      
            } 
        })
    }       
    else {
        // nao está perto da passadeira
        CrosswalkRT.isPedestrian_inCrosswalk(idPedestrian,(err,result)=>{
            if(err){
                console.log(err)
            }

            if(result){// ultimo registo diz que ele estava na passadeira
                CrosswalkRT.pedestrian_Leave_Crosswalk(idPedestrian,(err,result) =>{
                    if(err){
                        console.log(err)
                    }

                })
            }
            else {// nao ha registo de que estava na passadeira - ignorar
                console.log(result)
            }
        })

    }

}