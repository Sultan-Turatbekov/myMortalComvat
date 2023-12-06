class Person {
  constructor(name, lastname, age, activity){
    this.name = name;
    this.lastname = lastname;
    this.age = age;
    this.activity = activity;
  }
  getFullObj (){
    return {
      name, lastname, age, activity
    }
  }
  consoledThis () {
    console.log(this)
  }
  sayHello(){
    console.log(`Hello. My name is ${this.name} ${this.lastname}. I'm ${this.age} years old. I'm is ${this.activity}`)
  }
}

class newPerson extends Person{
  constructor(name, lastname, job, activity, isMarried){
    super(name, lastname);
    this.job = job;
    this.isMarried = isMarried;
  }
  sayHello () {
    console.log(`Hello. My name is ${this.name} ${this.lastname}. I'm ${this.age} years old. ${this.isMarried ? "I'm have a wife": "I'm alone"}`)
  }
}

const Jack = new Person('Jack', "Nicolson", 15, "actor");
const Adil = new Person('Adil', "Maidanbekov", 22, "developer");
const Marat = new newPerson("Marat", "Alibekovich", 22, "mechanic", false)

Adil.sayHello();
Marat.sayHello();

Adil.consoledThis();
Marat.consoledThis();


function checkGretings18 (age) {
  if (this.age > 18) {
    console.log("I'm older 18")
  }else{
    console.log("I'm under 18")
  }
}

checkGretings18.call(Jack,this.age)