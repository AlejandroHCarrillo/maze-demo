import { Component, OnInit } from '@angular/core';
import { MazeService } from '../../services/maze.service';
import { fileUpload } from "../../helpers/uploadimages";

@Component({
  selector: 'valant-maze-navigator',
  templateUrl: './maze-navigator.component.html',
  styleUrls: ['./maze-navigator.component.less']
})

export class MazeNavigatorComponent implements OnInit {
  moves: string[] = [];
  availableMazes: mazeItem[] = [{name:"Preloaded maze000", isSelected : true, maze:"SOXXXXXXXX\r\nOOOXXXXXXX\r\nOXOOOXOOOO\r\nXXXXOXOXXO\r\nOOOOOOOXXO\r\nOXXOXXXXXO\r\nOOOOXXXXXE" }, 
                                {name:"Preloaded maze001", isSelected : false, maze:"S ████████\r\n   ███████\r\n █   █    \r\n████ █ ██ \r\n       ██ \r\n ██ █████ \r\n    █████E" }];
  selectedMaze: string[][] = [[]];
  titleSelectedMaze: string = "maze001";
  
  constructor(private mazeService: MazeService) { }
    
  ngOnInit(): void {
    this.loadText('file:///C:/repos/maze-demo/apps/demo/src/assets/mazelibrary/maze001.txt');

    console.log("cargar movimientos: ");
    
    this.mazeService.getMovesList()
    .then(async (resp)=>{
      const body = await resp.json();
      this.moves = body;
    })
    .catch((e)=>{
        console.log("error: ", e);            
    });
    
    let sMaze = this.mazeService.loadtxtFileMock(this.titleSelectedMaze);
    // console.log(sMaze);
    
    sMaze.forEach(row => {
      console.log(row);
      let rowArray = this.stringToArray(row);
      this.selectedMaze.push(rowArray);
    });
  }

  handleFileChange(e:any){
    const file = e.target.files[0];
    if ( file ){
      this.startUploading(file);
    }
  }

  startUploading ( file: any ) {
    console.log("File: ", file);
    
    fileUpload(file).then((fileUrl)  => {
      console.log(fileUrl);
    });
  };
  
  stringToArray(inString:string){
    if (inString == undefined) return;
    return inString.split("");
  }

  getFile(event) {
    const input = event.target
    if ('files' in input && input.files.length > 0) {
      this.placeFileContent(input.files[0])
    }
  }

  placeFileContent(file) {
    this.readFileContent(file).then(content => {
      console.log(content);
      let rowsContent = this.stringToRows(content);      
      this.selectedMaze = this.arrRowsToMatrix(rowsContent);
      this.titleSelectedMaze = file.name;
      this.availableMazes.push({name:file.name, isSelected:true, maze: content + "" });
    }).catch(error => console.log(error))
  }

  readFileContent(file) {
    console.log(file);
    
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

  selectMaze(mazeItem:mazeItem){
    console.log("Loading Selected Maze: ", mazeItem);
    this.availableMazes.forEach(x => x.isSelected= false);
    mazeItem.isSelected = true;  
    this.titleSelectedMaze = mazeItem.name;

    this.selectedMaze = this.arrRowsToMatrix(this.stringToRows(mazeItem.maze));

    this.readFileContent(mazeItem.name);
  }

  loadText(url) {
    try {
      let text = fetch(url);
      //awaits for text.text() prop 
      //and then sends it to readText()
      this.readText( text ); 
    } catch (error) {
      console.log(error);
            
    }
  }

  readText(text){
      console.log(text);
  }

  readTextFile(file) {
    // var rawFile = new XMLHttpRequest();
    // rawFile.open("GET", file, false);
    // rawFile.onreadystatechange = function () {
    //   if(rawFile.readyState === 4)  {
    //     if(rawFile.status === 200 || rawFile.status == 0) {
    //       var allText = rawFile.responseText;
    //       console.log(allText);
    //      }
    //   }
    // }
    // rawFile.send(null);
    fetch(file)
      .then((res) => {
        res.text()
      })
      .then((text) => {
        // do something with "text"
        console.log("text: ", text);        
      })
      .catch((e) => console.error(e));
  }
}

interface mazeItem {
  name:string, 
  isSelected: boolean,
  maze?: string 
}