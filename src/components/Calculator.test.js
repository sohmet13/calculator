import React from 'react';
import { Calculator } from './Calculator';
import { shallow, configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from "react-dom";

configure({ adapter: new Adapter() });

const inputValueClass = '.Calc__input-value';
const expressionClass = '.Calc__expression';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Calculator />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders 0 at screen at the start', () => {
  const calculator = shallow(<Calculator />);
  expect(calculator.find(inputValueClass).text()).toBe('0');
  expect(calculator.find(expressionClass).text()).toBe('0');
});

describe('method pressNumbers', () => {
  const number8Class = '.Calc__button.Calc__button_SC.Calc__button_SR';
  // saveExpression cases
  it('renders 8 at inputvalue and expression if 0', () => {
    const calculator = shallow(<Calculator />);
    expect(calculator.find(inputValueClass).text()).toBe('0');
    expect(calculator.find(expressionClass).text()).toBe('0');

    calculator.find(number8Class).simulate('click');

    expect(calculator.find(inputValueClass).text()).toBe('8');
    expect(calculator.find(expressionClass).text()).toBe('8');
  });

  it('renders 8 at inputvalue and expression if Digit Limit Met', () => {
    const calculator = shallow(<Calculator />);
    calculator.setState({
      expression: 'Digit Limit Met'
    });
    expect(calculator.find(inputValueClass).text()).toBe('0');
    expect(calculator.find(expressionClass).text()).toBe('Digit Limit Met');

    calculator.find(number8Class).simulate('click');

    expect(calculator.find(inputValueClass).text()).toBe('8');
    expect(calculator.find(expressionClass).text()).toBe('8');
  });

  it('renders 8 at inputvalue and expression if equalSignMatcher', () => {
    const calculator = shallow(<Calculator />);
    calculator.setState({
      inputValue: '68',
      expression: '8+9=68'
    });
    expect(calculator.find(inputValueClass).text()).toBe('68');
    expect(calculator.find(expressionClass).text()).toBe('8+9=68');

    calculator.find(number8Class).simulate('click');

    expect(calculator.find(inputValueClass).text()).toBe('8');
    expect(calculator.find(expressionClass).text()).toBe('8');
  });

  // saveInputValue cases
  it('renders 88 at inputvalue and expression if 8', () => {
    const calculator = shallow(<Calculator />);
    expect(calculator.find(inputValueClass).text()).toBe('0');
    expect(calculator.find(expressionClass).text()).toBe('0');

    calculator.find(number8Class).simulate('click').simulate('click');

    expect(calculator.find(inputValueClass).text()).toBe('88');
    expect(calculator.find(expressionClass).text()).toBe('88');
  });

  it('renders 0.8 at inputvalue and ...0.8 at expression if 0.', () => {
    const calculator = shallow(<Calculator />);
    calculator.setState({
      inputValue: '0.',
      expression: '5+0.'
    });
    expect(calculator.find(inputValueClass).text()).toBe('0.');
    expect(calculator.find(expressionClass).text()).toBe('5+0.');

    calculator.find(number8Class).simulate('click');

    expect(calculator.find(inputValueClass).text()).toBe('0.8');
    expect(calculator.find(expressionClass).text()).toBe('5+0.8');
  });
});

describe('method pressPoint', () => {
  const pointClass = '.Calc__button.Calc__button_TC.Calc__button_FiR';
  it('renders 0. at inputValue and expression+0. at expression if mathSigns at inputValue', () => {
    const calculator = shallow(<Calculator />);
    calculator.setState({
      inputValue: '+',
      expression: '5+'
    });
    expect(calculator.find(inputValueClass).text()).toBe('+');
    expect(calculator.find(expressionClass).text()).toBe('5+');

    calculator.find(pointClass).simulate('click');

    expect(calculator.find(inputValueClass).text()).toBe('0.');
    expect(calculator.find(expressionClass).text()).toBe('5+0.');
  });

  it('renders 0. at inputValue and expression if = at expression', () => {
    const calculator = shallow(<Calculator />);
    calculator.setState({
      inputValue: '56',
      expression: '5+6=56'
    });
    expect(calculator.find(inputValueClass).text()).toBe('56');
    expect(calculator.find(expressionClass).text()).toBe('5+6=56');

    calculator.find(pointClass).simulate('click');

    expect(calculator.find(inputValueClass).text()).toBe('0.');
    expect(calculator.find(expressionClass).text()).toBe('0.');
  });

  it('renders the same at inputValue and expression if they have point already as last sign', () => {
    const calculator = shallow(<Calculator />);
    calculator.setState({
      inputValue: '56.',
      expression: '56.'
    });
    expect(calculator.find(inputValueClass).text()).toBe('56.');
    expect(calculator.find(expressionClass).text()).toBe('56.');

    calculator.find(pointClass).simulate('click');

    expect(calculator.find(inputValueClass).text()).toBe('56.');
    expect(calculator.find(expressionClass).text()).toBe('56.');
  });

  it('renders the same + . at inputValue and expression if not previous conditions', () => {
    const calculator = shallow(<Calculator />);

    expect(calculator.find(inputValueClass).text()).toBe('0');
    expect(calculator.find(expressionClass).text()).toBe('0');

    calculator.find(pointClass).simulate('click');

    expect(calculator.find(inputValueClass).text()).toBe('0.');
    expect(calculator.find(expressionClass).text()).toBe('0.');
  });
});

