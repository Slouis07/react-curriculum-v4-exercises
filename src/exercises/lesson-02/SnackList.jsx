const SnackList = () => {
  const snacks = [
    { id: 1, name: 'Hot Fries' },
    { id: 2, name: 'Chocolate Chip Cookies' },
    { id: 3, name: 'Gummy Worms' },
  ];

  return (
    <div>
      <h2>My Snacks</h2>
      <ol>
        {snacks.map((snack) => (
          <li key={snack.id}>{snack.name}</li>
        ))}
      </ol>
    </div>
  );
};

export default SnackList;
