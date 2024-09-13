import React from 'react';

const agents = [
  { name: 'Data Cleaner', status: 'Complete', description: 'Cleans and preprocesses the data' },
  { name: 'Data Analyzer', status: 'In Progress', description: 'Performs statistical analysis on the data' },
  { name: 'Visualization Generator', status: 'Pending', description: 'Creates visual representations of the data' },
];

const AgentStatus: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Agent Workflow Status</h2>
      <div className="space-y-4">
        {agents.map((agent, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-4 h-4 rounded-full mr-3 ${
              agent.status === 'Complete' ? 'bg-green-500' :
              agent.status === 'In Progress' ? 'bg-yellow-500' : 'bg-gray-300'
            }`}></div>
            <div>
              <h3 className="font-medium">{agent.name}</h3>
              <p className="text-sm text-gray-500">{agent.description}</p>
              <p className={`text-sm ${
                agent.status === 'Complete' ? 'text-green-500' :
                agent.status === 'In Progress' ? 'text-yellow-500' : 'text-gray-500'
              }`}>{agent.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentStatus;