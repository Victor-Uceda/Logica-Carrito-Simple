class Producto {
  
    constructor(nombre, precio, stock){
        
        this._nombre = nombre;
        this._precio = precio;
        this._stock = stock;
    }

 

    get nombre(){
        return this._nombre
    }
    get precio(){
        return this._precio
    }
    get stock(){
        return this._stock
    }

    set stock(stock){
        this._stock = stock;
    }

    toString(){
        return `${this._nombre} | precio:  S/.${this._precio} | stock: ${this._stock}`
    }
}