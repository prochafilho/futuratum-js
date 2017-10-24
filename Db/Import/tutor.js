var x = function(j){
  this.i = 0;
  this.j = j;
}

x.prototype.getJ = function(){
  return this.j;
}

var x1 = new x(1);
var x2 = new x(2);

console.log(x1.getJ())


var y = function(j, k){
  x.call(this, j)
  //this.j = j;
  this.k = k;
};
y.prototype = Object.create(x.prototype);
//y.prototype.constructor = y;


var y1 = new y(1, 2);
console.log(y1.getJ());
console.log(y1.k);


