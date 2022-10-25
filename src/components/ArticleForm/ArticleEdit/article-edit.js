import React, { useState, useEffect } from 'react'

import ArticleCreate from '../ArticleCreate/article-create'

function ArticleEdit({ transferData, title, description, articleTitle, articleBody, tagList }) {
  const newFields = [
    {
      name: ['title'],
      value: articleTitle || null,
    },
    {
      name: ['description'],
      value: description || null,
    },
    {
      name: ['body'],
      value: articleBody || null,
    },
    {
      name: ['tagList'],
      value: tagList && tagList.length ? tagList : [''],
    },
  ]

  const [fields, setFields] = useState(newFields)

  useEffect(() => {
    setFields(newFields)
  }, [title, description, articleTitle, articleBody, tagList])

  return <ArticleCreate fields={fields} transferData={transferData} title={title} />
}

export default ArticleEdit
