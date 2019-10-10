import React, { Component } from 'react';
import './Calculator.scss';

export class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 'Digit Limit Met',
            equalSign: /[=]/g,
            inputValue: '0',
            expression: '0'
        }
    }

    pressNumbers(num) {
        //проверяем что в заголовке не 0 и в строке выражения, не математические знаки и это не законченное выражение
        const inputValue = (this.state.inputValue ==='0' && (this.state.expression==='0' || this.state.expression===this.state.limit)) ||
            this.state.inputValue.match(/[/*+]|-/) || this.state.expression.match(this.state.equalSign)
            ? num : this.state.inputValue + num;
        //проверяем что в строке выражения не ноль, не превышение длины строки и не законченное выражение
        const expression = ([this.state.limit, '0'].includes(this.state.expression) || this.state.expression.match(this.state.equalSign) ?
            '' : this.state.expression) + num;
        this.setState({expression, inputValue});
    }

    pressPoint(point) {
        this.setState({
            expression: this.state.expression + point,
            inputValue: this.state.inputValue + point
        });
        console.log(this.state.inputValue, this.state.inputValue.match(/[.]/g));
        //одноточие
        if (this.state.inputValue.match(/[.]/g).length>1) {
            this.setState({
                expression: this.state.expression.slice(0, -1),
                inputValue: this.state.inputValue.slice(0, -1)
            });
        } else if (this.state.inputValue.match(/[/*+]|-/g)) {
            this.setState({
                expression: this.state.expression.slice(0, -1) + '0' + point,
                inputValue: '0' + point
            });
        }
        if (this.state.expression.match(this.state.equalSign)) {
            this.setState({
                expression: '0' + point,
                inputValue: '0' + point
            });
        }
    }

    render() {
        return (
            <div className='Calc'>
                <h1 className="Calc__title">ELECTRONIC CALCULATOR</h1>
                <div className='Screen'>
                    <div className='Screen__text Screen__input-value'>{this.state.inputValue}</div>
                    <div className='Screen__text Screen__expression'>{this.state.expression}</div>
                </div>
                <div className='Calc__buttons'>
                    <div className='Calc__button Calc__button_red Calc__button_FC Calc__button_FR'>AC</div>
                    <div className='Calc__button Calc__button_red Calc__button_SC Calc__button_FR'>CE</div>
                    <div className='Calc__button Calc__button_TC Calc__button_FR'>/</div>
                    <div className='Calc__button Calc__button_FoC Calc__button_FR'>*</div>
                    <div className='Calc__button Calc__button_FC Calc__button_SR' onClick={this.pressNumbers.bind(this, '7')}>7</div>
                    <div className='Calc__button Calc__button_SC Calc__button_SR' onClick={this.pressNumbers.bind(this, '8')}>8</div>
                    <div className='Calc__button Calc__button_TC Calc__button_SR' onClick={this.pressNumbers.bind(this, '9')}>9</div>
                    <div className='Calc__button Calc__button_FoC Calc__button_SR'>-</div>
                    <div className='Calc__button Calc__button_FC Calc__button_TR' onClick={this.pressNumbers.bind(this, '4')}>4</div>
                    <div className='Calc__button Calc__button_SC Calc__button_TR' onClick={this.pressNumbers.bind(this, '5')}>5</div>
                    <div className='Calc__button Calc__button_TC Calc__button_TR' onClick={this.pressNumbers.bind(this, '6')}>6</div>
                    <div className='Calc__button Calc__button_FoC Calc__button_TR'>+</div>
                    <div className='Calc__button Calc__button_FC Calc__button_FoR' onClick={this.pressNumbers.bind(this, '1')}>1</div>
                    <div className='Calc__button Calc__button_SC Calc__button_FoR' onClick={this.pressNumbers.bind(this, '2')}>2</div>
                    <div className='Calc__button Calc__button_TC Calc__button_FoR' onClick={this.pressNumbers.bind(this, '3')}>3</div>
                    <div className='Calc__button Calc__button_right'>=</div>
                    <div className='Calc__button Calc__button_bottom' onClick={this.pressNumbers.bind(this, '0')}>0</div>
                    <div className='Calc__button Calc__button_TC Calc__button_FiR' onClick={this.pressPoint.bind(this, '.')}>.</div>
                </div>
            </div>
        )
    }
}