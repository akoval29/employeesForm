import { Component } from "react";
import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

import "./app.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: "Malcolm Corley",
          salary: 1600,
          increase: false,
          rise: true,
          id: 1,
        },
        {
          name: "Mary Corley",
          salary: 700,
          increase: true,
          rise: false,
          id: 2,
        },
        {
          name: "Adrian Reepburger",
          salary: 1100,
          increase: false,
          rise: false,
          id: 3,
        },
        { name: "Ben", salary: 500, increase: false, rise: false, id: 4 },
      ],
      term: "",
      filter: "all",
    };
    this.maxId = 5;
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      // неудобний метод =) створюєм новий масив, де буде копія data без елемента, визначеного індексом, топто того що має бути видаленим
      // const index = data.findIndex(elem => elem.id === id);
      // const before = data.slice(0, index);
      // const after = data.slice(index +1);
      // const newArr = [...before, ...after];
      // return {
      //   data: newArr
      // }

      // удобний метод =)
      return {
        data: data.filter((item) => item.id !== id),
      };
    });
  };

  //Добавить нового сотрудника
  addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      rise: false,
      id: this.maxId++,
    };
    this.setState(({ data }) => {
      if (
        newItem.salary <= 0 ||
        newItem.salary === "" ||
        newItem.name.length <= 2
      ) {
        console.log("Неверные данные");
      } else {
        return {
          data: [...data, newItem],
        };
      }
    });
  };

  // заставляем работать печеньки и звёздочки (ВАРИАНТ 1: ищем индекс нужного элемента, делаем массив из кусков)
  // onToggleIncrease = (id) => {
  //   this.setState(({data}) => {
  //     const index = data.findIndex(elem => elem.id === id);
  //     const old = data[index];
  //     const newItem = {...old, increase: !old.increase};
  //     const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

  //     return {
  //       data: newArr
  //     }
  //   })
  // }

  // onToggleRise = (id) => {
  //   this.setState(({data}) => {
  //     const index = data.findIndex(elem => elem.id === id);
  //     const old = data[index];
  //     const newItem = {...old, rise: !old.rise};
  //     const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

  //     return {
  //       data: newArr
  //     }
  //   })
  // }

  // заставляем работать печеньки и звёздочки (ВАРИАНТ 2 - МАПим, тоесть создаем новый масив с условием и в нем ретурнится тогл)
  // onToggleIncrease = (id) => {
  //   this.setState(({data}) => ({
  //     data: data.map(item => {
  //       if (item.id ===id ) {
  //         return {...item, increase: !item.increase}
  //       }
  //       return item;
  //     })
  //   }))
  // }

  // onToggleRise = (id) => {
  //   this.setState(({data}) => ({
  //     data: data.map(item => {
  //       if (item.id ===id ) {
  //         return {...item, rise: !item.rise}
  //       }
  //       return item;
  //     })
  //   }))
  // }

  //заставляем работать печеньки и звёздочки (ВАРИАНТ 3 - укорачиваем Вариант 2)
  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] };
        }
        return item;
      }),
    }));
  };

  searchEmp = (items, term) => {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return item.name.indexOf(term) > -1;
    });
  };

  onUpdateSearch = (term) => {
    this.setState({ term: term }); //можна так
    // this.setState({term})  укорочений варіант
  };

  filterPost = (items, filter) => {
    switch (filter) {
      case "rise":
        return items.filter((item) => item.rise); //це аналогічно - item => if (item.rise) return ...
      case "zp1000+":
        return items.filter((item) => item.salary > 1000);
      default:
        return items;
    }
  };

  onFilterSelect = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { data, term, filter } = this.state;
    const employees = this.state.data.length;
    const increased = this.state.data.filter((item) => item.increase).length;
    const visibleData = this.filterPost(this.searchEmp(data, term), filter);

    return (
      <div className="app">
        <AppInfo employees={employees} increased={increased} />
        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
        </div>

        <EmployeesList
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
        />

        <EmployeesAddForm onAdd={this.addItem} />
      </div>
    );
  }
}
export default App;
