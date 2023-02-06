import React, { useState, useEffect } from "react";

const transactions = [
  { customer: "John", date: "02/01/2022", amount: 120 },
  { customer: "John", date: "02/15/2022", amount: 95 },
  { customer: "Jane", date: "02/05/2022", amount: 150 },
  { customer: "Jane", date: "02/20/2022", amount: 75 },
  { customer: "Jane", date: "03/20/2022", amount: 75 },
  { customer: "John", date: "03/20/2022", amount: 189 },
  { customer: "Mike", date: "03/20/2022", amount: 80 },
  { customer: "Mike", date: "02/20/2022", amount: 250 },
  // additional transactions...
];

const App = () => {
  const [rewards, setRewards] = useState({});

  useEffect(() => {
    // calculate rewards for each customer
    const rewardsData = transactions.reduce((acc, curr) => {
      const customer = curr.customer;
      const date = new Date(curr.date);
      const month = date.getMonth();
      const amount = curr.amount;
      const rewardsForTransaction =
        (amount > 100
          ? 2 * (amount - 100) + (amount > 50 ? (amount - 50) : 0)
          : amount > 50
          ? (amount - 50)
          : 0);

      if (!acc[customer]) {
        acc[customer] = {};
      }
      if (!acc[customer][month]) {
        acc[customer][month] = 0;
      }
      acc[customer][month] += rewardsForTransaction;

      return acc;
    }, {});

    setRewards(rewardsData);
  }, [transactions]);

  return (
    <div>
      <h1>Rewards Report</h1>
      {Object.entries(rewards).map(([customer, months]) => (
        <div key={customer}>
          <h2>{customer}</h2>
          {Object.entries(months).map(([month, rewards]) => (
            <div key={month}>
              <p>
                Month: {month}, Rewards: {rewards}
              </p>
            </div>
          ))}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default App;
