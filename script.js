const roll = (max, n, mod) => {
    if (max == undefined || max == 0) {
        throw new Error("Number not found or out of range")
    }
    max = max - 1
    if (!mod) {
        mod = 0
    }
    mod = parseInt(mod)
    let rolls = []
    n = !n ? 1 : n
    for (let i = 0; i < n; i++) {
        rolls.push(Math.round(Math.random() * max) + 1)
    }
    let total = rolls.reduce((a, b) => { return a + b }, 0) + mod
    return {
        rolls,
        mod,
        total
    }
}

const frekayRoll = (fucks) =>{
    fucks = fucks.split("+")
    let og = fucks
    let rolls = []
    let total = []
    for(let i = 0 ;i<fucks.length;i++){
        if(fucks[i].split("d")[0] && fucks[i].split("d").length == 1){"hi i dont wanna change this i just"} else {
            fucks[i] = fucks[i].split("d")
        }
    }
    for(let i = 0;i<fucks.length;i++){
        if( typeof fucks[i] !== "string"){
            let rolled =roll(fucks[i][1],fucks[i][0],0).rolls
            rolls.push(rolled)
            console.log(rolled)
            total = total.concat(rolled)
        } else {
            rolls.push(fucks[i])
            total.push(parseInt(fucks[i]))
        }
        if(isNaN(parseInt(fucks[i][0]))){   
            fucks[i][0] = 1
        }
    }
    total = total.reduce((acc,cur)=>{return acc + cur},0)
    return {
        rolls,
        total,
        og
    }
}
module.exports = frekayRoll
