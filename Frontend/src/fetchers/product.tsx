
const API_URL = 'http://localhost:4002/api/v1'

export const saveProduct = async (name: string, price: number, description: string, productImage: string, seller: string) => {
    const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, price, description, productImage, seller })
    })

    if(response.status === 201){
        return {message: 'Product Created Successfully' , status: 201, data : await response.json()}
    }
    else if(response.status === 400){
        const data = await response.json()
        return data
    }
}

export const getAllProducts = async (sellerID:string) => {
    const response = await fetch(`${API_URL}/seller/${sellerID}/products`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        }
    })
    if(response.status === 200){
        return {message: 'Products Fetched Successfully' , status: 200, data : await response.json()}
    }
    
    else if(response.status === 400){
        const data = await response.json()
        return data
    }
}