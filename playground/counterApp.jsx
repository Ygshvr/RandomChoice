let count = 0;
const onAdd = () => {
  count++;
  renderCount();
};
const onSubtract = () => {
  count--;
  renderCount();
};
const onReset = () => {
  count = 0;
  renderCount();
};

const rootElement = document.getElementById("root");

const renderCount = function() {
  const counterUI = (
    <div>
      <h1>Count : {count}</h1>
      <button onClick={onAdd}>-1</button>
      <button onClick={onSubtract}>+1</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );

  ReactDOM.render(counterUI, rootElement);
};
renderCount();
