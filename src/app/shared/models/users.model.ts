export class UserModel {
    
    constructor(
        _id:string,
        nombre:string,
        apellido:string,
        email:string,
        password:string,
        rol:string
    ){
        this._id = _id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        this.rol = rol;
    }

    _id!:string;
    nombre!:string;
    apellido!:string;
    email!:string;
    password!:string;
    rol!:string;
}