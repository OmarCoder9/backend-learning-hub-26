export interface User {
    id: number,
    username:string,
    email:string,
    password:string,
    role: "user" | "admin"
}

export const users :User[] = [
    {
        id:1,
        username:"Omar",
        email:"omar.ahmed@gmail.com",
        password:"$2b$10$aPTN38xoPdthFPkwskCY5.gWuKPnosgIHzCcaxMVlQPf/WSpK8S8G", //admin123
        role:"admin"
    },
    {
        id:2,
        username:"Ahmed",
        email:"ahmed@gmail.com",
        password:"$2b$10$evFc2Nec1rYL.gh31hCCoehgxTCaLOk17aSz4VU/62Nik1e.eirRG", //user123
        role:"user"
    },
    {
        id:3,
        username:"Sayed",
        email:"sayed@gmail.com",
        password:"$2b$10$NWybMaPC.yLHAS./BA5AhuHhNfGa4QpJM1j5W.a2jYWdRVvNXGRuG", //users1313
        role:"user"
    }
] 