import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import { Component } from 'react';

import './app.css';

// Передача аргументів - Варіант № 1
function WhoAmI1 (props) {
  return (
    <div>
      <h1>My name is {props.name}, lastname - {props.lastname}</h1>
      <a href={props.link}>My profile</a>
    </div>
  )
}

// Передача аргументів - Варіант № 2 - деструктуризація
function WhoAmI2 ({name, lastname, link}) {
  return (
    <div>
      <h1>My name is {name}, lastname - {lastname}</h1>
      <a href={link}>My profile</a>
    </div>
  )
}

// Передача аргументів - Варіант № 3 - передали СВОЙСТВО ОБЄКТА
function WhoAmI3 ({name, lastname, link}) {
  return (
    <div>
      <h1>My name is {name.firstName}, lastname - {lastname}</h1>
      <a href={link}>My profile</a>
    </div>
  )
}

// Передача аргументів - Варіант № 4 - передали ФУНКЦІЮ
function WhoAmI4 ({name, lastname, link}) {
  return (
    <div>
      <h1>My name is {name()}, lastname - {lastname}</h1>
      <a href={link}>My profile</a>
    </div>
  )
}

// Класи
class WhoAmI5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      years: 27,
      textPlus: "Plus 1",
      textMinus: "Minus 1",
      pos: "",
    }
    this.nextYear2 = this.nextYear2.bind(this);  //второй метод привязки контекста
  }

// setState - запускает перерисовку компонента
  nextYear = () => {
    this.setState({
      years: this.state.years +1
    })
  }

  // setState - запускает перерисовку компонента - второй и третий метод превязки контекста (разница в рендер-ретурне)
  nextYear2() {
    this.setState(state => ({
      years: this.state.years +1
    }))
  }

// а такой вариант для случаев когда надо подождать асинхрон от "какой-то" предыдущей операции над ЭТИМ стейтом
  prefYear = () => {
    this.setState(state => ({
      years: state.years -1
    }))
  }

  commitInputOnChange = (e, color) => {
    console.log(color)
    console.log(e.target);
    console.log(e.target.value);
    this.setState({
      pos: e.target.value
    })
  }

  render() {
    const {name, lastname, link} = this.props;
    const {years, pos}= this.state;
    return (
      <div>
        {/* Первый метод */}
        <button onClick={this.nextYear} >{this.state.textPlus}</button>
        <button onClick={this.prefYear} >{this.state.textMinus}</button>
        
        {/* Второй метод */}
        <button onClick={this.nextYear2} >{this.state.textPlus}</button>
        
        {/* Третий метод */}
        <button onClick={() => this.nextYear2()} >{this.state.textPlus}</button>


        <h1>My name is {name}, 
        lastname - {lastname}, 
        age - {years}, 
        input - {pos}</h1>

        <a href={link}>My profile</a>
        
        <form>
          <span>Введите должность</span>
          <input type="text" onChange={(e) => this.commitInputOnChange(e, 'some color')}/> 
        </form>
        {/* еще варианты = onChange - onClick - onSubmit - onInput */}
        {/* аргументы можна и не передавать, тогда будет:   <input type="text" onChange={this.commitInputOnChange}/>   */}
      </div>
    )
  }
}

function App() {

  const data = [
    {name: 'Malcolm Corley', salary: 600, increase: false, id: 1},
    {name: 'Mary Corley', salary: 700, increase: true, id: 2},
    {name: 'Uncle Tork', salary: 850, increase: false, id: 3},
    {name: 'Ben', salary: 500, increase: false, id: 4},
    {name: 'Reepburger', salary: 50, increase: false, id: 5},
  ];

  return (
    <div className="app">
      <AppInfo />

      <div className="search-panel">
        <SearchPanel/>
        <AppFilter/>
      </div>
      
      <EmployeesList data={data}/>
      
      <EmployeesAddForm/>
      
      <WhoAmI1 name="John" lastname="Smith" link="facebook.com"/>
      <WhoAmI2 name="Vin" lastname="Diesel" link="facebook.com"/>
      <WhoAmI3 name={{firstName: "Part of"}} lastname="Object" link="facebook.com"/>
      <WhoAmI4 name={() => {return "Function here !!!!!"}} lastname="realy!" link="facebook.com"/>
      <WhoAmI5 name="we use classes!!!" lastname="here!!" link="facebook.com"/>
    </div>
  );
}

export default App;