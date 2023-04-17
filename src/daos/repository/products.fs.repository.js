
const fs = require('fs');

class ProductServices{
    constructor(){
        this.ruta = __dirname + '/products.json'
    }

    async getAllProducts (){
        try {
            
            const products = await fs.promises.readFile(this.ruta);
            return({
                success: true,
                data: JSON.parse(products)
            })
            
        } catch (error) {
            console.error(error)
            
        }
    }

    async getProductById (uuid){

        try {
          
            const products= await fs.promises.readFile(this.ruta);
            const productsObject = JSON.parse(products);
            const product = productsObject.filter(el=>el.uuid == uuid);  
            return({
                success:true,
                data: product
            })
        } catch (error) {
            console.log(error)     
        }
    }

    async createProduct(data){
        try {
            const products = await fs.promises.readFile(this.ruta);
            const productsObject = JSON.parse(products);
            productsObject.push(data);
           
            await fs.promises.writeFile(this.ruta, JSON.stringify(productsObject))
            return({
                success:true,
                data: `Product ${data.uuid} was created succesfully`
            })
        } catch (error) {
            console.log(error) 
        }
    }

    async deleteProductById (uuid){
        try {
            const products = await fs.promises.readFile(this.ruta);
            const productsObject = JSON.parse(products);
            const newProducts = productsObject.filter(el=> el.uuid !== uuid);
            await fs.promises.writeFile(this.ruta,JSON.stringify(newProducts));
            return({
                success:true,
                data: `Product ${uuid} deleted successfully`
            })

        } catch (error) {
            console.log(error) 
        }
    }

    async deleteProducts (){

        try {
            const products = await fs.promises.readFile(this.ruta);
            const productsObject= JSON.parse(products);
            const newProducts = [];
            await fs.promises.writeFile(this.ruta, JSON.stringify(newProducts)) ;
            return({
                success:true,
                data: `All products deleted`
            })
 
        } catch (error) {
            console.log(error) 
        }
     
    }

    async updateProduct (uuid,data){
        try {
            console.log(data)
            const products = await fs.promises.readFile(this.ruta);
            const productsObject= JSON.parse(products);
            const newProducts = productsObject.map(el=>(el.uuid == uuid) ? data : el);
    
            await fs.promises.writeFile(this.ruta, JSON.stringify(newProducts)) ;
            return({
                success:true,
                data: `Product ${uuid} updated successfully`
            })

        } catch (error) {
            console.log(error) 
        }
    }


}

module.exports= ProductServices;