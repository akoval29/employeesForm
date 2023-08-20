import "./app-filter.css";

const AppFilter = (props) => {
  const buttonsData = [
    { name: "all", label: "Всі працівника", colored: false },
    { name: "rise", label: "На підвищення", colored: false },
    { name: "zp1000+", label: "З/П більше 1000$", colored: true },
  ];

  const buttons = buttonsData.map(({ name, label, colored }) => {
    const active = props.filter === name; //такий вираз поверне нам в active - true або false
    const clazz = active ? "btn-light" : `btn btn-outline-light`;
    const style = colored ? { color: "red" } : null;
    return (
      <button
        type="button"
        className={`btn ${clazz}`}
        key={name}
        onClick={() => props.onFilterSelect(name)}
        style={style}
      >
        {label}
      </button>
    );
  });

  return <div className="btn-group">{buttons}</div>;
};

export default AppFilter;
