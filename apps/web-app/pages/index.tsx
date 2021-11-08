/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

import React, { memo, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';

import { FieldContainer } from '@keystone-ui/fields';
import { Field } from '@keystone-next/fields-document/views';
import Button from '@monorepo-starter/button';

const field = {
  componentBlocks: [],
  relationships: {},
  documentFeatures: {
    formatting: {
      inlineMarks: {
        bold: true,
        italic: true,
        underline: true,
        strikethrough: true,
        code: true,
        superscript: true,
        subscript: true,
        keyboard: true,
      },
      listTypes: {
        ordered: true,
        unordered: true,
      },
      alignment: {
        center: true,
        end: true,
      },
      headingLevels: [1, 2, 3, 4, 5, 6],
      blockTypes: {
        blockquote: true,
        code: true,
      },
      softBreaks: true,
    },
    links: true,
    layouts: [
      [1, 1],
      [1, 1, 1],
      [2, 1],
      [1, 2],
      [1, 2, 1],
    ],
  },
};

const DocumentField = memo(function (props) {
  return (
    <FieldContainer>
      <Field {...props} />
    </FieldContainer>
  );
});

const Preamble = () => (
  <>
    <h1>Welcome to Our monorepo starter!</h1>
    <p>
      This is a simple project, with three packages, an app (this!), a graphql server, and a button
      component.
    </p>
  </>
);

const emptyDocument = [
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
];

function HomePage() {
  const { data: { posts: [post] } = { posts: [] } } = useQuery(
    gql`
      {
        posts(take: 1) {
          id
          title
          content {
            document(hydrateRelationships: true)
          }
        }
      }
    `,
    {
      onCompleted(data) {
        if (!data) return;
        setDescription(data.posts?.[0].content?.document || emptyDocument);
      },
    }
  );
  const [description, setDescription] = useState(emptyDocument);
  const [updatePost, { loading }] = useMutation(
    gql`
      mutation updatePost($id: ID!, $data: PostUpdateInput!) {
        updatePost(where: { id: $id }, data: $data) {
          id
        }
      }
    `
  );
  return (
    <div>
      <Preamble />
      <h2 css={{ textAlign: 'center' }}>{post?.title}</h2>
      <div></div>
      <div css={{ minHeight: 200, border: 'solid 1px gray' }}>
        <DocumentField
          //@ts-ignore
          value={description}
          autoFocus={false}
          onChange={document => {
            console.log(document);
            setDescription(document);
          }}
          field={field}
        />
      </div>
      <Button
        isDisabled={!post?.id || loading}
        css={{ backgroundColor: 'red' }}
        onClick={() => {
          console.log(description);
          updatePost({
            variables: {
              id: post.id,
              data: { content: description },
            },
          });
        }}
      >
        Update Post
      </Button>
    </div>
  );
}

export default HomePage;
