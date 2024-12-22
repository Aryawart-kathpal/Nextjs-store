'use server' // very important**
import db from '@/utils/db';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { imageSchema, productSchema, validateWithZodSchema } from './schema';
import { deleteImage, uploadImage } from './supabase';
import { revalidatePath } from 'next/cache';

const getAuthUser = async()=>{
    const user = await currentUser();
    if(!user) redirect('/');
    return user;
}

// although there is check in the middleware, but just an extra check
const getAdminUser = async()=>{
    const user = await getAuthUser();
    if(user.id!==process.env.ADMIN_USER_ID) redirect('/');
}

const renderError =(error:unknown):{message:string}=>{
    console.log(error);
    return{
        message : error instanceof Error?error.message : 'an error occurred',
    }
}

export const fetchFeaturedProducts = async()=>{
    const products = await db.product.findMany({
        where:{
            featured:true,
        },
        // select:{ -> to have only the name returned if reqd
        //     name:true,
        // }
    });
    return products;
};

export const fetchAllProducts = ({search=''}:{search:string})=>{
    return db.product.findMany({
        where:{
            OR:[
                {name:{contains:search,mode:'insensitive'}},
                {company:{contains:search,mode:'insensitive'}}
            ]
        },
        orderBy:{
            createdAt:'desc',
        },
    });
};

export const fetchSingleProduct = async(productId :string)=>{
    const product = await db.product.findUnique({
        where : {
            id:productId,
        },
    });
    if(!product) redirect('/products');
    return product;
}

export const createProductAction = async(prevState:any,formData:FormData):Promise<{message:string}> =>{
    const user = await getAuthUser();

    try {
        const rawData=Object.fromEntries(formData);
        const file = formData.get('image') as File;
        // const validatedFields = productSchema.parse(rawData); -> it throws the error itself
        // const validatedFields = productSchema.safeParse(rawData);// we get error as object with a message

        const validateFields = validateWithZodSchema(productSchema,rawData);
        const validatedFile = validateWithZodSchema(imageSchema,{image:file});
        const fullPath = await uploadImage(validatedFile.image)

       await db.product.create({
        data:{
            ...validateFields,image:fullPath,clerkId:user.id
        }
       })

        // return {message : 'product created'};
    } catch (error) {
        return renderError(error);
    }
    redirect('/admin/products');
}

export const fetchAdminProducts = async()=>{
    await getAdminUser(); //extra check

    const products = await db.product.findMany({
        orderBy:{
            createdAt:'desc',
        },
    });
    return products;
}

export const deleteProductAction = async(prevState:{productId:string})=>{
    const {productId} = prevState;
    await getAdminUser();

    try {
        const product=await db.product.delete({
            where:{
                id:productId,
            },
        });
        await deleteImage(product.image);
        revalidatePath('/admin/products');
        return {message:'product removed'};
    } catch (error){
        return renderError(error);
    }
}

export const fetchAdminProductDetails = async(productId:string)=>{
    await getAdminUser();
    const product = await db.product.findUnique({
        where:{
            id:productId,
        },
    });
    if(!product) redirect('/admin/products');
    return product;
}

export const updateProductAction = async(prevState:any,formData:FormData)=>{

    await getAdminUser();
    try {
        const productId = formData.get('id') as string;
        const rawData = Object.fromEntries(formData);
        const validatedFields=validateWithZodSchema(productSchema,rawData);

        await db.product.update({
           where:{
            id:productId,
           },
           data:{
            ...validatedFields,
           }, 
        });

        revalidatePath(`/admin/products/${productId}/edit`);

        return {message : 'Product updated successfully'};
    } catch (error) {
        return renderError(error);
    }
        
}

export const updateProductImageAction = async(prevState:any,formData:FormData)=>{

    await getAuthUser();

    try {
        const image = formData.get('image') as File;
        const productId = formData.get('id') as string;
        const oldImageUrl = formData.get('url') as string;

        const validatedFile = validateWithZodSchema(imageSchema,{image});
        const fullPath = await uploadImage(validatedFile.image);

        await deleteImage(oldImageUrl);
        await db.product.update({
            where:{
                id:productId,
            },
            data:{
                image:fullPath,
            },
        });

        revalidatePath(`/admin/products/${productId}/edit`);
        
        return {message : 'Product Image updated successfully'};
    } catch (error) {
        return renderError(error);
    }

}