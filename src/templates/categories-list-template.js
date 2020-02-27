import React from 'react';
import { Link, graphql } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';

const CategoriesListTemplate = ({ data }) => {
  const { title, subtitle } = data.site.siteMetadata;

  const { group } = data.allMarkdownRemark;

  return (
    <Layout title={`Categories - ${title}`} description={subtitle}>
      <Sidebar />
      <Page title="Categories">
        <p>Right now I maintain three types of essays:</p>
        <ul>
          {group.map((category) => (
            <li key={category.fieldValue}>
              <Link to={`/category/${kebabCase(category.fieldValue)}/`}>
                {category.fieldValue} ({category.totalCount})
              </Link>
            </li>
          ))}
        </ul>

        <p>
          The first category is the simplest: when hacking away at some toy or
          proof-of-concept app, I try to detail the major decisions and
          sticking-points.
        </p>

        <p>
          These "<em>What I Do</em>" posts furnish those records with some
          context about my initial goals, where the project currently stands,
          and what I'd do differently next time.
        </p>

        <p>
          When I read -- or attend, or sometimes even watch! -- things, I
          tend to take notes. I like to return, months or years later, to what
          I'd written down, to see who I was then and what I paid attention to.
        </p>

        <p>
          That second category, "<em>What I Read,</em>" includes my takeaways
          from those revisitations.
        </p>

        <p>
          The final category contains plans that arrive without an
          immediately-obvious source. My hope is that -- after I digest,
          explore, and likely discard the majority of them -- "
          <em>What I Think</em>" will become the place where I record my
          agonizing, protracted deduction of how next to spend life, on
          leaving software development. But that's more of a Q3 2030 project. (
          <em>Thanks, "mortgage"...</em>)
        </p>

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
