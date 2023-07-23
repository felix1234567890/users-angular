import {diff} from 'deep-diff'
interface Person {
    name:string
    surname: string
}

const per1 :Person = {
    name:'Frane',
    surname:'Lukin'
}

const per2 :Person = {
    name:'Hrvoje',
    surname:'Lukin'
}
console.log(diff(per1, per2))