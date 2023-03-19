

const API_URL = 'http://localhost:4002/api/v1'

export const createNewSeller = async (name: string, email: string, password: string, phone: string) => {
    const response = await fetch(`${API_URL}/sellers`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, phone })
    })
    if(response.status === 201){
        return {message: 'Account Created Successfully' , status: 201, data : await response.json()}
    }
    else if(response.status === 400){
        const data = await response.json()
        return data
    }
}
    

export const loginSeller = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/sellers/login`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },

        body: JSON.stringify({ email, password })
    })
    if(response.status === 200){
        return {message: 'Login Successful' , status: 200, data : await response.json()}
    }

        const data = await response.json()
        return data
    
}