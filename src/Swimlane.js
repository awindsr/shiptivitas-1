import React from 'react';

const Swimlane = ({ name, clients, dragulaRef, getClassName }) => {
  return (
    <div className="Swimlane Swimlane-column" data-status={name.toLowerCase()} ref={dragulaRef}>
      <h2>{name}</h2>
      {clients.map(client => (
        <div
          key={client.id}
          className={`card ${getClassName(client.status)}`}
          data-id={client.id}
        >
          <h3>{client.name}</h3>
          <p>{client.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Swimlane;
