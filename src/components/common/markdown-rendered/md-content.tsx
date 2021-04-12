import React from 'react';
import ReactMarkdown from 'react-markdown';
import MdHeading from 'components/common/markdown-rendered/md-heading';
import MdParagraph from 'components/common/markdown-rendered/md-paragraph';
import MdParagraphSM from 'components/common/markdown-rendered/md-paragraph-sm';
import MdImage from 'components/common/markdown-rendered/md-image';
import MdLink from 'components/common/markdown-rendered/md-link';
import MdList from 'components/common/markdown-rendered/md-list';
import MdBlockquote from 'components/common/markdown-rendered/md-blockquote';
import MdHtml from 'components/common/markdown-rendered/md-html';

interface IProps {
  markdown: string;
  sm?: boolean;
}

const renderers = {
  heading: MdHeading,
  paragraph: MdParagraph,
  image: MdImage,
  link: MdLink,
  list: MdList,
  blockquote: MdBlockquote,
  html: MdHtml,
};

const MdContent = ({ markdown, sm = false }: IProps) => (
  <ReactMarkdown
    renderers={{ ...renderers, paragraph: sm ? MdParagraphSM : MdParagraph }}
    source={markdown}
  />
);

export default MdContent;
