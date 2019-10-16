import React, { Component } from 'react';
import './Calculator.scss';

export class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 'Digit Limit Met',
            equalSignMatcher: /[=]/,
            mathSignsMatcher: /[/*+]|-/,
            inputValue: '0',
            expression: '0',
        }
    }

    pressNumbers(num) {
        // мы не удаляем предыдущее выражение, если оно не 0, не текст о превышении лимита, и и не оконченное выражение (т.е. с равно)
        const saveExpression =
            !['0', this.state.limit].includes(this.state.expression) && !this.state.expression.match(this.state.equalSignMatcher);
        // мы не удаляем предыдущее введенное значение, если там цифра или если там "0."
        const saveInputValue = Number.parseFloat(this.state.inputValue) || this.state.inputValue === '0.';

        const inputValue = `${saveInputValue && saveExpression ? this.state.inputValue : ''}${num}`;
        const expression = `${saveExpression ? this.state.expression: ''}${num}`;

        this.setState({expression, inputValue}, this.checkLimit);
    }

    pressPoint() {
        const getValues = () => {
            switch (true) {
                case !!this.state.inputValue.match(this.state.mathSignsMatcher):
                    return {
                        expression: `${this.state.expression}0.`,
                        inputValue: '0.'
                    };
                case !!this.state.expression.match(this.state.equalSignMatcher):
                    return {
                        expression: '0.',
                        inputValue: '0.'
                    };
                case !!this.state.inputValue.match(/[.]/):
                    return {
                        expression: this.state.expression,
                        inputValue: this.state.inputValue
                    };
                default:
                    return {
                        expression: `${this.state.expression}.`,
                        inputValue: `${this.state.inputValue}.`
                    };
            }
        };
        this.setState(getValues(), this.checkLimit);
    }

    pressMathSigns(sign) {
        const getExpression = () => {
            switch (true) {
                case this.state.expression === this.state.limit:
                    return `0${sign}`;
                case !!this.state.expression.match(this.state.equalSignMatcher):
                    return `${this.state.result}${sign}`;
                    // если последний знак вы строке равен какому-либо математическому знаку
                case !!this.state.expression[this.state.expression.length - 1].match(this.state.mathSignsMatcher):
                    return `${this.state.expression.slice(0, -1)}${sign}`;
                default:
                    return `${this.state.expression}${sign}`
            }
        };
        this.setState({expression: getExpression(), inputValue: sign}, this.checkLimit);
    }

    pressEqualSign() {
        // eval - это, конечно, зло, но он именно для таких выражений он и создавался и здесь он безопасен
        // eslint-disable-next-line no-eval
        let result = eval(this.state.expression);
        if (!Number.isInteger(result)) {
            result = result.toString() === result.toFixed(1) ? result.toFixed(1) : result.toFixed(2);
        }
        this.setState({
            expression: `${this.state.expression}=${result}`,
            inputValue: result
        }, this.checkLimit)
    }

    reset() {
        this.setState({
            expression: '0',
            inputValue: '0'
        })
    }

    // удаляет последнее имеющее смысл выражение в строке (т.е. либо набор чисел с точкой до мат.знака, либо сам мат.знак)
    deleteLast() {
        if (this.state.expression.match(this.state.equalSignMatcher)) {
            this.reset();
            return;
        }
        const newExpression = this.state.expression.slice(0, -this.state.inputValue.length) || '0';
        // обрезает выражение с конца по одному знаку до тех пор, пока последний символ не будет соотвествовать проброшенному regExp
        const getInputValue = (regExp, change = newExpression) =>
            change.match(regExp) ? getInputValue(regExp, change.slice(change.search(regExp) + 1)) : change || '0';
        this.setState({
            // если выражение оканчивается на число или точку, то надо обрезать до математического знака, и наоборот
            inputValue: getInputValue(newExpression[newExpression.length - 1]
                .match(this.state.mathSignsMatcher) ? /[0-9.]/ : this.state.mathSignsMatcher),
            expression: newExpression
        }, this.checkLimit);
    }

    checkLimit() {
        if (this.state.inputValue.length > 9 || this.state.expression.length > 25) {
            this.setState({
                expression: this.state.limit,
                inputValue: '0'
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
                    <div className='Calc__button Calc__button_red Calc__button_FC Calc__button_FR' onClick={this.reset.bind(this)}>AC</div>
                    <div className='Calc__button Calc__button_red Calc__button_SC Calc__button_FR' onClick={this.deleteLast.bind(this)}>CE</div>
                    <div className='Calc__button Calc__button_TC Calc__button_FR' onClick={this.pressMathSigns.bind(this, '/')}>/</div>
                    <div className='Calc__button Calc__button_FoC Calc__button_FR' onClick={this.pressMathSigns.bind(this, '*')}>*</div>
                    <div className='Calc__button Calc__button_FC Calc__button_SR' onClick={this.pressNumbers.bind(this, '7')}>7</div>
                    <div className='Calc__button Calc__button_SC Calc__button_SR' onClick={this.pressNumbers.bind(this, '8')}>8</div>
                    <div className='Calc__button Calc__button_TC Calc__button_SR' onClick={this.pressNumbers.bind(this, '9')}>9</div>
                    <div className='Calc__button Calc__button_FoC Calc__button_SR' onClick={this.pressMathSigns.bind(this, '-')}>-</div>
                    <div className='Calc__button Calc__button_FC Calc__button_TR' onClick={this.pressNumbers.bind(this, '4')}>4</div>
                    <div className='Calc__button Calc__button_SC Calc__button_TR' onClick={this.pressNumbers.bind(this, '5')}>5</div>
                    <div className='Calc__button Calc__button_TC Calc__button_TR' onClick={this.pressNumbers.bind(this, '6')}>6</div>
                    <div className='Calc__button Calc__button_FoC Calc__button_TR' onClick={this.pressMathSigns.bind(this, '+')}>+</div>
                    <div className='Calc__button Calc__button_FC Calc__button_FoR' onClick={this.pressNumbers.bind(this, '1')}>1</div>
                    <div className='Calc__button Calc__button_SC Calc__button_FoR' onClick={this.pressNumbers.bind(this, '2')}>2</div>
                    <div className='Calc__button Calc__button_TC Calc__button_FoR' onClick={this.pressNumbers.bind(this, '3')}>3</div>
                    <div className='Calc__button Calc__button_right' onClick={this.pressEqualSign.bind(this)}>=</div>
                    <div className='Calc__button Calc__button_bottom' onClick={this.pressNumbers.bind(this, '0')}>0</div>
                    <div className='Calc__button Calc__button_TC Calc__button_FiR' onClick={this.pressPoint.bind(this)}>.</div>
                </div>
            </div>
        )
    }
}