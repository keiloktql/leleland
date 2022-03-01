import React, { createRef, useState, useEffect } from 'react';
import { projectList } from '../../data/projects';
import ProjectLayout from '../../layout/ProjectLayout';
import { Container, Row, Col } from 'react-bootstrap';
import IphoneFrame from '../../components/IphoneFrame';
import ENUMS from '../../config/enums';

const Keypad = ({ text, type, appearance, onClickHandler }) => {
    return (
        <div onClick={onClickHandler} className={`l-Keypad l-Keypad--${appearance === ENUMS.calculatorAppearance.DARK ? "dark" : "light"}`}>
            <div className={`c-Keypad c-Keypad--${type === ENUMS.calculatorKeypads.NORMAL ? "normal" : "arithmetic"}`}>
                <p>{text}</p>
            </div>
        </div>

    )
};

const Calculator = () => {
    const projectID = projectList[0].id;
    const project = projectList[0];

    const [appearance, setAppearance] = useState(ENUMS.calculatorAppearance.LIGHT);
    const [value, setValue] = useState(0);
    const [secondaryValue, setSecondaryValue] = useState(null);
    const [arithmeticOperator, setArithmeticOperator] = useState(null);
    const [newSet, setNewSet] = useState(false);
    const [floatingNum, setFloatingNum] = useState(false);

    const subLinkArr = [
        {
            name: "Demo",
            ref: createRef("")
        },
    ];

    const handleAppearanceClick = (calculatorAppearance) => {
        setAppearance(() => calculatorAppearance);
    };

    const computeValue = () => {
        let mathBuffet = {
            '+': (x, y) => (x + y),
            '-': (x, y) => (x - y),
            '/': (x, y) => (x / y),
            'x': (x, y) => (x * y)
        };

        let computedValue;
        try {
            computedValue = mathBuffet[arithmeticOperator](parseFloat(secondaryValue), parseFloat(value));
        } catch (err) {
            console.log(err)
        }

        return computedValue;
    };

    const handleSubmitCalculator = () => {
        if (value === null || secondaryValue === null) {
            return;
        }
        const computedValue = computeValue();

        setSecondaryValue(() => null);
        setValue(() => computedValue);
        setArithmeticOperator(() => null);
        setNewSet(() => true);
        setFloatingNum(() => false);
    };

    const handleKeypadClick = (keypadValue) => {

        if (keypadValue === ENUMS.calculatorKeypadValue.CLEAR) {
            setValue(() => 0);
            setSecondaryValue(() => null);
            setArithmeticOperator(() => null);
            setNewSet(() => false);
            setFloatingNum(() => false);
        } else if (keypadValue === ENUMS.calculatorKeypadValue.DOT) {
            if (!floatingNum) {
                setValue(() => value + ".");
                setFloatingNum(() => true);
            }
        } else if (keypadValue === ENUMS.calculatorKeypadValue.PLUS || keypadValue === ENUMS.calculatorKeypadValue.MULTIPLY || keypadValue === ENUMS.calculatorKeypadValue.DIVIDE || keypadValue === ENUMS.calculatorKeypadValue.MINUS) {
            // Initial state
            if (secondaryValue === null) {
                setSecondaryValue(() => value);
                setNewSet(() => true);
                setFloatingNum(() => false);
                setArithmeticOperator(() => keypadValue);
                return;
            }

            // User already has an arithmetic operator
            if (newSet) {
                setArithmeticOperator(() => keypadValue);
                return;
            } else {
                // Since this is not a new set, it means that the value can be computed with the secondary value
                const computedValue = computeValue();

                // New arithmetic operator
                setArithmeticOperator(() => keypadValue);
                setValue(() => computedValue);
                setSecondaryValue(() => computedValue);
                setNewSet(() => true);
                setFloatingNum(() => false);
            }

        } else {
            let newValue = ""
            // Initial state
            if (value === 0) {
                // User type in 0
                if (keypadValue === 0) {
                    newValue = keypadValue;
                } else {
                    // User type in 1 - 9
                    newValue = keypadValue;
                    setNewSet(() => false);
                }
            } else {
                // User just clicked on an operator
                if (newSet) {
                    newValue = keypadValue;
                    setNewSet(() => false);
                } else {
                    // User already has smt in this set
                    newValue = value + `${keypadValue}`;
                }
            }

            setValue(() => newValue);
        }

    };


    const renderCalculator = () => {
        return (
            <div className={`c-Calculator__Screen c-Screen c-Screen--${appearance === ENUMS.calculatorAppearance.LIGHT ? "light" : "dark"}`}>
                <div className="c-Screen__Top c-Top">
                    <h1 className="c-Top__Value">{value}</h1>
                    <h2 className="c-Top__Workspace">{secondaryValue}{arithmeticOperator}</h2>
                </div>
                <div className='c-Screen__Keypads c-Keypads'>
                    <div className="c-Keypads__Row">
                        <Keypad
                            text="7"
                            appearance={appearance}
                            type={ENUMS.calculatorKeypads.NORMAL}
                            onClickHandler={() => handleKeypadClick(ENUMS.calculatorKeypadValue.SEVEN)}
                        />
                        <Keypad
                            text="8"
                            appearance={appearance}
                            type={ENUMS.calculatorKeypads.NORMAL}
                            onClickHandler={() => handleKeypadClick(ENUMS.calculatorKeypadValue.EIGHT)}
                        />
                        <Keypad
                            text="9"
                            appearance={appearance}
                            type={ENUMS.calculatorKeypads.NORMAL}
                            onClickHandler={() => handleKeypadClick(ENUMS.calculatorKeypadValue.NINE)}

                        />
                        <Keypad
                            text="/"
                            appearance={appearance}
                            type={ENUMS.calculatorKeypads.ARITHMETIC}
                            onClickHandler={() => handleKeypadClick(ENUMS.calculatorKeypadValue.DIVIDE)}

                        />
                    </div>
                    <div className="c-Keypads__Row">
                        <Keypad
                            text="4"
                            appearance={appearance}
                            type={ENUMS.calculatorKeypads.NORMAL}
                            onClickHandler={() => handleKeypadClick(ENUMS.calculatorKeypadValue.FOUR)}

                        />
                        <Keypad
                            text="5"
                            appearance={appearance}
                            type={ENUMS.calculatorKeypads.NORMAL}
                            onClickHandler={() => handleKeypadClick(ENUMS.calculatorKeypadValue.FIVE)}

                        />
                        <Keypad
                            text="6"
                            appearance={appearance}
                            type={ENUMS.calculatorKeypads.NORMAL}
                            onClickHandler={() => handleKeypadClick(ENUMS.calculatorKeypadValue.SIX)}

                        />
                        <Keypad
                            text="X"
                            appearance={appearance}
                            type={ENUMS.calculatorKeypads.ARITHMETIC}
                            onClickHandler={() => handleKeypadClick(ENUMS.calculatorKeypadValue.MULTIPLY)}
                        />
                    </div>
                    <div className="c-Keypads__Row">
                        <Keypad
                            text="1"
                            appearance={appearance}
                            type={ENUMS.calculatorKeypads.NORMAL}
                            onClickHandler={() => handleKeypadClick(ENUMS.calculatorKeypadValue.ONE)}
                        />
                        <Keypad
                            text="2"
                            appearance={appearance}
                            type={ENUMS.calculatorKeypads.NORMAL}
                            onClickHandler={() => handleKeypadClick(ENUMS.calculatorKeypadValue.TWO)}
                        />
                        <Keypad
                            text="3"
                            appearance={appearance}
                            type={ENUMS.calculatorKeypads.NORMAL}
                            onClickHandler={() => handleKeypadClick(ENUMS.calculatorKeypadValue.THREE)}
                        />
                        <Keypad
                            text="-"
                            appearance={appearance}
                            type={ENUMS.calculatorKeypads.ARITHMETIC}
                            onClickHandler={() => handleKeypadClick(ENUMS.calculatorKeypadValue.MINUS)}
                        />
                    </div>
                    <div className="c-Keypads__Row">
                        <Keypad
                            text="."
                            appearance={appearance}
                            type={ENUMS.calculatorKeypads.NORMAL}
                            onClickHandler={() => handleKeypadClick(ENUMS.calculatorKeypadValue.DOT)}
                        />
                        <Keypad
                            text="0"
                            appearance={appearance}
                            type={ENUMS.calculatorKeypads.NORMAL}
                            onClickHandler={() => handleKeypadClick(ENUMS.calculatorKeypadValue.ZERO)}
                        />
                        <Keypad
                            text="AC"
                            appearance={appearance}
                            type={ENUMS.calculatorKeypads.NORMAL}
                            onClickHandler={() => handleKeypadClick(ENUMS.calculatorKeypadValue.CLEAR)}
                        />
                        <Keypad
                            text="+"
                            appearance={appearance}
                            type={ENUMS.calculatorKeypads.ARITHMETIC}
                            onClickHandler={() => handleKeypadClick(ENUMS.calculatorKeypadValue.PLUS)}
                        />
                    </div>
                    <button type="button" className="c-Screen__Equal" onClick={() => handleSubmitCalculator()}>=</button>
                </div>

            </div>
        )
    };

    return (
        <ProjectLayout
            title="Calculator • LeLeLand"
            subTitle="Calculator"
            subLinkArr={subLinkArr}
            projectID={projectID}
            project={project}>
            <Container fluid={true} className="c-Calculator">
                {/* Demo */}
                <div ref={subLinkArr[0].ref} className="c-Calculator__Demo">
                    <Row lg={12} xl={7} className="c-Demo">
                        <Col className="c-Demo__Left c-Left">
                            <IphoneFrame
                                variation={appearance === ENUMS.calculatorAppearance.DARK ? "dark" : "light"}
                                topVariation={appearance === ENUMS.calculatorAppearance.DARK ? "dark" : "light"}
                                children={renderCalculator()}
                                unselectable={false}
                            />
                        </Col>

                        <Col lg={12} xl={5} className="c-Demo__Settings c-Settings">
                            <h1>Settings</h1>
                            <div className="c-Settings__Appearance">
                                <h2>Appearance</h2>
                                <div className="c-Appearance__Types">
                                    <div onClick={() => handleAppearanceClick(ENUMS.calculatorAppearance.LIGHT)} className={`c-Appearance__Type c-Appearance__Type--light ${appearance === ENUMS.calculatorAppearance.LIGHT && "c-Appearance__Type--selected"}`}>
                                        <span className="c-Appearance-Type__BG">
                                            <span className="c-Appearance-Type__Overlay">
                                                <p>Aa</p>
                                            </span>
                                        </span>
                                        <h3>Light</h3>
                                    </div>
                                    <div onClick={() => handleAppearanceClick(ENUMS.calculatorAppearance.DARK)} className={`c-Appearance__Type c-Appearance__Type--dark ${appearance === ENUMS.calculatorAppearance.DARK && "c-Appearance__Type--selected"}`}>
                                        <span className="c-Appearance-Type__BG">
                                            <span className="c-Appearance-Type__Overlay">
                                                <p>Aa</p>
                                            </span>
                                        </span>
                                        <h3>Dark</h3>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </ProjectLayout>
    );
};

export default Calculator;