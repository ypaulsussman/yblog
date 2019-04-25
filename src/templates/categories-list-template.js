import React from 'react';
import { Link, graphql } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';

const CategoriesListTemplate = ({ data }) => {
  const {
    title,
    subtitle
  } = data.site.siteMetadata;

  const { group } = data.allMarkdownRemark;

  return (
    <Layout title={`Categories - ${title}`} description={subtitle}>
      <Sidebar />
      <Page title="Categories">
      <p>Right now I've got two types of posts:</p>
        <ul>
          {group.map((category) => (
            <li key={category.fieldValue}>
              <Link to={`/category/${kebabCase(category.fieldValue)}/`}>
                {category.fieldValue} ({category.totalCount})
              </Link>
            </li>
          ))}
        </ul>

        <p>The first is basically personal notes: excerpts from things I've read
          (<em>or watched, or attended</em>) that I found thought-provoking, and
          want to return to.</p>

        <p>The second contains both [1] my takeaways from when I *do* return to
          those personal notes, and [2] thoughts that spring up without an
          immediately-obvious source.</p>

        <p>In either case (<em>and unlike that first category of posts</em>)
          they're original writings, rather than the (<em>at best</em>)
          partially-transformed words of others.</p>

        <p>I have no idea why you'd be interested in the former, except as maybe
          a précis of the given text? ...but, then, I'm also not super sure why
          you'd be interested in the latter.</p>

        <p>Either which way, enjoy!</p>

      </Page>
    </Layout>
  );
};

export const query = graphql`
  query CategoriesListQuery {
    site {
      siteMetadata {
        title
        subtitle
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } }
    ) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default CategoriesListTemplate;
