import { Injectable } from '@angular/core';
import { fetchSimple, fetchToken } from '../helpers/fetch';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class MazeService {
  
  constructor() { }

  getMovesList(urlQueryParams?:string) {
    return fetchSimple(`maze`, urlQueryParams, 'GET');
  }

  loadtxtFileMock (filename:string) {
    let file: string[] = [];

    file.push("SOXXXXXXXX");
    file.push("OOOXXXXXXX");
    file.push("OXOOOXOOOO");
    file.push("XXXXOXOXXO");
    file.push("OOOOOOOXXO");
    file.push("OXXOXXXXXO");
    file.push("OOOOXXXXXE");

    return file;
  }

  files: any[] = [];
  loadtxtFile (filename:string) {
    this.files.push("Maze000.txt");

    let textContent : any;
    let file: string[] = [];

    let fr = new FileReader();
    // let textContent = "";
    fr.onload = function () {
        textContent = fr.result;
    }

    // fr.readAsText(this.files[0]);
    // fr.readAsText(this.files[0]);

    return file;
  }

}
