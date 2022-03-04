import React, { createRef, useState, useEffect } from 'react';
import { projectList } from '../../data/projects';
import ProjectLayout from '../../layout/ProjectLayout';
import { Container, Row, Col } from 'react-bootstrap';
import ENUMS from '../../config/enums';
import { Icon } from '@iconify/react';

const ShirtSizeButton = () => {
    <button type="button" className="c-Shirt-size-btn"></button>
};

const ColorButton = ({ type, selectedColor }) => {
    return (
        <div className = "c-Color-btn">
            <span className ={`c-Color-btn__Circle c-Color-btn__Circle--${type}`}/>
            <p className = {`c-Color-btn__Text ${selectedColor === type && "c-Color-btn__Text--selected"}`}>{type}</p>
        </div>
    );
};

const SelectQtyButton = ({ type, qty, setQty }) => {

    const handleSetQty = () => {
        setQty((prevState) => {
            if (type === ENUMS.blueBerryQtyType.DECREMENT) {
                return prevState -= 1;
            }
            if (type === ENUMS.blueBerryQtyType.INCREMENT) {
                return prevState += 1;
            }
        });
    }

    return (
        <button className="c-Select-qty-btn" type="button" onClick={() => handleSetQty()}>
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

    const subLinkArr = [
        {
            name: "Demo",
            ref: createRef("")
        },
    ];

    return (
        <ProjectLayout
            title="BLUEBERRY • LeLeLand"
            subTitle="BLUEBERRY - Clothing store concept"
            subLinkArr={subLinkArr}
            projectID={projectID}
            project={project}>
            <Container fluid={true} className="c-Blueberry">
                {/* Demo */}
                <div ref={subLinkArr[0].ref} className="c-Blueberry__Demo c-Demo">
                    <Row className="c-Demo__Product c-Product">
                        <Col lg={12} xl={6} className="c-Product__Img c-Img">
                            <img src={require(`../../assets/images/Blueberry_T-Shirt-white.png`)} alt="BLUEBERRY T Shirt" />
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

                                </div>
                            </div>
                            <div className="c-Details__Color c-Color">
                                <h1>Select Color.</h1>
                                <div className="c-Color__Component">
                                    <ColorButton
                                        type={ENUMS.blueBerryColorType.WHITE}
                                        selectedColor={color}
                                    />
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
                        <Row className="c-Review-Infographics c-Infographics">
                            <Col lg={12}>
                            </Col>
                        </Row>
                        <Row className="c-Review__List c-List">

                        </Row>
                    </div>

                </div>
            </Container>
        </ProjectLayout>
    )
}

export default Blueberry;