let start;
let bola = false;
let pausado = false;
let imag,imag1;//imagens
let velocidade;//velocidade
let g = 9.8;//aceleração da gravidade em m/s^2
let distancia = 0;//distância
let tempo = 0; //tempo
let tabela = [];
let aux = 0;
let massa = 0.9;

function preload(){ 
     imag1 = loadImage("fundo.png");
     imag = loadImage("predio1.png");
}

function setup() { 
  createCanvas(800, 600);
 
  //let col = color (200, 190, 0, 50);
  let col = color('Gold');
  table = createElement("table");

  let headerRow = createElement("tr");
  headerRow.html("<th>Tempo de Queda (s)</th><th>Distância Percorrida (m)</th><th>Velocidade Final (m/s)</th>");
  table.child(headerRow);

  let bt1 = createButton("Alternar Queda");
  bt1.addClass("button"); // Aplicando a classe "button" ao botão
  bt1.position(630, 420); 
  bt1.mouseClicked(alternarQueda);


  let pause = createButton("Pause o Objeto");
  pause.addClass("button");
  pause.position(630, 450); 
  pause.mouseClicked(Stop);

  let limp = createButton("Limpar Tabela");
  limp.addClass("button")
  limp.position(630,479);
  limp.mouseClicked(limpar);

  
 let Down = createButton("Download Tabela");
  Down.addClass("button")
  Down.position(630,507);
  Down.mouseClicked( DownloadExcel);
  
  slider = createSlider(0, height,0);
  slider.position(620, 400);
 
}
 

function preenncher_tabela(){
    let row = createElement("tr");
 
    row.html(`<td>${tempo.toFixed(2)}</td><td>${aux.toFixed(2)}</td><td>${velocidade.toFixed(2)}</td>`);
    table.child(row);
}

function draw() { 
  background (imag1);
  let imgaltura = slider.value();

  image(imag,20, imgaltura-21, 254, 700);
   // slider.position(570, height - imagAltura - slider.height - 10);

  // image(imag, 0, 0, imgSize , imgSize);
  //image(imag, 30, height - imagAltura, 254, imagAltura);

 
  if (bola) {
    let massa1=2;
      if(!pausado)  
         
        end = millis();
        tempo = (end - start) / 1000; // tempo decorrido em segundos
      
        distancia =  slider.value() + 0.5 * (g* massa)* tempo **2;
      let distancia1= slider.value() + 0.5 * (g* massa1)* tempo **2;
        aux = +0.5 * (g * massa) * tempo ** 2;
    
        velocidade = (g * massa) * tempo; // velocidade final em m/s

         //distancia =  slider.value() + 0.5 * g * tempo ** 2;//distância percorrida por um objeto em queda livre.
      //  aux = + 0.5 * g * tempo ** 2;
      //  velocidade = g * tempo; // velocidade final em m/s
    
        ellipse(200, distancia, 20, 20);
        ellipse(96, distancia1, 20, 20);
     
    if(distancia > height){  
          bola = false;
    
      }

    // adiciona os dados da simulação ao array da tabela
    if(frameCount % 60 == 0 && !pausado){
      tabela.push([tempo.toFixed(2), aux.toFixed(2), velocidade.toFixed(2)]);
      preenncher_tabela(); 
    }
  }

  // desenha a tabela
  textSize(16);
  text("Tempo (s)  |  Posição (m)  |  Velocidade (m/s)", 290,40);
  for (let i = 0; i < tabela.length; i++) {
      let linha = tabela[i];
     text("\n\n"+linha[0] + "     |     " + linha[1] + "     |   " + linha[2], 620/ 2,30 + i * 30);       
   }
}
function DownloadExcel() {
   function exportToCSV(tableData, filename) {
        let csvContent = "data:text/csv;charset=utf-8,";

        // Cria as linhas do arquivo CSV
        tableData.forEach(row => {
          let csvRow = Array.from(row.cells).map(cell => cell.innerText).join(" | ");
          csvContent += csvRow + "\r\n";
        });

        // Cria o link de download e o adiciona à página
        let encodedUri = encodeURI(csvContent);
        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", filename);
        document.body.appendChild(link);

        // Aciona o clique do link para iniciar o download
        link.click();

        // Remove o link da página
        document.body.removeChild(link);
  }

  let tabela = table.elt.getElementsByTagName("tr"); // Seleciona todas as linhas da tabela

  let novotbela = [];
  for (let i = 1; i < tabela.length; i++) {
    novotbela.push(tabela[i]);
  }

  const filename = "dados.csv"; // Nome do arquivo CSV a ser gerado

  exportToCSV(novotbela, filename);
}


function limpar(){
    
  let rows = table.elt.getElementsByTagName("tr"); // Seleciona todas as linhas da tabela
 
  for (let i = rows.length - 1; i > 0; i--) { // Percorre as linhas, exceto a primeira, e as remove
    table.elt.removeChild(rows[i]);
 
  }
  
  // Remove todos os dados do array da tabela
  tabela = [];
  bola = false;
 
}

function alternarQueda() {
  if(!bola) {
    bola = true;
   start = millis();
    }
}
function Stop(){
  if (!bola){

  }else{
      pausado = !pausado;
    if(!pausado) {
      start = millis() - 1000*tempo;
    }else{
      tabela.push([tempo.toFixed(2), aux.toFixed(2), velocidade.toFixed(2)]);
      preenncher_tabela();
    }
  }
}


