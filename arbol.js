//expresion aritmetica
class Nodo {
    constructor(txt) {
        this.txt = txt;
        this.izq = null;
        this.der = null;
    }
}
class arbolBinario {
    constructor() {
        this.raiz = null;
        this.preOrder = '';
        this.posOrder = '';
    }
    crearArbolBinario(expresion) {
        let pila = []
        let aux = [];
        for (let i = expresion.length - 1; i >= 0; i--) {
            let caracter = expresion[i];
            pila = caracter + pila;
            if (this.raiz === null) {
                if (caracter === '+' || caracter === '-') {
                    let nodox = new Nodo(caracter);
                    this.raiz = nodox;
                    aux = pila;
                    pila = []
                }
            }
        }
        aux = Array.from(aux)
        aux = aux.splice(1, aux.length - 1);
        let aux2 = this.crearArbolBinarioREC(aux)
        this.raiz.der = aux2;
        let aux3 = this.crearArbolBinarioREC(Array.from(pila))
        this.raiz.izq = aux3;
        return JSON.stringify(this.raiz, null, 2);
    }
    crearArbolBinarioREC(expresion) {
        let nodox = new Nodo();
        for (let i = expresion.length - 1; i >= 0; i--) {
            if (expresion[i] == "*" || expresion[i] == "/") {
                nodox.txt = expresion[i];
                nodox.izq = expresion[i - 1];
                nodox.der = expresion[i + 1];
                expresion.splice(i - 1, 3, nodox);
                this.crearArbolBinarioREC(expresion);
            }
        }
        let nodox2 = new Nodo();
        for (let i = expresion.length - 1; i >= 0; i--) {
            if (expresion[i] == "+" || expresion[i] == "-") {
                nodox2.txt = expresion[i];
                nodox2.izq = expresion[i - 1];
                nodox2.der = expresion[i + 1];
                expresion.splice(i - 1, 3, nodox2);
                this.crearArbolBinarioREC(expresion);
            }
        }
        return expresion[0];
    }
    preorder() {
        this.preOrder = '';
        if (this.raiz == null) {
            return false;
        } else {
            this._preOrder(this.raiz);
        }
        return this.preOrder;
    }
    _preOrder(nodox) {
        if (nodox == '0') { this.preOrder += "0"; } else if (nodox == "1") {
            this.preOrder += "1";
        } else if (nodox == "2") { this.preOrder += "2"; } else if (nodox == "3") {
            this.preOrder += "3";
        } else if (nodox == "4") { this.preOrder += "4"; } else if (nodox == "5") {
            this.preOrder += "5";
        } else if (nodox == "6") { this.preOrder += "6"; } else if (nodox == "7") {
            this.preOrder += "7";
        } else if (nodox == "8") { this.preOrder += "8"; } else if (nodox == "9") {
            this.preOrder += "9";
        } else { this.preOrder += nodox.txt; }
        if (nodox.izq != null) {
            this._preOrder(nodox.izq);
        }
        if (nodox.der != null) {
            this._preOrder(nodox.der);
        }
    }
    preorderSolucion(expresion) {
        let pila = [];

        for (let i = expresion.length - 1; i >= 0; i--) {
            if (expresion[i] == '+' || expresion[i] == '-' || expresion[i] == '*' || expresion[i] == '/') {
                let der = Number(pila.pop());
                let izq = Number(pila.pop());
                pila.push(this.operacion(expresion[i], der, izq));
            } else {
                pila.push(expresion[i]);
            }
        }
        return pila.pop();

    }
    operacion(op, l, r) {
        let resultado;
        switch (op) {
            case '+':
                resultado = l + r;
                break;
            case '-':
                resultado = l - r;
                break;
            case '*':
                resultado = l * r;
                break;
            case '/':
                resultado = l / r;
                break;
        }
        return resultado;
    }
    posorder() {
        this.posOrder = '';
        if (this.raiz == null) {
            return false;
        } else {
            this._posOrder(this.raiz);
        }
        return this.posOrder;
    }
    _posOrder(nodox) {
        if (nodox.izq != null) {
            this._posOrder(nodox.izq);
        }
        if (nodox.der != null) {
            this._posOrder(nodox.der);
        }
        if (nodox == '0') { this.posOrder += "0"; } else if (nodox == "1") {
            this.posOrder += "1";
        } else if (nodox == "2") { this.posOrder += "2"; } else if (nodox == "3") {
            this.posOrder += "3";
        } else if (nodox == "4") { this.posOrder += "4"; } else if (nodox == "5") {
            this.posOrder += "5";
        } else if (nodox == "6") { this.posOrder += "6"; } else if (nodox == "7") {
            this.posOrder += "7";
        } else if (nodox == "8") { this.posOrder += "8"; } else if (nodox == "9") {
            this.posOrder += "9";
        } else { this.posOrder += nodox.txt; }
    }
    posorderSolucion(expresion) {
        let pila = [];
        for (let i = 0; i < expresion.length; i++) {
            if (expresion[i] == '+' || expresion[i] == '-' || expresion[i] == '*' || expresion[i] == '/') {
                let der = Number(pila.pop());
                let izq = Number(pila.pop());
                pila.push(this.operacion(expresion[i], izq, der));
            } else {
                pila.push(expresion[i]);
            }
        }
        return pila.pop();
    }
}

let arbol = new arbolBinario();
console.log(arbol.crearArbolBinario("2+2+5+6*7/2"));
console.log("Preorder: " + arbol.preorder());
console.log(arbol.preorderSolucion("++2+25*6/72"));
console.log("Posorder:" + arbol.posorder());
console.log(arbol.posorderSolucion("225++672/*+"));