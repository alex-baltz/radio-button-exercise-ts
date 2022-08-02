import { ICustomerTypes } from "../types/Appstate";

const RadioGroup = (props: ICustomerTypes) => {
  const { appState, currentState, handleState, menu, title } = props;
  return (
    <>
      <h2>{title}</h2>
      <div className="radio-group">
        {menu.map((category: any) => {
          return (
            <div className="radio-group-content" key={category.id}>
              <label>
                <input
                  type="radio"
                  value={category.id}
                  checked={appState[currentState] === category.id}
                  disabled={category.disabled}
                  onChange={(e) => {
                    handleState(e.target.value);
                  }}
                />
                <span className="radio-label">{category.value}</span>
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RadioGroup;
