import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

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

  //событие инпута. передали в сетстейт обьект, изменили стейт.
  commitInputOnChanges = (e, color) => {
    console.log(color);
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
        {/* Первый метод привязки контекста*/}
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
          <input type="text" onChange={(e) => this.commitInputOnChanges(e, 'some color')}/> 
        </form>
        {/* еще варианты = onChange - onClick - onSubmit - onInput */}
        {/* аргументы можна и не передавать, тогда будет:   <input type="text" onChange={this.commitInputOnChange}/>   */}
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {name: 'Malcolm Corley', salary: 600, increase: false, id: 1},
        {name: 'Mary Corley', salary: 700, increase: true, id: 2},
        {name: 'Uncle Tork', salary: 850, increase: false, id: 3},
        {name: 'Ben', salary: 500, increase: false, id: 4},
      ]
    }
    this.maxId = 5;
  }

  deleteItem = (id) => {
    this.setState(({data}) => {

      // неудобний метод =) створюєм новий масив, де буде копія data без елемента, визначеного індексом, топто того що має бути видаленим
      // const index = data.findIndex(elem => elem.id === id);
      // const before = data.slice(0, index);
      // const after = data.slice(index +1);
      // const newArr = [...before, ...after];
      // return {
      //   data: newArr
      // }

      // удобний метод
      return {
        data: data.filter(item => item.id !== id)
      }
    })
  }

  addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      id: this.maxId++
    }
    this.setState(({data}) => {
      const newArr = [...data, newItem];
      return {
        data: newArr
      }
    });
  }

  render() {
    return (
      <div className="app">
        <AppInfo />
  
        <div className="search-panel">
          <SearchPanel/>
          <AppFilter/>
        </div>
        
        <EmployeesList 
          data={this.state.data}
          onDelete={this.deleteItem}/>
        
        <EmployeesAddForm onAdd={this.addItem}/>
        
        <WhoAmI1 name="John" lastname="Smith" link="facebook.com"/>
        <WhoAmI2 name="Vin" lastname="Diesel" link="facebook.com"/>
        <WhoAmI3 name={{firstName: "Part of"}} lastname="Object" link="facebook.com"/>
        <WhoAmI4 name={() => {return "Function here !!!!!"}} lastname="realy!" link="facebook.com"/>
        <WhoAmI5 name="we use classes!!!" lastname="here!!" link="facebook.com"/>
      </div>
    );
  }
};
export default App;