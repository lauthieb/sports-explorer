import React, { useState, useEffect } from 'react';
import Graph from "react-graph-vis";

function App() {

  const [graph, setGraph] = useState();

  useEffect(() => {
    fetch('https://sports.api.decathlon.com/sports')
      .then(res => res.json())
      .then(sports => {

        let nodes = [];
        let edges = [];
        
        sports.data.forEach(({id, attributes: {name: label}, relationships: {children, related}}) => {
          nodes = [...nodes, {
            id,
            label,
          }];

          if (!children.data) {
            edges = [...edges, ...children.map(sportChild => ({ from: id, to: sportChild.data.id })), ]
          }

          if (!related.data) {
            edges = [...edges, ...related.map(sportRelated => ({ from: id, to: sportRelated.data.id })), ]
          }
        });

        setGraph({ nodes, edges });
      });
  }, [])

  const options = {
    edges: {
      color: "#000000"
    },
    height: "1000px"
  };

  return graph ? (
    <Graph
      graph={graph}
      options={options}
    />
  ) : 'Loading...';
}

export default App;