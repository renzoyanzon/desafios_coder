function getRandomNumbers (range){
    const min = 1;
    const max= 1000;
    let data= []

    if(!range){
        range = 100000000;
    }
    for(let i=1; i<= range;i++){
        let randomNumber = Math.floor(Math.random() * (max - min))  + min;
        const index = data.findIndex((i,idx)=>{
            if(i.key == randomNumber){
                return true
            }
        })
        if(index != -1){
            data[index] = {
                key: randomNumber,
                repeat: data[index].repeat +1
            }
        } else{
            data.push({key: randomNumber, repeat:1})
        }
    }

    return data
}

process.on('message',(obj)=>{
    const parsedData = JSON.parse(obj.valor)
   
    if(obj.action =="start"){
        process.send({
            success: true,
            data: getRandomNumbers(parsedData)
        })
    } else{
        process.send({
            success: false,
            data: "Wrong message"
        })
    }

})