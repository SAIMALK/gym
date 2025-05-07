import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, keyword }) => {
  return (
    pages > 1 && (
      <div className="d-flex justify-content-center my-4">
        <ButtonGroup>
          <Button
            as={Link}
            to={`/members?${keyword ? `keyword=${keyword}&` : ''}page=${Number(page) - 1}`}
            variant="outline-dark"
            disabled={Number(page) === 1}
          >
            Previous
          </Button>

          {[...Array(pages).keys()].map((x) => (
            <Button
              key={x + 1}
              as={Link}
              to={`/members?${keyword ? `keyword=${keyword}&` : ''}page=${x + 1}`}
              variant={x + 1 === Number(page) ? 'dark' : 'outline-dark'}
            >
              {x + 1}
            </Button>
          ))}

          <Button
            as={Link}
            to={`/members?${keyword ? `keyword=${keyword}&` : ''}page=${Number(page) + 1}`}
            variant="outline-dark"
            disabled={Number(page) === pages}
          >
            Next
          </Button>
        </ButtonGroup>
      </div>
    )
  );
};

export default Paginate;