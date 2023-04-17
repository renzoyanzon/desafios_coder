const router = require('express').Router();
const _ = require('lodash');
const {v4: uuidv4}= require('uuid');

const {getProductRepository} = require('../../daos/index');
const ProductService = getProductRepository();
const productService= new ProductService(); 

/* const ProductService = require('../../daos/repository/products.fs.repository');
const productService = new ProductService(); */

router.post('/', async (req,res)=>{
    try {
        const {body} = req;
       
        if(_.isNil(body)){res.status(400).json({success:false, message: "Error - body missing"})}
        Object.assign(body,{
            uuid: uuidv4(),
            timestamp: Date.now()
        });
        
        const data = await productService.createProduct(body);

        if(!data.success) res.status(500).json(data)
        res.status(200).json(data)

        
    } catch (error) {
        console.error(error)
    }

});

router.get('/', async(_req,res)=>{
    try {
        const data = await productService.getAllProducts();
        if(!data.success) res.status(500).json(data);
        
        res.render('products', data)
    } catch (error) {
        console.error(error)
    }
})

router.get('/:productUuid', async(req,res)=>{
    
    try {
        const {productUuid} = req.params;
        if(_.isNil(productUuid)) res.status(400).json({success:false,message: "Error: product id missing"});
        const data = await productService.getProductById(productUuid);
        if(!data.success) res.status(500).json(data)
        res.status(200).json(data)
    } catch (error) {
        console.error(error)
    }

  
})

router.delete('/', async(_req,res)=>{
    try {
        const data = await productService.deleteProducts();
        if(!data.success) res.status(500).json(data)
        res.status(200).json(data)
    } catch (error) {
        console.error(error)
    }
})

router.delete('/:productUuid', async(req,res)=>{

    try {
        const {productUuid} = req.params;
        if(_.isNil(productUuid)) res.status(400).json({success:false,message: "Error: product id missing"});
        const data = await productService.deleteProductById(productUuid);
        if(!data.success) res.status(500).json(data)
        res.status(200).json(data)
    } catch (error) {
        console.error(error)
    }
    
})

router.put('/:productUuid',async(req,res)=>{

    try {
        const {productUuid} = req.params;
        if(_.isNil(productUuid)) res.status(400).json({success:false,message: "Error: product id missing"});
        
        const {body}= req;
        console.log(body)
        const data =  await productService.updateProduct(productUuid,body);
        if(!data.success) res.status(500).json(data)
        res.status(200).json(data)
    } catch (error) {
        console.error(error)
    }
    

})



module.exports = router