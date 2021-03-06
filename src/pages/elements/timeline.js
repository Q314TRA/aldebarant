import React from 'react'
import SEO from "../../components/seo"
import Layout from '../../containers/layout/layout'
import Header from '../../containers/layout/header/header-one'
import Footer from '../../containers/layout/footer/footer-one'
import PageHeader from '../../components/pageheader'
import CTA from '../../containers/global/cta-area/section-one'
import TimelineArea from '../../containers/elements/timeline'

const TimelinePage = ({ pageContext, location }) => {
    return (
        <Layout location={location}>
            <SEO title="Timeline" />
            <Header />
            <PageHeader
                pageContext={pageContext}
                location={location}
                title="Timeline"
            />
            <main className="site-wrapper-reveal">
                <TimelineArea />
                <CTA />
            </main>
            <Footer />
        </Layout>
    )
}

export default TimelinePage
