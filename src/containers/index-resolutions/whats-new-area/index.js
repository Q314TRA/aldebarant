import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { Container, Row, Col } from '../../../components/ui/wrapper'
import BoxIcon from '../../../components/box-icon/layout-three'
import { SectionWrap } from './whats-new-area.style'
import SectionTitle from '../../../components/ui/section-title'

const WhatsNewArea = ({sectionTitleStyle}) => {
    const whatsnewData = useStaticQuery(graphql`
        query CompanyWhatsnewQuery {
            indexCompanyJson(id: {eq: "company-new-content"}) {
                list {
                    title
                    desc
                    icon {
                        childImageSharp {
                            fixed(width: 60, height: 60, quality: 100) {
                                ...GatsbyImageSharpFixed_tracedSVG
                            }
                        }
                    }
                }
            }
        }      
    `);
    const whatsnewlist = whatsnewData.indexCompanyJson.list;

    return (
        <SectionWrap>
            <Container>
            <Row>
                    <Col lg={12}>
                        <SectionTitle
                            {...sectionTitleStyle}
                            title="Por que trabajar con <span>nosotros?</span>"
                            subtitle="EMPIEZA TU PROYECTO"
                        />
                    </Col>
                </Row>

                <Row>
                    {whatsnewlist.map((data, i) => (
                        <Col lg={6} key={`whats-new-${i}`}>
                            <BoxIcon
                                icon={data.icon}
                                title={data.title}
                                desc={data.desc}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </SectionWrap>
    )
}


WhatsNewArea.propTypes = {
    sectionTitleStyle: PropTypes.object
}

WhatsNewArea.defaultProps = {
    sectionTitleStyle: {
        mb: '40px',
        responsive: {
            small: {
                mb: '30px'
            }
        }
    }
}

export default WhatsNewArea;
