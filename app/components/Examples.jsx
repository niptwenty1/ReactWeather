var React = require('react');

var{Link} = require('react-router');

var Examples = (props) =>{
    return (
      <div>
        <h1 className="text-center page-title">Examples</h1>
        <p>Here area few examples</p>
        <ul>
          <li>
            <Link to="/?location=auckland">Auckland</Link>
          </li>
          <li>
            <Link to="/?location=Darjeeling">Darjeeling</Link>
          </li>
        </ul>

    </div>

    );
  };

module.exports = Examples;
