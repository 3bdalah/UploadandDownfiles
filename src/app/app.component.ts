import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { ButtonModule } from 'primeng/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'upload and download';
  inputData:string =  "";
  uploadFileNames :string[] = [];
  fileUrl = 'https://api.escuelajs.co/api/v1/files/';
  constructor(private http:HttpClient){
    
  }

  uploadImage(e : any){
   const file = e.currentTarget.files[0];

   if(file.type === "image/png" && file.size <2000000){
    const formObject = new FormData();
    formObject.append("file",file);
    this.http.post(`${this.fileUrl}upload`,formObject).subscribe((res:any)=>{
     this.uploadFileNames.push(res.filename);
    
    })
   }
   this.inputData = '';
  }

  downloadFile(fileName:string){
    const downFile = this.fileUrl + fileName;
    this.http.get(downFile,{responseType:'blob'}).subscribe((res:Blob)=>{
     const blob = new Blob([res],{type:res.type});
     const url = window.URL.createObjectURL(blob);
     const a = document.createElement("a");
     a.href  = url;
    })

  }
}
