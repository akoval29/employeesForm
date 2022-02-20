import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';

const EmployeesList = ({data}) => {

    const elements = data.map(item => {
        const {id, ...itemProps} = item;
        return (
            // <EmployeesListItem name={item.name} salary={item.salary}/> - хотя Спред помоему более елегантный подход, а именно :
            <EmployeesListItem key={id} {...itemProps}/>
        )
    })

    console.log(elements);

    return (
        <ul className="app-list list-group">
            {elements}
            {/* <EmployeesListItem name="Malcolm Corley" salary={3000} />
            <EmployeesListItem name="Ben" salary={2000} />
            <EmployeesListItem name="Marine Corley" salary={2500} /> */}
        </ul>
    )
}

export default EmployeesList;