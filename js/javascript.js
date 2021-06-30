const class1 = ['yasmin', 'isadora', 'benedita', 'brenda', 'luiza', 'fatima', 'caio', 'teresinha', 'hugo', 'zeca', 'catarina', 'emanuel', 'marcelo', 'claudio', 'marina', 'isabela', 'anthony', 'rebeca', 'filipe', 'laís', 'vinicius', 'helena', 'elisa', 'rodrigo', 'geraldo', 'yuri', 'marcio']
const class2 = ['benedita', 'elisa', 'emanuel', 'rodrigo', 'filipe', 'marcio', 'teresinha', 'laís', 'vinicius', 'marina', 'catarina', 'luiza', 'marcelo', 'rebeca', 'hugo', 'geraldo', 'zeca', 'caio', 'anthony', 'yasmin', 'claudio']
const class3 = ['isadora', 'isabela', 'laís', 'claudio', 'catarina', 'zeca', 'teresinha', 'emanuel', 'marcio', 'fatima', 'rodrigo', 'luiza', 'brenda', 'marina', 'marcelo', 'benedita', 'rebeca', 'filipe', 'helena', 'elisa', 'hugo', 'geraldo']
let temporalClase1=[];
let temporalClase2=[];
let temporalClase3=[];
let bandera=false;


let btnInvertir = document.getElementById("invertir"); 
let btnOrdenar  = document.getElementById("ordenar");
let btnSearch   = document.getElementById("buscar");


llenarTabla(class1,"clase1");
llenarTabla(class2,"clase2");
llenarTabla(class3,"clase3");

btnSearch.onclick = function(){
    let element = document.getElementById("element").value;
    let text    = element + " asistio a las clases:";
    let asistencias=0;
    
    if(binarySearch(quicksort(class1),element)){
        text = text + " #1 -";
        console.log("asistio a la clase #1");
        asistencias ++;
    }
    if(binarySearch(quicksort(class2),element)){
        text = text + " #2 -";
        console.log("asistio a la clase #2");
        asistencias ++;
    }
    if(binarySearch(quicksort(class3),element)){
        text = text + " #3 -";
        console.log("asistio a la clase #3");
        asistencias ++;
        
    }
    if (asistencias<1){
        document.getElementById("resultado").value= element + " no asistio a clases";
        console.log();
    }else{
        document.getElementById("resultado").value= text + "\n" +element + " asistio a " + asistencias + " clases";
    }
    
}
btnInvertir.onclick = function(){
    bandera=llenarTablaInvertida(bandera);
} 

btnOrdenar.onclick = function(){
    if(bandera==false){
      temporalClase1 = quicksort(class1);
      temporalClase2 = quicksort(class2);
      temporalClase3 = quicksort(class3);
      llenarTabla(temporalClase1,"clase1");
      llenarTabla(temporalClase2,"clase2");
      llenarTabla(temporalClase3,"clase3");
      bandera=true;  
    }else{
        temporalClase1=copiarArray(quicksort(temporalClase1));
        llenarTabla(temporalClase1,"clase1");
        llenarTabla(temporalClase2,"clase2");
      llenarTabla(temporalClase3,"clase3");  
    }   
}  

function copiarArray(arreglo){
    let copia=[];
    for (i=0;i<arreglo.length;i++){
            copia[i]=arreglo[i];
    } 
    return copia
}

function llenarTablaInvertida(bandera){
    if(bandera==false){
      temporalClase1=invertirArray(copiarArray(class1),[]);
      temporalClase2=invertirArray(copiarArray(class2),[]);
      temporalClase3=invertirArray(copiarArray(class3),[]);
      llenarTabla(temporalClase1,"clase1");
      llenarTabla(temporalClase2,"clase2");
      llenarTabla(temporalClase3,"clase3");
      bandera=true;    
    }else{
        temporalClase1=invertirArray(copiarArray(temporalClase1),[]);
        temporalClase2=invertirArray(copiarArray(temporalClase2),[]);
        temporalClase3=invertirArray(copiarArray(temporalClase3),[]);
        llenarTabla(temporalClase1,"clase1");
        llenarTabla(temporalClase2,"clase2");
        llenarTabla(temporalClase3,"clase3");
         bandera=true;    
    }

    return bandera;
}


function llenarTabla(arreglo,id){
       
    let tbody = document.getElementById(id);
    tbody.innerHTML="";
    arreglo.forEach(function(elemento, index) { //
        let hilera = document.createElement("tr");
        let celda1 = document.createElement("th");
        let celda2 = document.createElement("td");
        celda1.appendChild(document.createTextNode(index+1));
        celda2.appendChild(document.createTextNode(elemento));
        hilera.appendChild(celda1);
        hilera.appendChild(celda2);
        tbody.appendChild(hilera);
    });
}


function invertirArray(array, pila) {
    if (array.length === 0) {//cuando el arreglo se quede vacio retrornara la pila
      return copiarArray(pila)
    }
    pila.push(array.pop())//saca el ultimo elemento del array y lo agrega en la primera posicion de la pila  
    return invertirArray(array, pila)
}

function quicksort(array) {
    if (array.length <= 1) {
      return array;
    }
  
    var pivot = array[0];//variable pivote
    var left = []; //arreglo para guardar elementos a la izquierda
    var right = [];//arreglo para guardar a la derecha
  
    for (var i = 1; i < array.length; i++) {//recorrer el arreglo ordenando los elementos menores que el pivote a la izquierda y los mayores a la derecha
      array[i] < pivot ? left.push(array[i]) : right.push(array[i]);
    }
  
    return quicksort(left).concat(pivot, quicksort(right));//concatenando los arreglos (izquierda,pivote,derecha)
}

function binarySearch (array, element) {
    let min = 0
    let max = array.length - 1
  
    while (min <= max) {
      // Find the middle - Encontrando el medio - Encontrando o meio
      const middle = Math.floor((min + max) / 2)
  
      // Found the element! - Elemento encontrado - Encontrou o elemento
      if (array[middle] === element) {
        return true
      } 
      else if (array[middle] < element) {
        min = middle + 1
      } 
      else {
        max = middle - 1
      }
    }
  
    return false
}