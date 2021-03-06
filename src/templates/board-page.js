import React from 'react'
import PropTypes from 'prop-types'
import { withPrefix, graphql } from 'gatsby'
import { Helmet } from "react-helmet"
import Content, { HTMLContent } from '../components/Content'
import Layout from '../components/Layout'
import Header from '../components/Header'
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import ContactInformation from '../components/ContactInformation'

import metadata from '../content/site-metadata.json'
import LinkComponent from '../components/LinkComponent'

export const BoardPageTemplate = ({
  seo,
  header,
  members,
  content, 
  contentComponent
}) => {
  const PageContent = contentComponent || Content  

  return (
    <div>
      {seo && 
      <Helmet title={seo.title ? seo.title : metadata.siteMetadata.title} titleTemplate={metadata.siteMetadata.titleTemplate}>        
        {seo.description && <meta name="description" content={seo.description} />}
        {seo.image && <meta name="image" content={`${withPrefix('/')}${seo.image.publicURL}`} />}        
        {seo.url && <meta property="og:url" content={seo.url} />}
        {seo.title && <meta property="og:title" content={seo.title} />}
        {seo.description && (
          <meta property="og:description" content={seo.description} />
        )}
        {seo.image && <meta property="og:image" content={`${withPrefix('/')}${seo.image.publicURL}`} />}
        <meta name="twitter:card" content="summary_large_image" />
        {seo.twitterUsername && (
          <meta name="twitter:creator" content={seo.twitterUsername} />
        )}        
        {seo.title && <meta name="twitter:title" content={seo.title} />}
        {seo.description && (
          <meta name="twitter:description" content={seo.description} />
        )}
        {seo.image && <meta name="twitter:image" content={`${withPrefix('/')}${seo.image.publicURL}`} />}          
      </Helmet>
      }
      <div className="wrapper project-background">
        <TopBar />
        <Navbar />
        <Header title={header.title} subTitle={header.subTitle} link={header.link}/>
      </div>    
      
      <main className="main">
        <div className="content">
          <div className="container">
            <section className="aboutstaff-s2-main container">
              <div className="aboutstaff-s2-container">
                {members.map((member, index) => {
                  return (
                    <div className="aboutstaff-s2-container-border" key={index}>
                      <div className="card-social-container-icons">
                        <LinkComponent href={member.openStack}>
                          <img src="/img/symbols/icon-1.svg" alt="icon" className="card-social-icons"/>
                        </LinkComponent> 
                        {member.twitter && 
                        <LinkComponent href={member.twitter}>
                          <img src="/img/symbols/icon-3.svg" alt="icon" className="card-social-icons" />
                        </LinkComponent> 
                        }
                        {member.linkedin && 
                        <LinkComponent href={member.linkedin}>
                          <img src="/img/symbols/icon-4.svg" alt="icon" className="card-social-icons" />
                        </LinkComponent>
                        }                        
                      </div> 
                      <div className="card">
                        <div className="card-content">
                          <div className="media">
                            <div className="media-left">
                              <figure className="image is-128x128">
                                <img src={!!member.picture.childImageSharp ? member.picture.childImageSharp.fluid.src : member.picture} alt="" />
                              </figure>
                            </div> 
                            <div className="media-content">
                              <p className="title is-4 card-text-color">{member.name}</p> 
                              <p className="is-6">{member.title}<br/>{member.company}</p> 
                              <p className="is-6" dangerouslySetInnerHTML={{__html: member.description}}>                                
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}                
              </div>
            </section>
          </div>                    
        </div>
        <ContactInformation />
      </main>
    </div>
  )
}

BoardPageTemplate.propTypes = {  
  seo: PropTypes.object,
  header: PropTypes.object,
  members: PropTypes.array,
}

const BoardPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <BoardPageTemplate
        contentComponent={HTMLContent}
        seo={post.frontmatter.seo}
        header={post.frontmatter.header}
        members={post.frontmatter.members}
        content={post.html}
      />
    </Layout>
  )
}

BoardPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default BoardPage

export const boardPageQuery = graphql`
  query BoardPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        seo {
          title
          description
          url
          image {
            childImageSharp {
              fluid(maxWidth: 640, quality: 64) {
                ...GatsbyImageSharpFluid
              }
            }
            publicURL
          }
          twitterUsername
        }
        header {
          title
          subTitle
          link {
            url
            text
          }
        }        
        members {
          name
          picture {
            childImageSharp {
              fluid(maxWidth: 640, quality: 64) {
                ...GatsbyImageSharpFluid
              }
            }
            publicURL
          }
          title
          company
          description
          openStack
          twitter
          linkedin
        }
      }
    }
  }
`
