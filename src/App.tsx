import React from 'react';
import ParamEditor, { Param } from './ParamEditor'

const params: Param[] = [
  {
    id: 1,
    name: 'Назначение',
    type: 'string',
  },
  {
    id: 2,
    name: 'Длина',
    type: 'string',
  },
  {
    id: 3,
    name: 'Работа с числами',
    type: 'number',
  },
];

const model = {
  paramValues: [
    {
      paramId: 1,
      value: 'повседневное',
    },
    {
      paramId: 2,
      value: 'макси',
    },
    {
      paramId: 3,
      value: '123',
    },
  ],
};

function App() {
  return (
    <div>
      <h1>Редактор параметров</h1>
      <ParamEditor params={params} model={model} />
    </div>
  );
}

export default App;