describe('method pressMathSigns', () => {
  const minusClass = '.Calc__button.Calc__button_FoC.Calc__button_SR';
  it('renders 0 + mathSign at expression if limit', () => {
    const calculator = shallow(<Calculator />);
    calculator.setState({
      expression: 'Digit Limit Met'
    });
    expect(calculator.find(inputValueClass).text()).toBe('0');
    expect(calculator.find(expressionClass).text()).toBe('Digit Limit Met');

    calculator.find(minusClass).simulate('click');

    expect(calculator.find(inputValueClass).text()).toBe('-');
    expect(calculator.find(expressionClass).text()).toBe('0-');
  });

  it('renders result + mathSign at expression if equalSign', () => {
    const calculator = shallow(<Calculator />);
    calculator.setState({
      expression: '56+8=9',
      inputValue: '9'
    });
    expect(calculator.find(inputValueClass).text()).toBe('9');
    expect(calculator.find(expressionClass).text()).toBe('56+8=9');

    calculator.find(minusClass).simulate('click');

    expect(calculator.find(inputValueClass).text()).toBe('-');
    expect(calculator.find(expressionClass).text()).toBe('9-');
  });

  it('change last mathSign at expression if mathSign is last sign', () => {
    const calculator = shallow(<Calculator />);
    calculator.setState({
      inputValue: '+',
      expression: '56+'
    });
    expect(calculator.find(inputValueClass).text()).toBe('+');
    expect(calculator.find(expressionClass).text()).toBe('56+');

    calculator.find(minusClass).simulate('click');

    expect(calculator.find(inputValueClass).text()).toBe('-');
    expect(calculator.find(expressionClass).text()).toBe('56-');
  });

  it('adds mathSign to expression if not previous conditions', () => {
    const calculator = shallow(<Calculator />);
    calculator.setState({
      inputValue: '56',
      expression: '56'
    });
    expect(calculator.find(inputValueClass).text()).toBe('56');
    expect(calculator.find(expressionClass).text()).toBe('56');

    calculator.find(minusClass).simulate('click');

    expect(calculator.find(inputValueClass).text()).toBe('-');
    expect(calculator.find(expressionClass).text()).toBe('56-');
  });
});

describe('method pressEqualSign', () => {
  const equalSignClass = '.Calc__button.Calc__button_right';
  it('renders result at expression and inputValue', () => {
    const calculator = shallow(<Calculator />);
    calculator.setState({
      inputValue: '8',
      expression: '50+8'
    });
    expect(calculator.find(inputValueClass).text()).toBe('8');
    expect(calculator.find(expressionClass).text()).toBe('50+8');

    calculator.find(equalSignClass).simulate('click');

    expect(calculator.find(inputValueClass).text()).toBe('58');
    expect(calculator.find(expressionClass).text()).toBe('50+8=58');
  });

  it('renders nothing if mathSign is last sign', () => {
    const calculator = shallow(<Calculator />);
    calculator.setState({
      inputValue: '+',
      expression: '50+8+'
    });
    expect(calculator.find(inputValueClass).text()).toBe('+');
    expect(calculator.find(expressionClass).text()).toBe('50+8+');

    calculator.find(equalSignClass).simulate('click');

    expect(calculator.find(inputValueClass).text()).toBe('+');
    expect(calculator.find(expressionClass).text()).toBe('50+8+');
  });
});

