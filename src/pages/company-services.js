import React from "react"
import SEO from "../components/seo"
import Layout from '../containers/layout/layout'
import Header from '../containers/layout/header/header-one'
import Footer from '../containers/layout/footer/footer-one'
import PageHeader from '../components/pageheader'
import ServicesArea from '../containers/it-services/services-area'
import ContactArea from '../containers/global/contact-area/contact-two'

const CompanyServicePage = ({ pageContext, location }) => (
  <Layout location={location}>
    <SEO title="Servicios" />
    <Header/>
    <PageHeader 
        pageContext={pageContext} 
        location={location}
        title="Servicios"
    />
    <main className="site-wrapper-reveal">
        <ServicesArea/>
        <ContactArea/>
    </main>
    <Footer/>
  </Layout>
)
 
export default CompanyServicePage
 