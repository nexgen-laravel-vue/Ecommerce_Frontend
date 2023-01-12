import axios from "axios";


export async function login(login_data){
    
    const response= await axios.post('login',login_data)
    return response
    
}

export async function register(post_data){
    const response= await axios.post('register',post_data)
    return response
}


export async function getAllParentCategory() {

    const response =  await axios.get('getAllParentCategory')
    return response

}

export async function getAllBrand() 
{
        const response= await axios.get('getAllBrand')

        return response
}

export async function  getAllPRoductByBrandId(id){

    const response= await axios.get(`getAllPRoductByBrandId/${id}`)

     return response
}

export async function getAllProductByChildCategoryId(id){

    const response= await axios.get(`getAllProductByChildCategoryId/${id}`)

    return response
}

export async function getChildCategoryById(id){
    const response= await axios.get(`getChildCategoryById/${id}`)

    return response
}

export async function getSignleProductById(id){

    const response= await axios.get(`getSignleProductById/${id}`)

    return response

}

export async function getAllProduct(){
    const response= await axios.get(`getAllProduct`)

    return response
}

export async function getAllUser(){
    const response= await axios.get(`getAllUser`)
    return response
}

