/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(
    `
      {
        volumes: allStrapiVolumes {
          edges {
            node {
                strapiId
                Subject
                Title
                published
                typeContent
                vid 
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog articles pages.
  const volumes = result.data.volumes.edges
  volumes.forEach((volume, index) => {
    createPage({
      path: `/volume/${volume.node.strapiId}`,
      component: require.resolve("./src/templates/volume.jsx"),
      context: {
        id: volume.node.strapiId,
      },
    })
  })
}