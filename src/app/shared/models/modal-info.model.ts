export class ModalInfoModel{

    constructor(
        title:string,
        textoBodyModal:string,
    ){
        this.title = title;
        this.textoBodyModal = textoBodyModal;
    }

    title!:string;
    textoBodyModal!:string;
}