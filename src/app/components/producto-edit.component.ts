import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';
import { GLOBAL } from '../services/global';

@Component({
  selector: 'producto-edit',
  templateUrl: '../views/producto-add.html',
  providers: [ProductoService]
})
export class ProductoEditComponent{
  public titulo: string;
  public producto: Producto;
  public filesToUpload;
  public resultUpload;
  public is_edit;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _productoService: ProductoService
  ){
    this.titulo = 'Editar Producto';
    this.producto = new Producto(0,'','',0,'');
    this.is_edit = true;
  }
  ngOnInit(){
    this.getProducto();
  }
  getProducto(){
    this._route.params.forEach((params:Params)=>{
      let id = params['id'];
      this._productoService.getProducto(id).subscribe(
        response => {
            if(response.code==200){
              this.producto = response.data;
            }else{
              this._router.navigate(['/productos']);
            }
        },
        error=>{
          console.log(<any>error);
        }
      );
    });
  }

  onSubmit(){

    if(this.filesToUpload && this.filesToUpload.length >= 1 ){
      this._productoService.makeFileRequest(GLOBAL.url+'upload-file',[], this.filesToUpload).then((result)=>{
        console.log(result);
        this.resultUpload = result;
        this.producto.imagen = this.resultUpload.filename;
        this.updateProducto();
      },(error) =>{
        console.log(error);
      });
    }else{
      this.updateProducto();
    }
  }
  updateProducto(){
    this._route.params.forEach((params:Params)=>{
      let id = params['id'];
        this._productoService.editProducto(id, this.producto).subscribe(
          response => {
            if(response.code==200){
              this._router.navigate(['/producto/', id]);
            }
          },
          error =>{
            console.log('response')
          }
        )
      });
      }

  fileChangeEvent(fileInput: any){
    //detecta el cambio del archivo imput
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }
}