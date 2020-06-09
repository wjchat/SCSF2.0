//require("dotenv").config({  
//  path: `.env.${process.env.NODE_ENV}`,
//apiURL: "https://scsf.herokuapp.com",
//})

module.exports = {
pathPrefix: "/so-close-so-far-deploy",
  siteMetadata: {
    title: `So Close So Far`,
    description: `Stay close.`,
    author: `Jed & Will w/ Matte`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
        `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: "https://scsf.herokuapp.com",
        contentTypes: [
//           List of the Content Types you want to be able to request from Gatsby.
          "volume",
        ],
        singleTypes: [`about`],
        queryLimit: 1000,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-transition-link`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/Matte.svg`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
     `gatsby-plugin-offline`,
  ],
}
