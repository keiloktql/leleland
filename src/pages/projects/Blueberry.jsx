import React, { createRef, useState, useEffect } from 'react';
import { projectList } from '../../data/projects';
import ProjectLayout from '../../layout/ProjectLayout';
import { Container, Row, Col } from 'react-bootstrap';
import ENUMS from '../../config/enums';
import { Icon } from '@iconify/react';

const ShirtSizeButton = ({ type, selectedSize, setSize }) => {

    const handleSetSize = () => {
        setSize(() => type);
    };

    return (
        <button type="button" className={`c-Shirt-size-btn ${selectedSize === type && "c-Shirt-size-btn--selected"}`} onClick={() => handleSetSize()}>{type}</button>
    );
};

const ColorButton = ({ type, selectedColor, setColor }) => {

    const handleSetColor = () => {
        setColor(() => type);
    };

    return (
        <div className={`c-Color-btn ${selectedColor === type && 'c-Color-btn--selected'}`} onClick={handleSetColor}>
            <span className={`c-Color-btn__Circle c-Color-btn__Circle--${type.toLowerCase()}`} />
            <p className={`c-Color-btn__Text`}>{type}</p>
        </div>
    );
};

const SelectQtyButton = ({ type, qty, setQty }) => {

    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        let isDisabled = false;

        if (type === ENUMS.blueBerryQtyType.DECREMENT) {
            if (qty <= 1) {
                isDisabled = true;
            } else {
                isDisabled = false;
            }
        } else {
            if (qty >= 10) {
                isDisabled = true;
            } else {
                isDisabled = false;
            }
        }

        setDisabled(() => isDisabled);
    }, [qty]);

    const handleSetQty = () => {
        setQty((prevState) => {
            if (type === ENUMS.blueBerryQtyType.DECREMENT) {
                return prevState -= 1;
            }
            if (type === ENUMS.blueBerryQtyType.INCREMENT) {
                return prevState += 1;
            }
        });
    };

    return (
        <button disabled={disabled} className="c-Select-qty-btn" type="button" onClick={() => handleSetQty()}>
            {
                type === ENUMS.blueBerryQtyType.DECREMENT ?
                    <Icon className="c-Icon c-Icon__Minus" icon="akar-icons:minus" /> :
                    <Icon className="c-Icon c-Icon__Plus" icon="akar-icons:plus" />
            }
        </button>
    )
};

