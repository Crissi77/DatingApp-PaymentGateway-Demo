export type user = {
    id: string,
    email: string,
    displayName: string,
    imageUrl: string,
    token: string
}

export type LoginCreds = {
    email: string,
    password:string
}

export type RegisterCreds = {
    email: string,
    password:string,
    displayName: string,
}

export type order = {
    id:string,
    amount:number,
    currency:string
}