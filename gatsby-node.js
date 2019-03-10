const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const remark = require('remark');
const remarkHTML = require('remark-html');
const { createPaginationPages } = require('gatsby-pagination');
const _ = require('lodash');

const createBlogPages = (createPage, posts) => {
    posts.forEach((post) => {
        createPage({
            path: post.fields.slug,
            component: path.resolve(
                `src/templates/${String(post.frontmatter.templateKey)}.js`
            ),
            context: { id: post.id }
        });
    });
};

const createCategoryPages = (createPage, posts) => {
    const category = 'blog';
    const postIds = posts.map((post) => {
        return post.id;
    });

    createPaginationPages({
        createPage,
        pathFormatter: path => `/${_.kebabCase(category)}${path !== 1 ? '/' + path : '/'}`,
        component: path.resolve(`src/templates/blog.js`),
        limit: 3,
        edges: postIds,
        context: { category }
    })
}

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions;

    return graphql(`
        {
            content: allMarkdownRemark(
                limit: 1000
                filter: {
                    frontmatter: { templateKey: { ne: "blog-post" }}
                }
            ) {
                edges {
                    node {
                        id
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                            templateKey
                            category
                        }
                    }
                }
            }
            blog: allMarkdownRemark(
                filter: {
                    fileAbsolutePath: { regex: "/blog/" }
                }
            ) {
                edges {
                    node {
                        id
                        fields {
                            slug
                        }
                        frontmatter {
                            tags
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
        
        const pages = result.data.content.edges;
        const blogs = result.data.blog.edges;
        let blogObject = {
            posts: [],
            tags: []
        }

        //Create content pages
        pages.forEach(edge => {
            
            const id = edge.node.id;
            const cat = edge.node.fields.slug.replace('/','').replace('/','');
            const name = edge.node.frontmatter.title;
            if(edge.node.frontmatter.templateKey) {
                createPage({
                    path: edge.node.fields.slug,
                    component: path.resolve(
                        `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
                    ),
                    context: {
                        id,
                        cat,
                        name
                     },
                });
            }
        });

        
        //Create blog pages
        blogs.forEach(({ node }) => {
            const { tags, templateKey } = node.frontmatter;
            const { id: postId } = node;
            
            blogObject.posts.push(node);

            if(templateKey !== 'blog-post') { return; }

            if(tags) {
                tags.forEach((tag) => {
                    if(tag && tag !== '') {
                        if(!blogObject.tags[tag]) {
                            blogObject.tags[tag] = [];
                        }
                        blogObject.tags[tag].push(postId);
                    }
                })
            }
        });
        
        createBlogPages(createPage, blogObject.posts);
        createCategoryPages(createPage, blogObject.posts);
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

        if(node.frontmatter.templateKey === "blog-post") {
            createNodeField({
                name: 'ids',
                node,
                value: [node.id]
            })

            createNodeField({
                name: 'categoryPath',
                node,
                value: 'blog',

            })

            if(node.frontmatter.tags) {
                const tagPaths = node.frontmatter.tags.map(tag => `/tags/${_.kebabCase(tag)}/`);
                createNodeField({
                    name: 'tagPaths',
                    node,
                    value: tagPaths
                })
            }
        }

        
    }

    if(node.frontmatter !== undefined && node.frontmatter.sections !== undefined) {

        node.frontmatter.sections.forEach((section, index) => {
            const markdown = section.body;
            node.frontmatter.sections[index].body = remark()
            .use(remarkHTML)
            .processSync(markdown)
            .toString();
        });

        return node;
    }
}
