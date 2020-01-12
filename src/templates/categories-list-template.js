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
        <p>Right now I've got three types of posts:</p>
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
          The first category is the simplest: when I'm blithely hacking away at
          some toy app or proof-of-concept in my free time, I try to detail, at
          the very least, the CLI mischief that got me into whatever intractable
          fix I find myself.
        </p>

        <p>
          These "<em>What I Do</em>" posts, then, include a higher-level
          blow-by-blow of that process, furnished with some context about what
          I'd aimed to accomplish in the first place, and (<em>hopefully!</em>)
          why I undertook to do it in that particular way.
        </p>

        <p>
          Then, when I read things (
          <em>or attend things, or even sometimes watch things</em>), I tend to
          take notes. That second category, "<em>What I Read,</em>" includes my
          takeaways from when finally I return to them. (
          <em>However many months or even years down the road that may be.</em>)
        </p>

        <p>
          Sometimes these revisitations will include an idea for something to
          build or study; sometimes it's just a reflection on that
          paper-snapshot of who I was at the time.
        </p>
        <p>
          Regardless, on review I usually restructure those documents, in order
          to sharpen my grasp of their content and to deepen my recall of their
          most important bits.
        </p>

        <p>At least, that's the plan.</p>

        <p>
          The final category, "<em>What I Think,</em>" mostly contains
          plans that spring up without an immediately-obvious source.
          Many are derived from sketches, scribbles, and jottings taken from a
          notepad that had done little, save slowly accrete, over 2012-2018.
        </p>

        <p>
          My hope is that (
          <em>
            after I digest, explore, and likely discard the majority of them
          </em>
          ) this category will become the place where I record my piecemeal,
          agonizingly protracted, step-by-step deduction of what to do next with
          my life, on leaving software development. But that's more of a Q3 2030
          project. (<em>Thanks, "mortgage"...</em>)
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
