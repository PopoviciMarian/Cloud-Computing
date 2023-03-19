import config from "./productGenerator.config";

var request = require('request');


export const getRandomProducts = async (count: number) => {
    try {
        var options = {
            'method': 'GET',
            'url': `${config.PG_URL}/products?offset=0&limit=${count}`,
            'headers': {
                "Authorization": `Bearer ${config.PG_API_KEY}`
            }
        };
        const response: any = await new Promise((resolve, reject) => {
            request(options, function (error: any, response: any) {
                if (error) reject(error);
                resolve(JSON.parse(response.body));
            });
        });

        
        const products = response.map((product: any) => {
            return {
                "name": product.title,
                "description": product.description,
                "price": product.price,
                "productImage": product.images[0],
            }
        })

        return products;
    } catch (e: any) {
        console.log(e);
        return undefined;
    }
}