const Blueberry = () => {
    const projectID = projectList[1].id;
    const project = projectList[1];

    const [qty, setQty] = useState(1);
    const [color, setColor] = useState(ENUMS.blueBerryColorType.WHITE);
    const [size, setSize] = useState(ENUMS.blueBerrySizeType.SMALL);

    const subLinkArr = [
        {
            name: "Demo",
            ref: createRef("")
        },
    ];

    return (
        <ProjectLayout
            title="BLUEBERRY • LeLeLand"
            subTitle="BLUEBERRY"
            subLinkArr={subLinkArr}
            projectID={projectID}
            project={project}>
            <Container fluid={true} className="c-Blueberry">
                {/* PSA */}
                <div className="c-Blueberry__PSA c-PSA">
                    <Icon className = "c-PSA__Icon" icon="bx:error-circle" />
                    <p>Note: This is just for fun. Unfortunately, you can't buy BLUEBERRY shirts.</p>
                </div>
                {/* Demo */}
                <div ref={subLinkArr[0].ref} className="c-Blueberry__Demo c-Demo">
                    <Row className="c-Demo__Product c-Product">
                        <Col lg={12} xl={6} className="c-Product__Img c-Img">
                            <img src={require(`../../assets/images/Blueberry_T-Shirt-${color.toLowerCase()}.png`)} alt="BLUEBERRY T Shirt" />
                        </Col>

                        <Col lg={12} xl={6} className="c-Product__Details c-Details">
                            <div className="c-Details__Top c-Top">
                                <h2>BLUEBERRY</h2>
                                <h1>Mens Logo Print T-Shirt</h1>
                                <h3>S$ 599.90</h3>
                                <div className="c-Top__Rating">
                                    <h1>4.6</h1>
                                    <Icon className="c-Icon c-Icon__Star--colored" icon="ant-design:star-filled" />
                                    <p>(140 Reviews)</p>
                                </div>
                            </div>
                            <div className="c-Details__Size c-Size">
                                <h1>Select Size.</h1>
                                <div className="c-Size__Component">
                                    <ShirtSizeButton
                                        type={ENUMS.blueBerrySizeType.SMALL}
                                        selectedSize={size}
                                        setSize={setSize}
                                    />
                                    <ShirtSizeButton
                                        type={ENUMS.blueBerrySizeType.MEDIUM}
                                        selectedSize={size}
                                        setSize={setSize}
                                    />
                                    <ShirtSizeButton
                                        type={ENUMS.blueBerrySizeType.LARGE}
                                        selectedSize={size}
                                        setSize={setSize}
                                    />
                                </div>
                            </div>
                            <div className="c-Details__Color c-Color">
                                <h1>Select Color.</h1>
                                <div className="c-Color__Component">
                                    <div className="c-Color__Component--row">
                                        <ColorButton
                                            type={ENUMS.blueBerryColorType.WHITE}
                                            selectedColor={color}
                                            setColor={setColor}
                                        />
                                        <ColorButton
                                            type={ENUMS.blueBerryColorType.YELLOW}
                                            selectedColor={color}
                                            setColor={setColor}
                                        />
                                        <ColorButton
                                            type={ENUMS.blueBerryColorType.GREEN}
                                            selectedColor={color}
                                            setColor={setColor}
                                        />
                                    </div>
                                    <div className="c-Color__Component--row">
                                        <ColorButton
                                            type={ENUMS.blueBerryColorType.PURPLE}
                                            selectedColor={color}
                                            setColor={setColor}
                                        />
                                        <ColorButton
                                            type={ENUMS.blueBerryColorType.BLACK}
                                            selectedColor={color}
                                            setColor={setColor}
                                        />
                                        <ColorButton
                                            type={ENUMS.blueBerryColorType.RED}
                                            selectedColor={color}
                                            setColor={setColor}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="c-Details__Qty c-Qty">
                                <h1>Select Quantity.</h1>
                                <div className="c-Qty__Component">
                                    <SelectQtyButton
                                        type={ENUMS.blueBerryQtyType.DECREMENT}
                                        qty={qty}
                                        setQty={setQty}
                                    />
                                    <p>{qty}</p>
                                    <SelectQtyButton
                                        type={ENUMS.blueBerryQtyType.INCREMENT}
                                        qty={qty}
                                        setQty={setQty}
                                    />
                                </div>
                            </div>
                            <button type="button" className="c-Btn c-Btn__Primary">Add to Cart</button>
                        </Col>
                    </Row>


                    <div className="c-Demo__Review c-Review">
                        <Row className="c-Review__Infographics c-Infographics">
                            <Col lg={12} xl={2} className="c-Infographics__Left c-Left">
                                <h1>Reviews</h1>
                                <p><b>4.6</b> out of 5</p>
                                <div className="c-Left__Stars">
                                    <Icon className="c-Icon c-Icon__Star--colored" icon="ant-design:star-filled" />
                                    <Icon className="c-Icon c-Icon__Star--colored" icon="ant-design:star-filled" />
                                    <Icon className="c-Icon c-Icon__Star--colored" icon="ant-design:star-filled" />
                                    <Icon className="c-Icon c-Icon__Star--colored" icon="ant-design:star-filled" />
                                    <Icon className="c-Icon c-Icon__Star--uncolored" icon="ant-design:star-filled" />
                                </div>
                            </Col>
                            <Col lg={12} xl={10} className="c-Infographics__Right c-Right">
                                <div className="c-Right__Graphs c-Graphs">
                                    <div className="c-Graph">
                                        <p className="c-Graph__Heading">5 Star</p>
                                        <div className="c-Graph__BG">
                                            <span className="c-Graph__FG" style={{ width: "50%" }}></span>
                                        </div>
                                    </div>
                                    <div className="c-Graph">
                                        <p className="c-Graph__Heading">4 Star</p>
                                        <div className="c-Graph__BG">
                                            <span className="c-Graph__FG" style={{ width: "15%" }}></span>
                                        </div>
                                    </div>
                                    <div className="c-Graph">
                                        <p className="c-Graph__Heading">3 Star</p>
                                        <div className="c-Graph__BG">
                                            <span className="c-Graph__FG" style={{ width: "10%" }}></span>
                                        </div>
                                    </div>
                                    <div className="c-Graph">
                                        <p className="c-Graph__Heading">2 Star</p>
                                        <div className="c-Graph__BG">
                                            <span className="c-Graph__FG" style={{ width: "12%" }}></span>
                                        </div>
                                    </div>
                                    <div className="c-Graph">
                                        <p className="c-Graph__Heading">1 Star</p>
                                        <div className="c-Graph__BG">
                                            <span className="c-Graph__FG" style={{ width: "3%" }}></span>
                                        </div>
                                    </div>
                                </div>
                                <p className="c-Right__No">140 Reviews</p>
                            </Col>
                        </Row>
                        <div className="c-Review__List c-List">
                            <div className="c-List__Review-boxes">
                                <div className="c-Review-box">
                                    <div className="c-Review-box__Top c-Top">
                                        <div className="c-Top__Avatar">
                                        </div>
                                        <div className="c-Top__Meta c-Meta">
                                            <h1>Crystalazer</h1>
                                            <p className="c-Meta__Membership c-Meta__Membership--standard">Standard Member</p>
                                        </div>
                                        <div className="c-Top__Rating">
                                            <Icon className="c-Icon c-Icon__Star--colored" icon="ant-design:star-filled" />
                                            <Icon className="c-Icon c-Icon__Star--colored" icon="ant-design:star-filled" />
                                            <Icon className="c-Icon c-Icon__Star--colored" icon="ant-design:star-filled" />
                                            <Icon className="c-Icon c-Icon__Star--colored" icon="ant-design:star-filled" />
                                            <Icon className="c-Icon c-Icon__Star--uncolored" icon="ant-design:star-filled" />
                                        </div>
                                    </div>
                                    <div className="c-Review-box__Content c-Content">
                                        <p>Love it!!</p>
                                    </div>
                                </div>
                                <div className="c-Review-box">
                                    <div className="c-Review-box__Top c-Top">
                                        <div className="c-Top__Avatar">
                                        </div>
                                        <div className="c-Top__Meta c-Meta">
                                            <h1>Daniel Ng</h1>
                                            <p className="c-Meta__Membership c-Meta__Membership--gold">Gold Member</p>
                                        </div>
                                        <div className="c-Top__Rating">
                                            <Icon className="c-Icon c-Icon__Star--colored" icon="ant-design:star-filled" />
                                            <Icon className="c-Icon c-Icon__Star--colored" icon="ant-design:star-filled" />
                                            <Icon className="c-Icon c-Icon__Star--colored" icon="ant-design:star-filled" />
                                            <Icon className="c-Icon c-Icon__Star--colored" icon="ant-design:star-filled" />
                                            <Icon className="c-Icon c-Icon__Star--uncolored" icon="ant-design:star-filled" />
                                        </div>
                                    </div>
                                    <div className="c-Review-box__Content c-Content">
                                        <p>Not bad lah... but material can be better for the heavy price</p>
                                    </div>
                                </div>
                                <div className="c-Review-box">
                                    <div className="c-Review-box__Top c-Top">
                                        <div className="c-Top__Avatar">
                                        </div>
                                        <div className="c-Top__Meta c-Meta">
                                            <h1>김아플</h1>
                                            <p className="c-Meta__Membership c-Meta__Membership--platinum">Platinum Member</p>
                                        </div>
                                        <div className="c-Top__Rating">
                                            <Icon className="c-Icon c-Icon__Star--colored" icon="ant-design:star-filled" />
                                            <Icon className="c-Icon c-Icon__Star--colored" icon="ant-design:star-filled" />
                                            <Icon className="c-Icon c-Icon__Star--colored" icon="ant-design:star-filled" />
                                            <Icon className="c-Icon c-Icon__Star--colored" icon="ant-design:star-filled" />
                                            <Icon className="c-Icon c-Icon__Star--colored" icon="ant-design:star-filled" />
                                        </div>
                                    </div>
                                    <div className="c-Review-box__Content c-Content">
                                        <p>My fav shirt to sleep at night</p>
                                    </div>
                                </div>
                            </div>
                            <span className="c-List__View-more">View more</span>
                        </div>

                    </div>

                </div>
            </Container>
        </ProjectLayout>
    )
}

export default Blueberry;