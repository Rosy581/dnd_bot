const frekayRoll = (fucks,roll) =>{
    fucks = fucks.split("+")
    let og = fucks
    let rolls = []
    for(let i = 0 ;i<fucks.length;i++){
        if(fucks[i].split("d")[0] && fucks[i].split("d").length == 1){
            rolls.push(parseInt(fucks[i]))
        } else {
            fucks[i] = fucks[i].split("d")
        }

    }
    for(let i = 0;i<fucks.length;i++){
        if(fucks[i].length>1){
            console.log("ran")
            rolls = rolls.push(roll(fucks[i][1],fucks[i][0],0).rolls)
        }
    }
    let total = rolls.reduce((acc,cur)=>{return acc + cur},0)
    return {
        rolls,
        total,
        og
    }
}
module.exports = frekayRoll
