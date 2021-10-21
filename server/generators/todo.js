const amount = 100;
const func = (next) => (create) => {
  const path = 'todo/todoList.json';
  const data = (amount) => {
    const temp = [];
    for (let i = 0; i < amount; i++) {
      temp.push({
        id: i,
        text: `test-${i}`,
      });
    }
    return temp;
  };
  create({ data: { todos: data(amount) }, path });
  next(create);
};

module.exports = func;
