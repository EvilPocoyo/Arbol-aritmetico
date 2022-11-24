//expresion aritmetica
class Nodo{
    constructor(numero){
        this.numero = numero;
        this.izq = null;
        this.der = null;
    }
}

class arbolBinario{
    constructor(){
        this.raiz = null;
    }

    crearArbolBinario(expresion){
        let pila = [];
        for(let i = 0; i < expresion.length; i++){
            let caracter = expresion[i];
            if(caracter === '+' || caracter === '-' || caracter === '*' || caracter === '/'){
                let nodo = new Nodo(caracter);
                nodo.der = pila.pop();
                nodo.izq = pila.pop();
                pila.push(nodo);
            } else {
                let nodo = new Nodo(caracter);
                pila.push(nodo);
            }
        }
        this.raiz = pila.pop();
        return pila;
    }
}

let arbol = new arbolBinario();
console.log(arbol.crearArbolBinario("5+6*7/2"));