describe('method reset', () => {
  const resetClass = '.Calc__button.Calc__button_red.Calc__button_FC.Calc__button_FR';
  it('renders 0', () => {
    const calculator = shallow(<Calculator />);
    calculator.setState({
      inputValue: '+',
      expression: '50+8+'
    });
    expect(calculator.find(inputValueClass).text()).toBe('+');
    expect(calculator.find(expressionClass).text()).toBe('50+8+');

    calculator.find(resetClass).simulate('click');

    expect(calculator.find(inputValueClass).text()).toBe('0');
    expect(calculator.find(expressionClass).text()).toBe('0');
  });
});

describe('method deleteLast', () => {
  const deleteLastClass = '.Calc__button.Calc__button_red.Calc__button_SC.Calc__button_FR';
  it('calls reset method if equalSign', () => {
    const calculator = shallow(<Calculator />);
    calculator.setState({
      inputValue: '96',
      expression: '50+8=96'
    });
    expect(calculator.find(inputValueClass).text()).toBe('96');
    expect(calculator.find(expressionClass).text()).toBe('50+8=96');

    calculator.find(deleteLastClass).simulate('click');

    expect(calculator.find(inputValueClass).text()).toBe('0');
    expect(calculator.find(expressionClass).text()).toBe('0');
  });

  it('deletes last meaningfull value in expression', () => {
    const calculator = shallow(<Calculator />);
    calculator.setState({
      inputValue: '98',
      expression: '5+8.6/0.7*98'
    });
    expect(calculator.find(inputValueClass).text()).toBe('98');
    expect(calculator.find(expressionClass).text()).toBe('5+8.6/0.7*98');

    calculator.find(deleteLastClass).simulate('click');

    expect(calculator.find(inputValueClass).text()).toBe('*');
    expect(calculator.find(expressionClass).text()).toBe('5+8.6/0.7*');

    calculator.find(deleteLastClass).simulate('click');

    expect(calculator.find(inputValueClass).text()).toBe('0.7');
    expect(calculator.find(expressionClass).text()).toBe('5+8.6/0.7');

    calculator.find(deleteLastClass).simulate('click');

    expect(calculator.find(inputValueClass).text()).toBe('/');
    expect(calculator.find(expressionClass).text()).toBe('5+8.6/');

    calculator.find(deleteLastClass).simulate('click');

    expect(calculator.find(inputValueClass).text()).toBe('8.6');
    expect(calculator.find(expressionClass).text()).toBe('5+8.6');

    calculator.find(deleteLastClass).simulate('click');

    expect(calculator.find(inputValueClass).text()).toBe('+');
    expect(calculator.find(expressionClass).text()).toBe('5+');

    calculator.find(deleteLastClass).simulate('click');

    expect(calculator.find(inputValueClass).text()).toBe('5');
    expect(calculator.find(expressionClass).text()).toBe('5');

    calculator.find(deleteLastClass).simulate('click');

    expect(calculator.find(inputValueClass).text()).toBe('0');
    expect(calculator.find(expressionClass).text()).toBe('0');
  });
});


describe('method checkLimit', () => {
  const buttonClass = '.Calc__button.Calc__button_FC.Calc__button_TR';
  it('renders 0 and limit if inputValue.length > 9', () => {
    const calculator = shallow(<Calculator />);
    calculator.setState({
      inputValue: '123456789',
      expression: '123456789'
    });
    expect(calculator.find(inputValueClass).text()).toBe('123456789');
    expect(calculator.find(expressionClass).text()).toBe('123456789');

    calculator.find(buttonClass).simulate('click');

    expect(calculator.find(inputValueClass).text()).toBe('0');
    expect(calculator.find(expressionClass).text()).toBe('Digit Limit Met');
  });

  it('renders 0 and limit if expression.length > 25', () => {
    const calculator = shallow(<Calculator />);
    calculator.setState({
      inputValue: '12345',
      expression: '123456789+123456789+12345'
    });
    expect(calculator.find(inputValueClass).text()).toBe('12345');
    expect(calculator.find(expressionClass).text()).toBe('123456789+123456789+12345');

    calculator.find(buttonClass).simulate('click');

    expect(calculator.find(inputValueClass).text()).toBe('0');
    expect(calculator.find(expressionClass).text()).toBe('Digit Limit Met');
  });
});