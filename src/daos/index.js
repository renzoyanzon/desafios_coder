require('dotenv').config();

const getProductRepository =  ()=>{
    const dataCore = process.env.DATACORE;

    if(dataCore == 'FS'){
        const ProductServices =  require('./repository/products.fs.repository');
     
        return ProductServices;
    } else{
        const ProductServices =  require('./repository/products.mongoose.repository');
        return ProductServices;
    
    }
}



module.exports= {getProductRepository};