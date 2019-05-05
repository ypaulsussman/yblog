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

        <p>When I read things (<em>or attend things, or even sometimes watch things</em>), I'm usually pretty scrupulous about taking notes. That first category includes my takeaways from when I return to those notes (<em>however many months or even years down the road.</em>)</p>

        <p>Sometimes it'll include an idea for something to build or study; sometimes it's just a reflection on that snapshot of who I was then. Either way, returning to those documents is meant to both sharpen my grasp of their content, and strengthen my future recall of the most important bits.</p>

        <p>I mean, that's the plan.</p>

        <p>The second category contains thoughts that spring up without an immediately-obvious source. Many are derived from sketches, scribbles, and jottings in a Drive document that had done little save slowly accrete over 2012-2018.</p>

        <p>My hope is that (<em>after I digest, explore, and likely discard the majority of them</em>) this category will become the place where I record step-by-step analyses of toy apps that I build, or other experiments. But that's more of a Q3 2019 project.</p>

        <p>Watch this space.</p>
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
