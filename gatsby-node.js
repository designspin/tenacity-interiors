const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const remark = require('remark');
const remarkHTML = require('remark-html');

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions;

    return graphql(`
        {
            allMarkdownRemark(limit: 1000) {
                edges {
                    node {
                        id
                        fields {
                            slug
                        }
                        frontmatter {
                            templateKey
                        }
                    }
                }
            }
        }
    `).then(result => {
        if(result.errors) {
            result.errors.forEach(e => console.error(e.toString()));
            return Promise.reject(results.errors);
        }

        const posts = result.data.allMarkdownRemark.edges

        posts.forEach(edge => {
            const id = edge.node.id;

            if(edge.node.frontmatter.templateKey) {
                createPage({
                    path: edge.node.fields.slug,
                    component: path.resolve(
                        `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
                    ),
                    context: {
                        id,
                    },
                });
            }
        });
    });
}

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;
    
    if(node.internal.type === 'MarkdownRemark') {
        const value = createFilePath({ node, getNode});
        
        createNodeField({
            name: `slug`,
            node,
            value,
        });
    }

    if(node.frontmatter !== undefined && node.frontmatter.sections !== undefined) {

        node.frontmatter.sections.forEach((section, index) => {
            const markdown = section.body;
            console.log(markdown);
            node.frontmatter.sections[index].body = remark()
            .use(remarkHTML)
            .processSync(markdown)
            .toString();
        });

        return node;
    }
}
