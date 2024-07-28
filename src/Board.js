import React, { useState, useRef, useEffect } from "react";
import Dragula from "dragula";
import "dragula/dist/dragula.css";
import Swimlane from "./Swimlane";
import "./Board.css";

// Utility function to get clients
const getClients = () => [
  ["1", "Stark, White and Abbott", "Cloned Optimal Architecture", "backlog"],
  ["2", "Wiza LLC", "Exclusive Bandwidth-Monitored Implementation", "backlog"],
  ["3", "Nolan LLC", "Vision-Oriented 4Thgeneration Graphicaluserinterface", "backlog"],
  ["4", "Thompson PLC", "Streamlined Regional Knowledgeuser", "backlog"],
  ["5", "Walker-Williamson", "Team-Oriented 6Thgeneration Matrix", "backlog"],
  ["6", "Boehm and Sons", "Automated Systematic Paradigm", "backlog"],
  ["7", "Runolfsson, Hegmann and Block", "Integrated Transitional Strategy", "backlog"],
  ["8", "Schumm-Labadie", "Operative Heuristic Challenge", "backlog"],
  ["9", "Kohler Group", "Re-Contextualized Multi-Tasking Attitude", "backlog"],
  ["10", "Romaguera Inc", "Managed Foreground Toolset", "backlog"],
  ["11", "Reilly-King", "Future-Proofed Interactive Toolset", "backlog"],
  ["12", "Emard, Champlin and Runolfsdottir", "Devolved Needs-Based Capability", "backlog"],
  ["13", "Fritsch, Cronin and Wolff", "Open-Source 3Rdgeneration Website", "backlog"],
  ["14", "Borer LLC", "Profit-Focused Incremental Orchestration", "backlog"],
  ["15", "Emmerich-Ankunding", "User-Centric Stable Extranet", "backlog"],
  ["16", "Willms-Abbott", "Progressive Bandwidth-Monitored Access", "backlog"],
  ["17", "Brekke PLC", "Intuitive User-Facing Customerloyalty", "backlog"],
  ["18", "Bins, Toy and Klocko", "Integrated Assymetric Software", "backlog"],
  ["19", "Hodkiewicz-Hayes", "Programmable Systematic Securedline", "backlog"],
  ["20", "Murphy, Lang and Ferry", "Organized Explicit Access", "backlog"],
].map(([id, name, description, status]) => ({ id, name, description, status }));

// Utility function to get class name based on status

const getClassName = (status) => {
  const normalizedStatus = status.replace(/ /g, '-').toLowerCase();
  switch (normalizedStatus) {
    case "backlog":
      return "Card-grey";
    case "in-progress":
      return "Card-blue";
    case "complete":
      return "Card-green";
    default:
      return "Card";
  }
};

const Board = () => {
  const [clients, setClients] = useState({
    backlog: [],
    inProgress: [],
    complete: [],
  });

  const swimlanes = {
    backlog: useRef(),
    inProgress: useRef(),
    complete: useRef(),
  };

  useEffect(() => {
    const clientData = getClients();
    setClients({
      backlog: clientData.filter(client => client.status === 'backlog'),
      inProgress: clientData.filter(client => client.status === 'in-progress'),
      complete: clientData.filter(client => client.status === 'complete'),
    });
  
    const containers = Object.values(swimlanes).map(ref => ref.current);
  
    const drake = Dragula(containers, {
      moves: (el, container, handle) => true,
      accepts: (el, target) => true,
    });
  
    drake.on("drop", (el, target) => {
      const clientId = el.dataset.id;
      const newStatus = target.dataset.status;
  
      setClients(prevClients => {
        const updatedClients = {
          backlog: [],
          inProgress: [],
          complete: []
        };
  
        Object.keys(prevClients).forEach(key => {
          updatedClients[key] = prevClients[key].map(client =>
            client.id === clientId ? { ...client, status: newStatus } : client
          );
        });
  
        return updatedClients;
      });
  
      // Update the class name based on the new status
      el.className = `card ${getClassName(newStatus)}`;
    });
  
    return () => {
      drake.destroy();
    };
  }, []);
  

  const renderSwimlane = (name, clients, ref) => (
    <Swimlane name={name} clients={clients} dragulaRef={ref} getClassName={getClassName} />
  );

  return (
    <div className="Board">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            {renderSwimlane("Backlog", clients.backlog, swimlanes.backlog)}
          </div>
          <div className="col-md-4">
            {renderSwimlane("In Progress", clients.inProgress, swimlanes.inProgress)}
          </div>
          <div className="col-md-4">
            {renderSwimlane("Complete", clients.complete, swimlanes.complete)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
