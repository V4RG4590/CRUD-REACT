import React, { useState, useEffect } from 'react';

function App() {
  const [houses, setHouses] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Fetching house data on component mount
  useEffect(() => {
    fetch('https://644721ab50c25337441ee804.mockapi.io/Students')
      .then((response) => response.json())
      .then((data) => setHouses(data));
  }, []);

  // Handler for name change
  const handleNameChange = (event, id) => {
    const updatedHouses = houses.map((house) => {
      if (house.id === id) {
        return { ...house, name: event.target.value };
      }
      return house;
    });
    setHouses(updatedHouses);
  };

  // Handler for description change
  const handleDescriptionChange = (event, id) => {
    const updatedHouses = houses.map((house) => {
      if (house.id === id) {
        return { ...house, description: event.target.value };
      }
      return house;
    });
    setHouses(updatedHouses);
  };

  // Function to add a new house
  const addHouse = () => {
    const newHouse = {
      name,
      description
    };
    fetch('https://644721ab50c25337441ee804.mockapi.io/Students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newHouse)
    })
      .then((response) => response.json())
      .then((data) => {
        setHouses([...houses, data]);
        setName('');
        setDescription('');
      });
  };

  // Function to update a house
  const updateHouse = (id) => {
    const updatedHouse = houses.find((house) => house.id === id);
    if (updatedHouse) {
      fetch(`https://644721ab50c25337441ee804.mockapi.io/Students/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedHouse)
      })
        .then((response) => response.json())
        .then((data) => {
          const updatedHouses = houses.map((house) => {
            if (house.id === id) {
              return data;
            }
            return house;
          });
          setHouses(updatedHouses);
        });
    }
  };

  // Function to delete a house
  const deleteHouse = (id) => {
    fetch(`https://644721ab50c25337441ee804.mockapi.io/Students/${id}`, {
      method: 'DELETE'
    }).then(() => {
      const updatedHouses = houses.filter((house) => house.id !== id);
      setHouses(updatedHouses);
    });
  };

  return (
    <div>
      <h1>House List</h1>
      <div>
        {/* Input fields for name and description */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
               {/* Add House button */}
               <button onClick={addHouse}>Add House</button>
      </div>
      {/* Displaying the list of houses */}
      {houses.map((house) => (
        <div key={house.id}>
          <div>
            {/* Input field for updating name */}
            <input
              type="text"
              value={house.name}
              onChange={(event) => handleNameChange(event, house.id)}
            />
            {/* Input field for updating description */}
            <input
              type="text"
              value={house.description}
              onChange={(event) => handleDescriptionChange(event, house.id)}
            />
            {/* Update button */}
            <button onClick={() => updateHouse(house.id)}>Update</button>
            {/* Delete button */}
            <button onClick={() => deleteHouse(house.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
