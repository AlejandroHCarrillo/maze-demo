import { Component, OnInit } from '@angular/core';
import { MazeService } from '../../services/maze.service';
import { ValantDemoApiClient } from '../../api-client/api-client';
import { fileUpload } from "../../helpers/uploadimages";

@Component({
  selector: 'valant-maze-navigator',
  templateUrl: './maze-navigator.component.html',
  styleUrls: ['./maze-navigator.component.less']
})

export class MazeNavigatorComponent implements OnInit {
  moves: string[] = [];
  availableMazes: string[] = ["maze000", "maxe001"];
  selectedMaze: string[][] = [[]];
  
  constructor(private mazeService: MazeService) { }
  
  
  ngOnInit(): void {
    let vClient = ValantDemoApiClient.Client;

    var mMaze = vClient.length;
    console.log("vClient: ", vClient);

    console.log("cargar movimientos: ");
    
    this.mazeService.getMovesList()
    .then(async (resp)=>{
      const body = await resp.json();
      this.moves = body;
    })
    .catch((e)=>{
        console.log("error: ", e);            
    });

    let sMaze = this.mazeService.loadtxtFileMock("maze001");
    // console.log(sMaze);
    
    sMaze.forEach(row => {
      console.log(row);
      let rowArray = this.stringToArray(row);
      this.selectedMaze.push(rowArray);
    });
  }

  handleFileChange(e:any){
    // console.log("handleFileChange...");
    const file = e.target.files[0];
    if ( file ){
      this.startUploading(file);
    }
  }

  startUploading ( file: any ) {
    console.log("File: ", file);
    
    fileUpload(file).then((fileUrl)  => {
      console.log(fileUrl);
      // this.alumno.img = fileUrl;
      // this.form.value.img = fileUrl;
      // this.updateAlumno();
    });
  };
  

  stringToArray(inString:string){
    if (inString == undefined) return;
    return inString.split("");
  }

  getFile(event) {
    const input = event.target
    if ('files' in input && input.files.length > 0) {
      // this.placeFileContent(document.getElementById('content-target'), input.files[0])
      this.placeFileContent(input.files[0])
    }
  }

  placeFileContent(file) {
    this.readFileContent(file).then(content => {
      console.log(content);
      let rowsContent = this.stringToRows(content);      
      // target.value = content
      // this.selectedMaze = content;
      this.selectedMaze = this.arrRowsToMatrix(rowsContent);
    }).catch(error => console.log(error))
  }

    // placeFileContent(target, file) {
  //   this.readFileContent(file).then(content => {
  //     console.log(content);
  //     let rowsContent = this.stringToRows(content);      
  //     target.value = content
  //     // this.selectedMaze = content;
  //     this.selectedMaze = this.arrRowsToMatrix(rowsContent);
  //   }).catch(error => console.log(error))
  // }

  readFileContent(file) {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {
      reader.onload = event => resolve(event.target.result)
      reader.onerror = error => reject(error)
      reader.readAsText(file)
    })
  }

  stringToRows(strMaze : any){
    let arrRows = strMaze.split("\n");
    return arrRows
  }

  arrRowsToMatrix(arr: string[]){
    let mazetrix : string[][] = [[]];

    arr.forEach(row => {
      console.log(row);
      let rowArray = this.stringToArray(row.replace("\r", "") );
      mazetrix.push(rowArray);
    });
    return mazetrix;
  }
}
