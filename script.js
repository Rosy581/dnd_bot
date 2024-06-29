const rolls = (fucks,dm) =>{
    fucks = fucks.split("+")
    console.log(fucks)
    let mods = []
    for(let i = 0 ;i<fucks.length;i++){
        if(fucks[i].split("d")[0] && fucks[i].split("d").length == 1){
            mods.push(fucks[i])
        } else {
            fucks[i] = fucks[i].split("d")
        }

    }
    console.log(fucks)
    console.log(mods)
}
rolls("2d8+4+d6")