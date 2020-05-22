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
          These "<em><strong>What I Do</strong></em>" posts furnish those notes with context: my
          initial goals, where the project stands, and what I'd do differently
          next time.
        </p>

        <p>
          When I read (<em>or attend, or sometimes even watch!</em>) things, I
          tend to take notes. I like to return, months or years later, to what
          I'd written down: to see who I was, then, and what I paid attention
          to.
        </p>

        <p>
          That second category, "<em><strong>What I Read</strong>,</em>" includes my takeaways
          from those revisitations.
        </p>

        <p>
          The final category contains ideas and plans that arrive without an
          immediately-obvious source. My hope is that - after I digest, and
          explore (<em>...and likely discard the majority of</em>) them - then "
          <em><strong>What I Think</strong></em>" will become the resource I can reference while
          deducing how next to spend life, on leaving
          software development.
        </p>

        <p>
          But that's more of a Q3 2030 project. (<em>Thanks, "mortgage"...</em>
          )
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
