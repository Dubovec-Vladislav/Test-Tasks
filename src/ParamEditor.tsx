import React, { Component } from 'react';

export interface Param {
  id: number;
  name: string;
  type: 'string' | 'number';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  model: Model;
  showModel: boolean; // Добавляем состояние для отображения полной модели
}

class ParamEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      model: { ...props.model },
      showModel: true, // Инициализируем состояние как скрытое
    };
  }

  // Обновить значение параметра в state.model
  updateParamValue = (paramId: number, value: string) => {
    const updatedParamValues = this.state.model.paramValues.map((paramValue) =>
      paramValue.paramId === paramId ? { ...paramValue, value } : paramValue
    );

    this.setState({
      model: {
        ...this.state.model,
        paramValues: updatedParamValues,
      },
    });
  };

  // Получить полную структуру Model
  getModel = (): Model => {
    return { ...this.state.model };
  };

  // Переключить отображение полной структуры Model
  toggleShowModel = () => {
    this.setState((prevState) => ({
      showModel: !prevState.showModel,
    }));
  };

  render() {
    return (
      <div>
        {this.props.params.map((param) => (
          <div key={param.id} style={{marginBottom: '20px'}}>
            <label style={{marginRight: '10px'}}>{param.name}</label>
            <input
              type={param.type}
              value={
                this.state.model.paramValues.find((paramValue) => paramValue.paramId === param.id)?.value || ''
              }
              onChange={(e) => this.updateParamValue(param.id, e.target.value)}
            />
          </div>
        ))}
        <button onClick={this.toggleShowModel}>
          {this.state.showModel ? 'Скрыть полную структуру Model' : 'Показать полную структуру Model'}
        </button>
        {this.state.showModel && (
          <div>
            <h3>Полная структура Model:</h3>
            <pre>{JSON.stringify(this.getModel(), null, 2)}</pre>
          </div>
        )}
      </div>
    );
  }
}

export default ParamEditor;