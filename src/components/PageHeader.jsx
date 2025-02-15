import React from 'react';

const PageHeader = (props) => {
  return (
    <header id="page-header">
        <div className="container">
            <h1>{ props.title }</h1>
        </div>
    </header>
  )
}

export default PageHeader;