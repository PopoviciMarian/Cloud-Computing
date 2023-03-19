// This is the login page for the seller and also the register page
import React from 'react'
import { Box, Button, TextField } from '@mui/material'


// use Querty to crate a new seller account
import { createNewSeller, loginSeller } from '../fetchers/seller';
import Snackbar from '@mui/material/Snackbar';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { saveProduct } from '../fetchers/product';

const RegisterPage = (props:any) =>{
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [name, setName] = React.useState('')
    const [phone, setPhone] = React.useState('')


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh',py:1, px:15,  bgcolor: 'background.paper', borderRadius: '10px'}}>
                <TextField
                    sx={{ width: '100%' }}
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    sx={{ width: '100%', mt:2 }}
                    id="outlined-basic"
                    label="Phone Number"
                    variant="outlined"
                    type="text"
                    onChange={(e) => setPhone(e.target.value)}
                />
                
                <TextField

                    sx={{ width: '100%' , mt:2}}
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    sx={{ width: '100%', mt:2 }}
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />


                <Button sx={{ width: '100%', mt:5}} variant="contained" onClick={() => props.onSubmit(name, phone, email, password)}>Register</Button>
                <Button sx={{ width: '100%', mt:2}} variant="outlined" onClick={props.onLogin}>Login</Button>
            </Box>
        </Box>
    )
}



const LoginPage = (props:any) => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '40vh',py:1, px:15,  bgcolor: 'background.paper', borderRadius: '10px'}}>
                <TextField
                    sx={{ width: '100%' }}
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    sx={{ width: '100%', mt:2 }}
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button sx={{ width: '100%', mt:5}} variant="contained" onClick={() => props.onSubmit(email, password)}>Login</Button>
                <Button sx={{ width: '100%', mt:2}} variant="outlined" onClick={props.onRegister}>Register</Button>
            </Box>
        </Box>
    )
}

const ProductCard = (props:any) => {
    console.log(props)
    return (
        <Box sx={{ display: 'flex',m:2, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', width:"500px",py:1, px:15,  bgcolor: 'rgba(212, 121, 223, 0.3)', borderRadius: '10px'}}>
            <h3>{props.name}</h3>
            <h3>Price {props.price}$</h3>
        
                    <h4>{props.description}</h4>
            <img src={props.productImage} alt="product" style={{ height: '250px'}} />
        </Box>
    )
}

const Products  = ({sellerID, change}:any ) => {
 
    const [products, setProducts] = React.useState([])

    React.useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch(`http://localhost:4002/api/v1/sellers/${sellerID}/products`)
            const data = await res.json()
            setProducts(data)
        }
        fetchProducts()
    }, [change])

    return (
            <Box sx={{ display: 'flex', flexWrap:"wrap", flexDirection: 'row', alignItems: 'center', justifyContent: 'center', py:1,  bgcolor: 'background.paper', borderRadius: '10px'}}>
                {products.map((product:any) => {
                    return <ProductCard name={product.name} price={product.price} description={product.description}  productImage={product.productImage} />
                })}
            </Box>
        
    )
}



const SelerPage = ({userUUID, username, phone}:any) => {
    const [proudctName, setProductName] = React.useState('')
    const [proudctPrice, setProductPrice] = React.useState(0)
    const [proudctDescription, setProductDescription] = React.useState('')
    const [productImageURL, setProductImageURL] = React.useState('')
    const [productsChanged, setProductsChanged] = React.useState(false)

    const handleAddProduct = async () => {
        const res = await saveProduct(proudctName, proudctPrice, proudctDescription, productImageURL, userUUID)
        if (res) {
            setProductsChanged(!productsChanged)
        }

    
    }
    const avatar = `https://avatars.dicebear.com/api/human/${username}.svg`

    return (
        <>
        <Box sx={{ p:2, display: 'flex', flexDirection: 'roe=w', alignItems: 'flex-start', justifyContent: 'space-between' }}>
           
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh',py:1, px:15,  bgcolor: 'rgba(0, 110, 233, 0.2)', borderRadius: '10px', width:"800px"}}>
                <h3>Add new product</h3>
                <TextField sx={{mt:1, width: '100%' }} id="outlined-basic" label="Name" variant="outlined" type="text" onChange={(e) => setProductName(e.target.value)}/>
                <TextField sx={{mt:1, width: '100%' }} id="outlined-basic" label="Price" variant="outlined" type="text" onChange={(e) => setProductPrice(parseFloat(e.target.value))}/>
                <TextField sx={{mt:1, width: '100%' }} id="outlined-basic" label="Description" variant="outlined" type="text" onChange={(e) => setProductDescription(e.target.value)}/>
                <TextField sx={{mt:1, width: '100%' }} id="outlined-basic" label="Image URL" variant="outlined" type="text" onChange={(e) => setProductImageURL(e.target.value)}/>
                <Button sx={{ width: '100%', mt:5}} variant="contained" onClick={handleAddProduct}>Add Product</Button>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh',py:1, px:15,  bgcolor: 'rgba(233, 120, 113, 0.1)', borderRadius: '10px', width:"900px"}}>
            <img src={avatar} alt="avatar" style={{ height: '100px'}} />
                <h2>Name: {username}</h2>
                <h2>Phone: {phone}</h2>
            </Box>

        </Box>
        <Products sellerID={userUUID}  change={productsChanged} />
        </>
    )
}




const MainPage = () => {

    const [isRegister, setIsRegister] = React.useState(false)
    const [isLogin, setIsLogin] = React.useState(true)
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [userUUID, setUserUUID] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [phone, setPhone] = React.useState('');

    const handleRegister = () => {
        setIsRegister(true)
        setIsLogin(false)
    }

    const handleLogin = () => {
        setIsRegister(false)
        setIsLogin(true)
    }

    const handleSubmitLogin  = async (email:string, password:string) => {
        const res = await loginSeller(email, password);
        if(res.message){
            console.log(res)
            setSnackbarMessage(res.message)
            setOpenSnackbar(true)
        }
        if(res.status === 200){
            setUserUUID(res.data._id)
             setUsername(res.data.name);
            setPhone(res.data.phone);
        
        } 
    }

    const handleSubmitRegister = async (name : string, phone : string, email : string, password : string) => {
        
        const res = await createNewSeller(name, email, password, phone);

        if(res.message){
            console.log(res)
            setSnackbarMessage(res.message)
            setOpenSnackbar(true)
        }
        if(res.status === 201){
            setUserUUID(res.data._id);
            setUsername(res.data.name);
            setPhone(res.data.phone);
        }
    }
        


    return (
     <>
        {isRegister && userUUID ==='' ? <RegisterPage  onLogin={handleLogin} onSubmit={handleSubmitRegister}/> : null}
        {isLogin && userUUID === '' ? <LoginPage onRegister={handleRegister} onSubmit={handleSubmitLogin}/> : null}
        {userUUID ? <SelerPage userUUID={userUUID} username={username} phone={phone}/> : null}
        <Snackbar
         open={openSnackbar}
         autoHideDuration={6000}
         message={snackbarMessage}
            onClose={() => setOpenSnackbar(false)}
       />

        </>
    )
}




export default MainPage